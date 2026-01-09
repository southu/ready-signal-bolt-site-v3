# Forecasting Expert Chatbot - RAG Architecture

## Overview
A production-ready Retrieval-Augmented Generation (RAG) chatbot system for forecasting expertise, built on Supabase infrastructure.

## Tech Stack

### Core Components
1. **LLM API**: OpenAI GPT-4-turbo (primary) / Claude 3.5 Sonnet (alternative)
2. **Vector Database**: Supabase PostgreSQL with pgvector extension
3. **Embeddings**: OpenAI text-embedding-3-small (1536 dimensions)
4. **Backend**: Supabase Edge Functions (Deno runtime)
5. **Storage**: Supabase Storage for document files

### Why These Choices?

**OpenAI GPT-4-turbo**:
- Industry-leading performance for technical content
- 128k context window (plenty for RAG context)
- Function calling support for structured outputs
- Cost-effective at $0.01/1K input tokens, $0.03/1K output tokens

**Supabase pgvector**:
- Native PostgreSQL extension for vector similarity search
- ACID compliance for data integrity
- Built-in indexing (HNSW, IVFFlat) for fast retrieval
- No separate vector DB to manage
- Can join embeddings with metadata in SQL

**OpenAI Embeddings**:
- 1536 dimensions (good balance of quality vs size)
- $0.00002 per 1K tokens (very cost-effective)
- Fast inference time
- Excellent semantic understanding

## Architecture Diagram

```
┌─────────────────┐
│   Frontend UI   │
│  (Your design)  │
└────────┬────────┘
         │
         │ POST /chat
         ▼
┌─────────────────────────────────────────┐
│     Supabase Edge Function: chat       │
│  1. Embed user query                    │
│  2. Search knowledge base (pgvector)    │
│  3. Build context from top K results    │
│  4. Call LLM with context + query       │
│  5. Return response                     │
└─────────────────────────────────────────┘
         │
         ├──────────────┬─────────────────┐
         │              │                 │
         ▼              ▼                 ▼
┌──────────────┐ ┌─────────────┐ ┌──────────────┐
│   OpenAI     │ │  PostgreSQL │ │   OpenAI     │
│ Embeddings   │ │  +pgvector  │ │  GPT-4-turbo │
│     API      │ │   (Vector   │ │     API      │
│              │ │    Search)  │ │              │
└──────────────┘ └─────────────┘ └──────────────┘


┌─────────────────┐
│  Admin Panel    │
│ (Separate tool) │
└────────┬────────┘
         │ POST /ingest-document
         ▼
┌─────────────────────────────────────────┐
│   Edge Function: ingest-document        │
│  1. Parse document (PDF/MD/code)        │
│  2. Chunk into semantic segments        │
│  3. Generate embeddings                 │
│  4. Store in knowledge_base table       │
└─────────────────────────────────────────┘
```

## Database Schema

### Tables

#### `knowledge_base`
Stores document chunks with embeddings for RAG retrieval.

```sql
CREATE TABLE knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  embedding vector(1536),
  metadata jsonb DEFAULT '{}'::jsonb,
  document_id text,
  document_name text,
  chunk_index int,
  token_count int,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX ON knowledge_base USING hnsw (embedding vector_cosine_ops);
CREATE INDEX ON knowledge_base (document_id);
CREATE INDEX ON knowledge_base ((metadata->>'category'));
```

#### `chat_sessions`
Track chat conversations for analytics and improvement.

```sql
CREATE TABLE chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  last_message_at timestamptz DEFAULT now()
);
```

#### `chat_messages`
Store individual messages with retrieval context.

```sql
CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  retrieved_chunks uuid[],
  model_used text,
  tokens_used jsonb,
  latency_ms int,
  created_at timestamptz DEFAULT now()
);
```

## API Endpoints

### 1. POST `/functions/v1/chat`

**Purpose**: Main chatbot endpoint for user queries.

**Request**:
```json
{
  "message": "When should I use ARIMA vs ETS for my time series?",
  "sessionId": "uuid-optional",
  "options": {
    "temperature": 0.7,
    "maxTokens": 1000,
    "topK": 5
  }
}
```

