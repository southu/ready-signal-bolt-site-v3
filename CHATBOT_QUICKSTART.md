# RAG Chatbot Quick Start

## What Has Been Built

A complete Retrieval-Augmented Generation (RAG) chatbot system for forecasting expertise with:

1. **Database Schema**: PostgreSQL with pgvector extension for semantic search
2. **Edge Functions**: 3 serverless functions for chat, document ingestion, and admin
3. **Rate Limiting**: Built-in protection against abuse
4. **Logging**: Comprehensive system monitoring
5. **Cost Tracking**: Automatic token usage and cost calculation

## Setup Steps (5 minutes)

### 1. Add OpenAI API Key

You need to add your OpenAI API key to Supabase:

1. Go to your Supabase dashboard
2. Navigate to **Settings** > **Edge Functions**
3. Click on **Secrets**
4. Add a new secret:
   - Name: `OPENAI_API_KEY`
   - Value: `sk-...` (your OpenAI API key)

Get an API key at: https://platform.openai.com/api-keys

### 2. Verify Edge Functions

Your edge functions should already be deployed:
- `/functions/v1/chat` - Main chatbot endpoint
- `/functions/v1/ingest-document` - Document ingestion
- `/functions/v1/admin` - Admin management

Check deployment in Supabase dashboard under **Edge Functions**.

### 3. Test the System

