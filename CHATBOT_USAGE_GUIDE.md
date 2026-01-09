# RAG Chatbot Usage Guide

## Quick Start

Your RAG-powered forecasting chatbot is now deployed and ready to use. This guide covers how to integrate it into your frontend and manage the knowledge base.

## Prerequisites

Before using the chatbot, you need to:

1. **Set up OpenAI API Key**: Add your OpenAI API key to Supabase secrets
   - Go to your Supabase project settings
   - Navigate to "Edge Functions" > "Secrets"
   - Add a secret named `OPENAI_API_KEY` with your OpenAI API key

2. **Ingest Initial Documents**: Populate the knowledge base with your documentation

## API Endpoints

All endpoints are available at: `https://[your-project].supabase.co/functions/v1/[endpoint]`

### 1. Chat Endpoint (Main User Interface)

**POST** `/functions/v1/chat`

Send user queries and receive AI-powered responses with context from your knowledge base.

**Request:**
```javascript
const response = await fetch('https://[your-project].supabase.co/functions/v1/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  },
  body: JSON.stringify({
    message: 'When should I use ARIMA vs ETS for my time series?',
    sessionId: 'optional-session-uuid', // Omit for new session
    options: {
      temperature: 0.7,  // Default: 0.7
      maxTokens: 1000,   // Default: 1000
      topK: 5,           // Number of relevant chunks to retrieve
      model: 'gpt-4-turbo-preview' // Default model
    }
  })
});

const data = await response.json();
```

**Response:**
```json
{
  "response": "For choosing between ARIMA and ETS, consider these factors...",
  "sessionId": "uuid-of-session",
  "sources": [
    {
      "content": "ARIMA (AutoRegressive Integrated Moving Average)...",
      "documentName": "forecasting-guide.pdf",
      "relevanceScore": 0.89
    }
  ],
  "tokensUsed": {
    "input": 1250,
    "output": 320,
    "total": 1570
  }
}
```

**Rate Limits:**
- Anonymous users: 10 requests per minute
- Blocked for 5 minutes after exceeding limit

### 2. Document Ingestion Endpoint (Admin Only)

**POST** `/functions/v1/ingest-document`

Add new documents to the knowledge base.

**Request:**
```javascript
const response = await fetch('https://[your-project].supabase.co/functions/v1/ingest-document', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, // Service role required!
  },
  body: JSON.stringify({
    content: `# ARIMA Models

ARIMA stands for AutoRegressive Integrated Moving Average. It's a powerful statistical method for time series forecasting...

## When to Use ARIMA

1. Your data shows trend and/or seasonality
2. You have at least 50-100 historical data points
3. You need interpretable model parameters
`,
    documentName: 'arima-guide.md',
    documentId: 'docs/forecasting/arima-guide',
    metadata: {
      category: 'modeling',
      tags: ['arima', 'time-series', 'statistical'],
      author: 'Data Science Team',
      version: '1.2',
      lastReviewed: '2025-12-21'
    },
    chunkSize: 1000,      // Characters per chunk
    chunkOverlap: 200     // Overlap between chunks
  })
});

const data = await response.json();
```

**Response:**
```json
{
  "success": true,
  "chunksCreated": 12,
  "documentId": "docs/forecasting/arima-guide",
  "embeddingsGenerated": 12
}
```

**Notes:**
- If a document with the same `documentId` exists, it will be replaced
- Larger documents are automatically chunked with overlap for better retrieval
- Each chunk gets embedded separately (costs ~$0.00002 per chunk)

### 3. Admin Endpoints (Management)

#### List All Documents

**GET** `/functions/v1/admin/documents`

```javascript
const response = await fetch('https://[your-project].supabase.co/functions/v1/admin/documents', {
  headers: {
    'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  }
});

const data = await response.json();
```

**Response:**
```json
{
  "documents": [
    {
      "documentId": "docs/forecasting/arima-guide",
      "documentName": "arima-guide.md",
      "chunkCount": 12,
      "lastUpdated": "2025-12-21T10:30:00Z",
      "metadata": {
        "category": "modeling",
        "tags": ["arima", "time-series"]
      }
    }
  ]
}
```

#### Delete Document

**DELETE** `/functions/v1/admin/documents/[documentId]`

```javascript
const response = await fetch(
  'https://[your-project].supabase.co/functions/v1/admin/documents/docs%2Fforecasting%2Farima-guide',
  {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    }
  }
);
```

#### Get System Stats

**GET** `/functions/v1/admin/stats`

```javascript
const response = await fetch('https://[your-project].supabase.co/functions/v1/admin/stats', {
  headers: {
    'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  }
});
```

**Response:**
```json
{
  "knowledgeBase": {
    "totalChunks": 245
  },
  "chat": {
    "totalSessions": 128,
    "totalMessages": 456,
    "totalTokens": 234567,
    "estimatedCost": "$23.45"
  }
}
```

#### Get System Logs

**GET** `/functions/v1/admin/logs?limit=100&level=error`

```javascript
const response = await fetch(
  'https://[your-project].supabase.co/functions/v1/admin/logs?limit=50&level=error',
  {
    headers: {
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    }
  }
);
```

## Frontend Integration Example

### React Component

```typescript
import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{
    documentName: string;
    relevanceScore: number;
  }>;
}

export function ForecastingChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            message: input,
            sessionId,
          }),
        }
      );

      const data = await response.json();

      if (!sessionId) {
        setSessionId(data.sessionId);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        sources: data.sources,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <p>{msg.content}</p>
            {msg.sources && msg.sources.length > 0 && (
              <div className="sources">
                <strong>Sources:</strong>
                {msg.sources.map((source, j) => (
                  <span key={j}>
                    {source.documentName} ({Math.round(source.relevanceScore * 100)}%)
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about forecasting..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
```

