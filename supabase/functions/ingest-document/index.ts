import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface IngestRequest {
  content: string;
  documentName: string;
  documentId: string;
  metadata?: Record<string, any>;
  chunkSize?: number;
  chunkOverlap?: number;
}

interface Chunk {
  content: string;
  chunkIndex: number;
  tokenCount: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const {
      content,
      documentName,
      documentId,
      metadata = {},
      chunkSize = 1000,
      chunkOverlap = 200,
    }: IngestRequest = await req.json();

    if (!content || !documentName || !documentId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: content, documentName, documentId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await supabase.from("system_logs").insert({
      level: "info",
      component: "ingest",
      message: `Starting document ingestion: ${documentName}`,
      metadata: { documentId, documentName },
    });

    const chunks = chunkDocument(content, chunkSize, chunkOverlap);

    const embeddingsPromises = chunks.map(async (chunk) => {
      const embedding = await generateEmbedding(chunk.content, openaiApiKey);
      return {
        content: chunk.content,
        embedding,
        metadata,
        document_id: documentId,
        document_name: documentName,
        chunk_index: chunk.chunkIndex,
        token_count: chunk.tokenCount,
      };
    });

    const chunksWithEmbeddings = await Promise.all(embeddingsPromises);

    const { error: deleteError } = await supabase
      .from("knowledge_base")
      .delete()
      .eq("document_id", documentId);

    if (deleteError) {
      throw new Error(`Failed to delete existing chunks: ${deleteError.message}`);
    }

    const { error: insertError } = await supabase
      .from("knowledge_base")
      .insert(chunksWithEmbeddings);

    if (insertError) {
      throw new Error(`Failed to insert chunks: ${insertError.message}`);
    }

    await supabase.from("system_logs").insert({
      level: "info",
      component: "ingest",
      message: `Successfully ingested document: ${documentName}`,
      metadata: { documentId, documentName, chunksCreated: chunks.length },
    });

    return new Response(
      JSON.stringify({
        success: true,
        chunksCreated: chunks.length,
        documentId,
        embeddingsGenerated: chunks.length,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in ingest-document:", error);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      await supabase.from("system_logs").insert({
        level: "error",
        component: "ingest",
        message: error instanceof Error ? error.message : "Unknown error",
        metadata: { error: String(error) },
      });
    }

    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function chunkDocument(
  text: string,
  chunkSize: number,
  overlap: number
): Chunk[] {
  const chunks: Chunk[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  let currentChunk = "";
  let chunkIndex = 0;

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > chunkSize && currentChunk.length > 0) {
      chunks.push({
        content: currentChunk.trim(),
        chunkIndex: chunkIndex++,
        tokenCount: estimateTokens(currentChunk),
      });

      const words = currentChunk.split(/\s+/);
      const overlapWords = words.slice(-Math.floor(overlap / 5));
      currentChunk = overlapWords.join(" ") + " " + sentence;
    } else {
      currentChunk += (currentChunk ? " " : "") + sentence;
    }
  }

  if (currentChunk.trim()) {
    chunks.push({
      content: currentChunk.trim(),
      chunkIndex: chunkIndex,
      tokenCount: estimateTokens(currentChunk),
    });
  }

  return chunks;
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

async function generateEmbedding(
  text: string,
  apiKey: string
): Promise<number[]> {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}
