import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const path = url.pathname;

    if (req.method === "POST" && path.endsWith("/login")) {
      return await handleLogin(req);
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (req.method === "GET" && path.endsWith("/documents")) {
      return await listDocuments(supabase);
    }

    if (req.method === "DELETE" && path.includes("/documents/")) {
      const documentId = path.split("/documents/")[1];
      return await deleteDocument(supabase, documentId);
    }

    if (req.method === "GET" && path.endsWith("/stats")) {
      return await getStats(supabase);
    }

    if (req.method === "GET" && path.endsWith("/logs")) {
      const limit = parseInt(url.searchParams.get("limit") || "100");
      const level = url.searchParams.get("level") || null;
      return await getLogs(supabase, limit, level);
    }

    return new Response(
      JSON.stringify({ error: "Invalid endpoint" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in admin:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function handleLogin(req: Request): Promise<Response> {
  try {
    const { password } = await req.json();

    if (!password) {
      return new Response(
        JSON.stringify({ error: "Password required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const adminPassword = Deno.env.get("ADMIN_PASSWORD") || "changeme";
    const passwordHash = await hashPassword(password);
    const adminPasswordHash = await hashPassword(adminPassword);

    if (passwordHash !== adminPasswordHash) {
      return new Response(
        JSON.stringify({ error: "Invalid password" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = crypto.getRandomValues(new Uint8Array(32));
    const tokenString = Array.from(token).map(b => b.toString(16).padStart(2, "0")).join("");

    return new Response(
      JSON.stringify({ token: tokenString, expiresIn: 3600 }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Login failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}

async function listDocuments(supabase: any): Promise<Response> {
  const { data: documents, error } = await supabase
    .from("knowledge_base")
    .select("document_id, document_name, metadata, created_at, updated_at")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch documents: ${error.message}`);
  }

  const documentMap = new Map();
  for (const doc of documents) {
    if (!documentMap.has(doc.document_id)) {
      documentMap.set(doc.document_id, {
        documentId: doc.document_id,
        documentName: doc.document_name,
        metadata: doc.metadata,
        chunkCount: 0,
        lastUpdated: doc.updated_at,
      });
    }
    documentMap.get(doc.document_id).chunkCount += 1;
  }

  const documentList = Array.from(documentMap.values());

  return new Response(
    JSON.stringify({ documents: documentList }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

async function deleteDocument(supabase: any, documentId: string): Promise<Response> {
  if (!documentId) {
    return new Response(
      JSON.stringify({ error: "Document ID is required" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const { error } = await supabase
    .from("knowledge_base")
    .delete()
    .eq("document_id", decodeURIComponent(documentId));

  if (error) {
    throw new Error(`Failed to delete document: ${error.message}`);
  }

  await supabase.from("system_logs").insert({
    level: "info",
    component: "admin",
    message: `Document deleted: ${documentId}`,
    metadata: { documentId },
  });

  return new Response(
    JSON.stringify({ success: true, message: "Document deleted successfully" }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

async function getStats(supabase: any): Promise<Response> {
  const [kbResult, sessionsResult, messagesResult] = await Promise.all([
    supabase.from("knowledge_base").select("id", { count: "exact", head: true }),
    supabase.from("chat_sessions").select("id", { count: "exact", head: true }),
    supabase.from("chat_messages").select("tokens_used"),
  ]);

  let totalTokens = 0;
  let totalCost = 0;
  if (messagesResult.data) {
    for (const msg of messagesResult.data) {
      if (msg.tokens_used) {
        const tokens = msg.tokens_used;
        totalTokens += tokens.total || 0;
        const inputCost = (tokens.input || 0) * 0.01 / 1000;
        const outputCost = (tokens.output || 0) * 0.03 / 1000;
        totalCost += inputCost + outputCost;
      }
    }
  }

  const stats = {
    knowledgeBase: {
      totalChunks: kbResult.count || 0,
    },
    chat: {
      totalSessions: sessionsResult.count || 0,
      totalMessages: messagesResult.data?.length || 0,
      totalTokens,
      estimatedCost: `$${totalCost.toFixed(2)}`,
    },
  };

  return new Response(
    JSON.stringify(stats),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

async function getLogs(
  supabase: any,
  limit: number,
  level: string | null
): Promise<Response> {
  let query = supabase
    .from("system_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (level) {
    query = query.eq("level", level);
  }

  const { data: logs, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch logs: ${error.message}`);
  }

  return new Response(
    JSON.stringify({ logs }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}