## Populating the Knowledge Base

### Batch Ingestion Script

```javascript
// ingest-documents.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function ingestDocument(filePath, category) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  const documentId = `docs/${category}/${fileName}`;

  const response = await fetch(
    `${process.env.SUPABASE_URL}/functions/v1/ingest-document`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        content,
        documentName: fileName,
        documentId,
        metadata: {
          category,
          filePath,
          ingestedAt: new Date().toISOString(),
        },
      }),
    }
  );

  const data = await response.json();
  console.log(`Ingested ${fileName}:`, data);
}

async function ingestAll() {
  const docsDir = './knowledge-base';
  const categories = ['modeling', 'code-examples', 'troubleshooting'];

  for (const category of categories) {
    const categoryPath = path.join(docsDir, category);
    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (file.endsWith('.md') || file.endsWith('.txt')) {
        await ingestDocument(path.join(categoryPath, file), category);
      }
    }
  }
}

ingestAll().catch(console.error);
```

**Run:**
```bash
node ingest-documents.js
```

## Best Practices

### Document Formatting

**Good:**
```markdown
# ARIMA Models

## Overview
ARIMA (AutoRegressive Integrated Moving Average) is a forecasting method...

## When to Use
- Your data shows trend
- You have 50+ data points

## Python Example
\`\`\`python
from statsmodels.tsa.arima.model import ARIMA
model = ARIMA(data, order=(1,1,1))
results = model.fit()
\`\`\`
```

**Bad:**
- Huge walls of text (chunk size matters!)
- No structure or headings
- Missing context (e.g., code without explanation)

### Metadata Strategy

Use metadata to organize and filter your knowledge base:

```javascript
{
  category: 'modeling',           // High-level category
  tags: ['arima', 'statistical'], // Searchable tags
  difficulty: 'intermediate',     // Skill level
  language: 'python',             // Programming language
  version: '2.1',                 // Document version
  lastReviewed: '2025-12-21',    // Freshness tracking
  author: 'Data Science Team'     // Attribution
}
```

### Cost Optimization

**Current costs (per 10K queries):**
- Chat: ~$350/month (GPT-4-turbo)
- Embeddings: ~$1/month

**Optimization tips:**
1. Use `gpt-3.5-turbo` for simple queries (90% cheaper)
2. Reduce `topK` from 5 to 3 (smaller context = lower cost)
3. Set lower `maxTokens` (500 instead of 1000)
4. Cache common queries in your frontend

Example cost-optimized request:
```javascript
{
  message: userQuery,
  options: {
    model: 'gpt-3.5-turbo',  // Instead of gpt-4-turbo
    maxTokens: 500,          // Instead of 1000
    topK: 3                  // Instead of 5
  }
}
```

## Monitoring & Analytics

### Check System Health

```javascript
// Get stats
const stats = await fetch(`${SUPABASE_URL}/functions/v1/admin/stats`, {
  headers: { 'Authorization': `Bearer ${SERVICE_ROLE_KEY}` }
}).then(r => r.json());

console.log('Total chunks:', stats.knowledgeBase.totalChunks);
console.log('Total cost:', stats.chat.estimatedCost);
```

### View Recent Errors

```javascript
const logs = await fetch(
  `${SUPABASE_URL}/functions/v1/admin/logs?level=error&limit=10`,
  {
    headers: { 'Authorization': `Bearer ${SERVICE_ROLE_KEY}` }
  }
).then(r => r.json());

logs.logs.forEach(log => {
  console.error(`[${log.created_at}] ${log.component}: ${log.message}`);
});
```

### Query Supabase Directly

```sql
-- Most popular document chunks
SELECT document_name, COUNT(*) as retrieval_count
FROM knowledge_base kb
JOIN chat_messages cm ON kb.id = ANY(cm.retrieved_chunks)
GROUP BY document_name
ORDER BY retrieval_count DESC
LIMIT 10;

-- Average response time
SELECT
  AVG(latency_ms) as avg_latency,
  MAX(latency_ms) as max_latency
FROM chat_messages
WHERE created_at > NOW() - INTERVAL '24 hours';

-- Token usage by day
SELECT
  DATE(created_at) as date,
  SUM((tokens_used->>'total')::int) as total_tokens
FROM chat_messages
WHERE tokens_used IS NOT NULL
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

## Troubleshooting

### "Rate limit exceeded"
- Wait 5 minutes (temporary block)
- Implement authentication to get higher limits
- Contact admin to adjust rate limits in database

### "No relevant context found"
- Your knowledge base may be empty
- Query may be too specific
- Try ingesting more documents in that domain

### Slow responses (>5 seconds)
- Check if you're using a large `topK` value
- Consider using `gpt-3.5-turbo` instead of `gpt-4`
- Check vector index health in database

### Poor answer quality
- Review retrieved sources (are they relevant?)
- Adjust `topK` (try 3, 5, or 7)
- Improve document chunking strategy
- Update system prompt for your domain

## Next Steps

1. **Populate Knowledge Base**: Ingest your forecasting documentation
2. **Test Queries**: Try various forecasting questions
3. **Integrate Frontend**: Build your chat UI
4. **Monitor Usage**: Track costs and quality
5. **Iterate**: Improve based on user feedback

For detailed architecture information, see `CHATBOT_ARCHITECTURE.md`.