Create a file `test-chatbot.html` and open it in your browser:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Forecasting Chatbot Test</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    .section { margin: 30px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    button { padding: 10px 20px; margin: 10px 0; cursor: pointer; background: #3b82f6; color: white; border: none; border-radius: 5px; }
    button:hover { background: #2563eb; }
    pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
    .message { margin: 10px 0; padding: 10px; border-radius: 5px; }
    .user { background: #e3f2fd; }
    .assistant { background: #f3e5f5; }
    .error { background: #ffebee; color: #c62828; }
    .success { background: #e8f5e9; color: #2e7d32; }
  </style>
</head>
<body>
  <h1>🤖 Forecasting Chatbot Test</h1>

  <div class="section">
    <h2>Configuration</h2>
    <label>Supabase URL:</label><br>
    <input id="supabaseUrl" type="text" placeholder="https://xxx.supabase.co" style="width: 100%; padding: 8px;">
    <br><br>
    <label>Supabase Anon Key:</label><br>
    <input id="supabaseKey" type="text" placeholder="eyJ..." style="width: 100%; padding: 8px;">
    <br><br>
    <label>Service Role Key (for ingestion):</label><br>
    <input id="serviceKey" type="password" placeholder="eyJ..." style="width: 100%; padding: 8px;">
  </div>

  <div class="section">
    <h2>Step 1: Ingest Sample Document</h2>
    <button onclick="ingestSample()">📄 Ingest Sample Forecasting Guide</button>
    <div id="ingestResult"></div>
  </div>

  <div class="section">
    <h2>Step 2: Test Chat</h2>
    <input id="chatInput" type="text" placeholder="Ask: When should I use ARIMA?" style="width: 80%; padding: 8px;">
    <button onclick="sendChat()">💬 Send</button>
    <div id="chatResult"></div>
  </div>

  <div class="section">
    <h2>Step 3: View Stats</h2>
    <button onclick="getStats()">📊 Get System Stats</button>
    <div id="statsResult"></div>
  </div>

  <script>
    const sampleDocument = `# Forecasting Models Guide

## ARIMA (AutoRegressive Integrated Moving Average)

ARIMA is a statistical method for time series forecasting that combines three components:
- AutoRegressive (AR): Uses past values to predict future values
- Integrated (I): Differences the data to make it stationary
- Moving Average (MA): Uses past forecast errors in a regression model

### When to Use ARIMA
- Your data shows trend and/or seasonality
- You have at least 50-100 historical data points
- You need interpretable model parameters
- The relationship between variables is linear

### Python Example
\`\`\`python
from statsmodels.tsa.arima.model import ARIMA
import pandas as pd

# Fit ARIMA model
model = ARIMA(data, order=(1, 1, 1))
results = model.fit()

# Make predictions
forecast = results.forecast(steps=12)
print(forecast)
\`\`\`

## ETS (Error, Trend, Seasonality)

ETS models are an alternative to ARIMA that explicitly model trend and seasonality components.

### When to Use ETS
- Your data has clear seasonal patterns
- You want automatic parameter selection
- ARIMA is not performing well
- You need prediction intervals

### Python Example
\`\`\`python
from statsforecast import StatsForecast
from statsforecast.models import AutoETS

# Fit ETS model
model = StatsForecast(models=[AutoETS(season_length=12)])
forecast = model.forecast(h=12)
\`\`\`

## ML Models (Prophet, XGBoost)

Machine learning models can capture non-linear relationships and use external features.

### When to Use ML Models
- You have external data (weather, economic indicators)
- Relationships are non-linear
- You have large datasets (1000+ points)
- You need to incorporate business rules

## Choosing the Right Model

1. Start with simple models (ARIMA, ETS)
2. Add complexity if needed (ML models)
3. Always validate with cross-validation
4. Consider computational cost
5. Document your assumptions
`;

    async function ingestSample() {
      const url = document.getElementById('supabaseUrl').value;
      const serviceKey = document.getElementById('serviceKey').value;
      const resultDiv = document.getElementById('ingestResult');

      if (!url || !serviceKey) {
        resultDiv.innerHTML = '<div class="error">Please enter Supabase URL and Service Role Key</div>';
        return;
      }

      try {
        resultDiv.innerHTML = '<p>⏳ Ingesting document...</p>';

        const response = await fetch(\`\${url}/functions/v1/ingest-document\`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${serviceKey}\`,
          },
          body: JSON.stringify({
            content: sampleDocument,
            documentName: 'forecasting-models-guide.md',
            documentId: 'docs/forecasting/models-guide',
            metadata: {
              category: 'modeling',
              tags: ['arima', 'ets', 'ml', 'guide'],
              version: '1.0'
            }
          })
        });

        const data = await response.json();

        if (response.ok) {
          resultDiv.innerHTML = \`
            <div class="success">
              <strong>✅ Document Ingested Successfully!</strong>
              <pre>\${JSON.stringify(data, null, 2)}</pre>
            </div>
          \`;
        } else {
          resultDiv.innerHTML = \`<div class="error">❌ Error: \${data.error}</div>\`;
        }
      } catch (error) {
        resultDiv.innerHTML = \`<div class="error">❌ Error: \${error.message}</div>\`;
      }
    }

    let sessionId = null;

    async function sendChat() {
      const url = document.getElementById('supabaseUrl').value;
      const key = document.getElementById('supabaseKey').value;
      const message = document.getElementById('chatInput').value;
      const resultDiv = document.getElementById('chatResult');

      if (!url || !key) {
        resultDiv.innerHTML = '<div class="error">Please enter Supabase URL and Anon Key</div>';
        return;
      }

      if (!message.trim()) {
        resultDiv.innerHTML = '<div class="error">Please enter a message</div>';
        return;
      }

      try {
        resultDiv.innerHTML += \`<div class="message user"><strong>You:</strong> \${message}</div>\`;
        resultDiv.innerHTML += '<p>⏳ Thinking...</p>';

        const response = await fetch(\`\${url}/functions/v1/chat\`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${key}\`,
          },
          body: JSON.stringify({
            message,
            sessionId,
          })
        });

        const data = await response.json();

        // Remove "thinking" message
        const thinkingMsg = resultDiv.querySelector('p');
        if (thinkingMsg) thinkingMsg.remove();

        if (response.ok) {
          sessionId = data.sessionId;

          let sourcesHtml = '';
          if (data.sources && data.sources.length > 0) {
            sourcesHtml = '<br><strong>Sources:</strong><ul>' +
              data.sources.map(s => \`<li>\${s.documentName} (relevance: \${s.relevanceScore})</li>\`).join('') +
              '</ul>';
          }

          resultDiv.innerHTML += \`
            <div class="message assistant">
              <strong>Assistant:</strong> \${data.response}
              \${sourcesHtml}
              <br><small>Tokens: \${data.tokensUsed.total}</small>
            </div>
          \`;

          document.getElementById('chatInput').value = '';
        } else {
          resultDiv.innerHTML += \`<div class="error">❌ Error: \${data.error}</div>\`;
        }
      } catch (error) {
        resultDiv.innerHTML += \`<div class="error">❌ Error: \${error.message}</div>\`;
      }
    }

    async function getStats() {
      const url = document.getElementById('supabaseUrl').value;
      const serviceKey = document.getElementById('serviceKey').value;
      const resultDiv = document.getElementById('statsResult');

      if (!url || !serviceKey) {
        resultDiv.innerHTML = '<div class="error">Please enter Supabase URL and Service Role Key</div>';
        return;
      }

      try {
        resultDiv.innerHTML = '<p>⏳ Loading stats...</p>';

        const response = await fetch(\`\${url}/functions/v1/admin/stats\`, {
          headers: {
            'Authorization': \`Bearer \${serviceKey}\`,
          }
        });

        const data = await response.json();

        if (response.ok) {
          resultDiv.innerHTML = \`
            <div class="success">
              <pre>\${JSON.stringify(data, null, 2)}</pre>
            </div>
          \`;
        } else {
          resultDiv.innerHTML = \`<div class="error">❌ Error: \${data.error}</div>\`;
        }
      } catch (error) {
        resultDiv.innerHTML = \`<div class="error">❌ Error: \${error.message}</div>\`;
      }
    }

    // Allow Enter key to send chat
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChat();
    });
  </script>
</body>
</html>
```

### Example Test Queries

Once you've ingested the sample document, try these questions:

1. "When should I use ARIMA vs ETS for my time series?"
2. "Show me Python code for fitting an ARIMA model"
3. "What are the requirements for using ML models in forecasting?"
4. "How do I validate my forecasting model?"
5. "What's the difference between ARIMA and ETS?"

## Cost Estimate for Testing

- Ingesting sample doc: ~$0.0005 (1 time)
- Each test query: ~$0.02-0.04
- Total for 10 test queries: ~$0.30

## Production Integration

Once testing is successful, integrate into your app:

```javascript
// Example integration in your React app
const response = await fetch(
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      message: userQuery,
      sessionId: currentSessionId,
    }),
  }
);

const data = await response.json();
// Use data.response in your UI
```

## Next Steps

1. ✅ Add OpenAI API key to Supabase
2. ✅ Test with the HTML file above
3. ✅ Ingest your actual forecasting documentation
4. ✅ Build your frontend chat UI
5. ✅ Monitor usage and costs
6. ✅ Iterate on system prompts based on feedback

## Troubleshooting

**"OPENAI_API_KEY not set"**
- Add the secret in Supabase Edge Functions settings
- Wait 1 minute for deployment to pick up the new secret

**"Rate limit exceeded"**
- Wait 5 minutes (automatic reset)
- The default is 10 requests/minute for testing

**"No relevant context found"**
- Make sure you ingested documents first
- Try the sample document ingestion button

**CORS errors**
- All functions have CORS enabled by default
- Check browser console for specific error

## Architecture Files

- `CHATBOT_ARCHITECTURE.md` - Complete technical architecture
- `CHATBOT_USAGE_GUIDE.md` - Detailed API documentation
- `CHATBOT_QUICKSTART.md` - This file

## Need Help?

Check the Supabase logs:
1. Go to **Edge Functions** in Supabase dashboard
2. Click on a function (chat, ingest-document, admin)
3. View **Logs** tab for error messages

Or query the system_logs table:
```sql
SELECT * FROM system_logs
WHERE level = 'error'
ORDER BY created_at DESC
LIMIT 10;
```