**Response**:
```json
{
  "response": "For choosing between ARIMA and ETS...",
  "sessionId": "uuid",
  "sources": [
    {
      "content": "...",
      "documentName": "forecasting-guide.pdf",
      "relevanceScore": 0.89
    }
  ],
  "tokensUsed": {
    "input": 1250,
    "output": 320
  }
}
```

**Flow**:
1. Validate request and get/create session
2. Generate embedding for user message (OpenAI)
3. Perform vector similarity search (pgvector)
4. Retrieve top K most relevant chunks
5. Build context window with chunks
6. Call LLM with system prompt + context + query
7. Log message and response
8. Return response with sources

### 2. POST `/functions/v1/ingest-document`

**Purpose**: Add new documents to the knowledge base.

**Request**:
```json
{
  "content": "# ARIMA Models\n\nARIMA stands for...",
  "documentName": "arima-guide.md",
  "documentId": "docs/arima-guide",
  "metadata": {
    "category": "modeling",
    "tags": ["arima", "time-series"],
    "author": "Data Science Team",
    "version": "1.2"
  },
  "chunkSize": 1000,
  "chunkOverlap": 200
}
```

**Response**:
```json
{
  "success": true,
  "chunksCreated": 12,
  "documentId": "docs/arima-guide",
  "embeddingsGenerated": 12
}
```

**Flow**:
1. Validate authentication (service role key)
2. Parse and chunk document content
3. Generate embeddings for each chunk
4. Store chunks with embeddings in database
5. Return summary

### 3. GET `/functions/v1/admin/documents`

**Purpose**: List and manage knowledge base documents.

**Response**:
```json
{
  "documents": [
    {
      "documentId": "docs/arima-guide",
      "documentName": "arima-guide.md",
      "chunkCount": 12,
      "lastUpdated": "2025-12-21T10:30:00Z",
      "metadata": {...}
    }
  ]
}
```

### 4. DELETE `/functions/v1/admin/documents/:documentId`

**Purpose**: Remove document from knowledge base.

## System Prompt Strategy

### Base Prompt
```
You are an expert forecasting consultant specializing in time series analysis,
statistical modeling, and machine learning approaches. You help business analysts
and data scientists with:

1. Choosing appropriate forecasting models (ARIMA, ETS, Prophet, ML models)
2. Troubleshooting Python forecasting code
3. Advising on external data integration for better predictions
4. Best practices for model validation and accuracy metrics

When answering:
- Be concise but thorough
- Provide code examples when relevant
- Reference specific documentation when available
- Ask clarifying questions if the query is ambiguous
- Acknowledge limitations when you're uncertain

Use the following context from our knowledge base to inform your answers:
{RETRIEVED_CONTEXT}

If the context doesn't contain relevant information, say so and provide general
guidance based on industry best practices.
```

### Prompt Templates by Query Type

**Model Selection**:
```
Focus on helping the user choose between different modeling approaches based on:
- Data characteristics (trend, seasonality, frequency)
- Business constraints (interpretability, speed, accuracy)
- Available historical data
```

**Code Troubleshooting**:
```
When analyzing code issues:
1. Identify the specific error or unexpected behavior
2. Explain the root cause
3. Provide corrected code with comments
4. Suggest preventive measures
```

## Security Considerations

### Authentication & Authorization
1. **Public Chat Endpoint**: Rate-limited by IP/user (prevent abuse)
2. **Admin Endpoints**: Require service role key or admin-level JWT
3. **Row Level Security**: Enable RLS on all tables
4. **API Key Rotation**: Store OpenAI key in Supabase secrets, rotate quarterly

### Data Protection
1. **PII Handling**: Never store user PII in chat logs without consent
2. **Encryption**: All data encrypted at rest (Supabase default)
3. **Audit Logging**: Log all admin actions (document updates, deletions)

### Rate Limiting
```sql
CREATE TABLE rate_limits (
  identifier text PRIMARY KEY, -- IP or user_id
  requests_count int DEFAULT 0,
  window_start timestamptz DEFAULT now(),
  blocked_until timestamptz
);
```

**Limits**:
- Anonymous users: 10 requests/minute, 100/day
- Authenticated users: 30 requests/minute, 500/day
- Admin operations: No limit (but audit logged)

## Cost Control

### Estimated Costs (for 10K queries/month)

