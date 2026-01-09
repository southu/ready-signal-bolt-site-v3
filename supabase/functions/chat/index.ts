import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatRequest {
  message: string;
  sessionId?: string;
  options?: {
    temperature?: number;
    maxTokens?: number;
    topK?: number;
    model?: string;
  };
}

interface RetrievedChunk {
  id: string;
  content: string;
  documentName: string;
  similarity: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { message, sessionId, options = {} }: ChatRequest = await req.json();

    if (!message || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const {
      temperature = 0.7,
      maxTokens = 1000,
      topK = 5,
      model = "gpt-4-turbo-preview",
    } = options;

    const clientIp = req.headers.get("x-forwarded-for") || "unknown";
    const rateLimitOk = await checkRateLimit(supabase, clientIp);
    if (!rateLimitOk) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let currentSessionId = sessionId;
    if (!currentSessionId) {
      const { data: newSession, error: sessionError } = await supabase
        .from("chat_sessions")
        .insert({ user_id: null })
        .select()
        .single();

      if (sessionError || !newSession) {
        throw new Error("Failed to create chat session");
      }
      currentSessionId = newSession.id;
    }

    await supabase.from("chat_messages").insert({
      session_id: currentSessionId,
      role: "user",
      content: message,
    });

    const queryEmbedding = await generateEmbedding(message, openaiApiKey);

    const { data: retrievedChunks, error: searchError } = await supabase.rpc(
      "search_knowledge_base",
      {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: topK,
      }
    );

    if (searchError) {
      console.error("Search error:", searchError);
    }

    const chunks: RetrievedChunk[] = (retrievedChunks || []).map((chunk: any) => ({
      id: chunk.id,
      content: chunk.content,
      documentName: chunk.document_name || "Unknown",
      similarity: chunk.similarity,
    }));

    const { data: systemPromptData } = await supabase
      .from("system_prompts")
      .select("prompt_text")
      .eq("name", "default")
      .eq("is_active", true)
      .single();

    const systemPrompt = systemPromptData?.prompt_text || "You are a helpful assistant.";

    const contextText = chunks.length > 0
      ? chunks.map((chunk) => `[Source: ${chunk.documentName}]\n${chunk.content}`).join("\n\n---\n\n")
      : "No relevant context found in knowledge base.";

    const fullSystemPrompt = `${systemPrompt}\n\n## Retrieved Context:\n${contextText}`;

    const completion = await callOpenAI(
      openaiApiKey,
      model,
      fullSystemPrompt,
      message,
      temperature,
      maxTokens
    );

    const assistantMessage = completion.choices[0].message.content;
    const tokensUsed = {
      input: completion.usage.prompt_tokens,
      output: completion.usage.completion_tokens,
      total: completion.usage.total_tokens,
    };

    const suggestedQuestions = await generateFollowUpQuestions(
      openaiApiKey,
      message,
      assistantMessage,
      contextText
    );

    await supabase.from("chat_messages").insert({
      session_id: currentSessionId,
      role: "assistant",
      content: assistantMessage,
      retrieved_chunks: chunks.map((c) => c.id),
      model_used: model,
      tokens_used: tokensUsed,
      latency_ms: Date.now() - startTime,
    });

    await supabase
      .from("chat_sessions")
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", currentSessionId);

    await supabase.from("system_logs").insert({
      level: "info",
      component: "chat",
      message: "Chat request processed",
      metadata: {
        sessionId: currentSessionId,
        tokensUsed,
        latencyMs: Date.now() - startTime,
        chunksRetrieved: chunks.length,
      },
    });

    return new Response(
      JSON.stringify({
        response: assistantMessage,
        sessionId: currentSessionId,
        sources: chunks.map((chunk) => ({
          content: chunk.content.substring(0, 200) + "...",
          documentName: chunk.documentName,
          relevanceScore: Math.round(chunk.similarity * 100) / 100,
        })),
        suggestedQuestions,
        tokensUsed,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in chat:", error);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      await supabase.from("system_logs").insert({
        level: "error",
        component: "chat",
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

async function generateEmbedding(
  text: string,
  apiKey: string
): Promise<number[]> {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenAI embedding error: ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

async function callOpenAI(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userMessage: string,
  temperature: number,
  maxTokens: number
): Promise<any> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenAI completion error: ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}

async function checkRateLimit(
  supabase: any,
  identifier: string
): Promise<boolean> {
  const windowMinutes = 1;
  const maxRequests = 10;

  const { data: existing } = await supabase
    .from("rate_limits")
    .select("*")
    .eq("identifier", identifier)
    .single();

  if (!existing) {
    await supabase.from("rate_limits").insert({
      identifier,
      requests_count: 1,
      window_start: new Date().toISOString(),
    });
    return true;
  }

  if (existing.blocked_until && new Date(existing.blocked_until) > new Date()) {
    return false;
  }

  const windowStart = new Date(existing.window_start);
  const now = new Date();
  const minutesElapsed = (now.getTime() - windowStart.getTime()) / 1000 / 60;

  if (minutesElapsed > windowMinutes) {
    await supabase
      .from("rate_limits")
      .update({
        requests_count: 1,
        window_start: now.toISOString(),
        blocked_until: null,
      })
      .eq("identifier", identifier);
    return true;
  }

  if (existing.requests_count >= maxRequests) {
    const blockUntil = new Date(now.getTime() + 5 * 60 * 1000);
    await supabase
      .from("rate_limits")
      .update({ blocked_until: blockUntil.toISOString() })
      .eq("identifier", identifier);
    return false;
  }

  await supabase
    .from("rate_limits")
    .update({ requests_count: existing.requests_count + 1 })
    .eq("identifier", identifier);
  return true;
}

async function generateFollowUpQuestions(
  apiKey: string,
  userQuestion: string,
  assistantResponse: string,
  context: string
): Promise<string[]> {
  try {
    const prompt = `Based on this conversation about forecasting and demand planning:

User Question: "${userQuestion}"
Assistant Response: "${assistantResponse}"

Context Available: ${context.substring(0, 500)}...

Generate 2-3 specific, relevant follow-up questions that the user might want to ask next. The questions should:
- Be directly related to the topic discussed
- Help the user dive deeper into the subject
- Be concise and clear
- Focus on practical applications or related concepts

Return ONLY the questions as a JSON array of strings, with no additional text or formatting.
Example: ["Question 1?", "Question 2?", "Question 3?"]`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that generates concise follow-up questions." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      console.error("Failed to generate follow-up questions");
      return [];
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();

    const questions = JSON.parse(content);
    return Array.isArray(questions) ? questions.slice(0, 3) : [];
  } catch (error) {
    console.error("Error generating follow-up questions:", error);
    return [];
  }
}