**OpenAI GPT-4-turbo**:
- Average query: 2K input tokens, 500 output tokens
- Cost: (2K × $0.01 + 500 × $0.03) / 1000 × 10,000 = $350/month

**OpenAI Embeddings**:
- Average query: 100 tokens
- Average document chunk: 500 tokens
- Monthly: 10K queries + updates = ~$1/month

**Supabase**:
- Pro plan: $25/month (includes 8GB database, 100GB bandwidth)

**Total**: ~$376/month for 10K queries

### Cost Optimization Strategies

1. **Caching**: Cache responses for common queries (Redis layer)
2. **Model Selection**: Use GPT-3.5-turbo for simple queries (saves 90%)
3. **Context Window**: Limit retrieved chunks to top 3-5 most relevant
4. **Batch Processing**: Batch embedding generation during ingestion
5. **Prompt Compression**: Remove redundant context, use token-efficient prompts

## Logging & Monitoring

### Key Metrics to Track

1. **Usage Metrics**:
   - Queries per day/hour
   - Average response time
   - Token usage distribution

2. **Quality Metrics**:
   - User feedback ratings
   - Conversation abandonment rate
   - Retrieval relevance scores

3. **Cost Metrics**:
   - Cost per query
   - Token usage trends
   - API error rates

### Logging Implementation

```sql
CREATE TABLE system_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level text NOT NULL, -- 'info', 'warn', 'error'
  component text NOT NULL, -- 'chat', 'ingest', 'retrieval'
  message text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX ON system_logs (created_at DESC);
CREATE INDEX ON system_logs (level) WHERE level IN ('warn', 'error');
```

## Iteration & Improvement

### Knowledge Base Management

1. **Version Control**: Track document versions in metadata
2. **A/B Testing**: Test different chunking strategies
3. **Quality Scores**: Track which chunks get retrieved most often
4. **Feedback Loop**: Flag low-quality responses for review

### Prompt Engineering

1. **Version Control**: Store system prompts in database with versions
2. **A/B Testing**: Test different prompts on sample queries
3. **Evaluation Dataset**: Maintain golden dataset of Q&A pairs
4. **Automated Testing**: Run eval dataset monthly to track quality

### Continuous Improvement Process

```
Week 1-2: Initial deployment, baseline metrics
Week 3-4: Analyze user queries, identify gaps
Week 5-6: Add missing documentation, tune prompts
Week 7-8: Implement caching for common queries
Ongoing: Monthly prompt tuning, quarterly doc updates
```

## Getting Started Checklist

- [ ] Enable pgvector extension in Supabase
- [ ] Run database migrations
- [ ] Set up OpenAI API key in Supabase secrets
- [ ] Deploy edge functions
- [ ] Ingest initial document set
- [ ] Test with sample queries
- [ ] Implement rate limiting
- [ ] Set up monitoring dashboard
- [ ] Deploy to production
- [ ] Monitor costs and adjust

## Alternative Considerations

### Alternative LLMs
- **Claude 3.5 Sonnet**: Better at following instructions, similar cost
- **GPT-4o**: Faster, multimodal, slightly cheaper
- **Open source (Llama 3)**: Self-hosted option for cost savings

### Alternative Embeddings
- **Cohere embed-v3**: Better multilingual support
- **OpenAI text-embedding-3-large**: Higher quality, 3072 dimensions
- **Self-hosted (sentence-transformers)**: No API costs

### Hybrid Search
Consider combining vector search with keyword search (PostgreSQL full-text search) for better retrieval:

```sql
SELECT *,
  (embedding <=> query_embedding) as semantic_distance,
  ts_rank(to_tsvector('english', content), query) as keyword_score
FROM knowledge_base
ORDER BY (semantic_distance * 0.7 + (1 - keyword_score) * 0.3)
LIMIT 5;
```

## Conclusion

This architecture provides a production-ready foundation for a RAG-powered chatbot with:
- Scalability (Supabase handles 10K+ queries/day easily)
- Cost efficiency ($300-500/month for moderate usage)
- Maintainability (standard PostgreSQL, serverless functions)
- Security (RLS, rate limiting, audit logs)
- Iteration capability (version control, A/B testing, metrics)

Next steps: Implement the database schema and edge functions.
