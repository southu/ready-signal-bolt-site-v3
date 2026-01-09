# Document Ingestion Guide

## What is "Ingesting Documentation"?

Ingesting documentation means **loading your company's knowledge into the chatbot's database** so it can answer questions using YOUR specific information, not just general knowledge from the internet.

Think of it like training the chatbot on your company's playbook.

## What Documents Should You Ingest?

The chatbot will be most valuable when it knows about:

### 1. Forecasting Methodology Guides
Your internal documentation about:
- Which models to use in different situations
- Your company's forecasting workflow
- Standard operating procedures
- Decision frameworks

**Example topics:**
- "When to use ARIMA vs ETS"
- "How we handle seasonality in retail data"
- "Our approach to forecast validation"

### 2. Code Examples & Snippets
Working Python/R code that your team uses:
- Model fitting scripts
- Data preprocessing code
- Validation frameworks
- Production pipelines

**Why this matters:** Users can ask "Show me code for fitting an ARIMA model" and get YOUR team's actual code.

### 3. Troubleshooting Documentation
Common issues and their solutions:
- "Why is my model overfitting?"
- "How to handle missing data"
- "Debugging convergence issues"

### 4. Case Studies
Past projects with outcomes:
- What worked, what didn't
- Lessons learned
- Performance metrics
- Context and constraints

### 5. Best Practices
Your team's accumulated wisdom:
- Data quality requirements
- Model selection criteria
- Documentation standards
- Code review guidelines

### 6. External Research
Relevant papers and articles:
- Academic research you reference
- Industry whitepapers
- Benchmark studies

## Three Ways to Ingest Documents

### Option 1: Web-Based Upload Tool (Easiest)

I've created a beautiful admin interface for you: **`admin-upload.html`**

**How to use it:**

1. Open `admin-upload.html` in your browser
2. Enter your Supabase URL and Service Role Key
3. Drag & drop your documents (or click to select)
4. Add metadata (category, tags)
5. Click "Upload to Knowledge Base"

**Features:**
- Drag & drop support
- Preview before uploading
- View all uploaded documents
- See usage statistics
- Delete documents

**Perfect for:**
- Uploading one document at a time
- Non-technical team members
- Quick updates
- Visual management

### Option 2: Batch Upload Script (For Multiple Files)

Use **`batch-upload.js`** to upload many files at once.

**Setup:**

```bash
# 1. Set environment variables
export SUPABASE_URL="https://xxxxx.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."

# 2. Create a folder structure like this:
knowledge-base/
  ├── modeling/
  │   ├── arima-guide.md
  │   ├── ets-guide.md
  │   └── ml-models.md
  ├── code-examples/
  │   ├── data-prep.md
  │   └── model-fitting.md
  └── troubleshooting/
      └── common-errors.md

# 3. Run the batch upload
node batch-upload.js ./knowledge-base/modeling --category=modeling
```

**What it does:**
- Scans directory for .md and .txt files
- Automatically extracts tags from content
- Uploads all files with proper categorization
- Shows progress and summary

**Perfect for:**
- Initial bulk upload
- Updating multiple documents
- Automated workflows
- Team knowledge bases

### Option 3: API Integration (For Automation)

Use the REST API directly in your own tools:

```javascript
// Example: Upload from your CMS/wiki
async function syncFromNotion(notionPage) {
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/ingest-document`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        content: notionPage.content,
        documentName: notionPage.title,
        documentId: `notion/${notionPage.id}`,
        metadata: {
          category: notionPage.category,
          tags: notionPage.tags,
          lastEdited: notionPage.lastEdited,
          author: notionPage.author,
        },
      }),
    }
  );

  return await response.json();
}
```

**Perfect for:**
- Automated syncing from Confluence/Notion
- CI/CD pipelines
- Scheduled updates
- Custom workflows

## Document Format Tips

### ✅ Good Document Format

```markdown
# ARIMA Models - Comprehensive Guide

## Overview
ARIMA (AutoRegressive Integrated Moving Average) is a statistical method
for time series forecasting that's particularly effective when your data
shows trends or patterns over time.

## When to Use ARIMA

Use ARIMA when:
- You have at least 50-100 historical data points
- Your data shows trend and/or seasonality
- You need interpretable model parameters
- Linear relationships are appropriate

Avoid ARIMA when:
- You have external predictor variables (use ARIMAX or ML models)
- Relationships are highly non-linear
- You have less than 50 data points

## Python Implementation

Here's how we typically fit an ARIMA model in our team:

\`\`\`python
from statsmodels.tsa.arima.model import ARIMA
import pandas as pd

# Load your time series data
data = pd.read_csv('sales_data.csv', index_col='date', parse_dates=True)

# Fit ARIMA(1,1,1) model
model = ARIMA(data['sales'], order=(1, 1, 1))
results = model.fit()

# Get forecast
forecast = results.forecast(steps=12)
print(f"12-month forecast: {forecast}")
\`\`\`

## Common Issues

### "Model won't converge"
- Try different order parameters (p, d, q)
- Check for outliers in your data
- Ensure data is properly scaled

### "Poor forecast accuracy"
- Consider adding seasonal parameters (SARIMA)
- Check if external variables would help
- Validate with proper cross-validation
```

**Why this is good:**
- Clear structure with headers
- Explains WHEN to use (crucial for decision-making)
- Includes working code examples
- Addresses common problems
- Uses natural language

### ❌ Poor Document Format

```
arima is autoregressive integrated moving average for time series you use
order p d q where p is ar terms d is differencing q is ma terms fit with
model.fit() then forecast
```

**Why this is bad:**
- No structure or context
- No examples
- No decision criteria
- Hard to extract useful information

## Recommended Folder Structure

```
knowledge-base/
├── modeling/
│   ├── arima-comprehensive.md
│   ├── ets-guide.md
│   ├── prophet-guide.md
│   ├── ml-models-overview.md
│   └── model-selection-framework.md
│
├── code-examples/
│   ├── data-preprocessing.md
│   ├── model-training-pipeline.md
│   ├── cross-validation.md
│   └── production-deployment.md
│
├── troubleshooting/
│   ├── convergence-issues.md
│   ├── poor-accuracy.md
│   ├── data-quality-problems.md
│   └── performance-optimization.md
│
├── best-practices/
│   ├── data-requirements.md
│   ├── validation-standards.md
│   ├── documentation-template.md
│   └── code-review-checklist.md
│
├── case-studies/
│   ├── retail-demand-forecasting.md
│   ├── supply-chain-optimization.md
│   └── financial-projections.md
│
└── research/
    ├── academic-papers-summary.md
    ├── industry-benchmarks.md
    └── emerging-techniques.md
```

## Step-by-Step: Your First Upload

### Step 1: Create a Test Document

Create a file `test-document.md`:

```markdown
# Test Forecasting Guide

## ARIMA Overview

ARIMA is a powerful statistical method for time series forecasting.

### When to Use
- You have 50+ historical data points
- Data shows trend or seasonality
- Need interpretable parameters

### Python Example
\`\`\`python
from statsmodels.tsa.arima.model import ARIMA
model = ARIMA(data, order=(1,1,1))
results = model.fit()
forecast = results.forecast(steps=12)
\`\`\`

## Common Questions

**Q: How many data points do I need?**
A: At least 50-100 for reliable results.

**Q: What if my model won't converge?**
A: Try different order parameters or check for outliers.
```

### Step 2: Upload Using the Web Interface

1. Open `admin-upload.html` in your browser
2. Enter your credentials (save them)
3. Drag the `test-document.md` file
4. Set:
   - Category: "modeling"
   - Tags: "arima, test, guide"
5. Click "Upload to Knowledge Base"

You should see: "✅ Success! Created X chunks"

### Step 3: Test the Chatbot

Use the test interface from `CHATBOT_QUICKSTART.md` and ask:

- "When should I use ARIMA?"
- "Show me Python code for ARIMA"
- "How many data points do I need for ARIMA?"

The chatbot should now answer using your document!

### Step 4: Upload More Documents

Once the test works, upload your real documentation:

1. Gather your team's existing docs
2. Convert to Markdown or plain text
3. Organize by category
4. Upload using batch script or web interface

## How the Ingestion Process Works

Behind the scenes, here's what happens:

1. **Document Received**: Your file is sent to the API
2. **Chunking**: Document is split into ~1000 character chunks with 200 character overlap
3. **Embedding**: Each chunk is converted to a 1536-dimension vector using OpenAI
4. **Storage**: Chunks and embeddings are stored in PostgreSQL with pgvector
5. **Indexing**: Vector index is updated for fast similarity search

**When a user asks a question:**
1. Question is converted to an embedding
2. Vector search finds the 5 most similar chunks
3. Those chunks are added as context to the LLM
4. LLM generates an answer based on YOUR documents

## Costs

**One-time ingestion costs:**
- Small document (5KB): ~$0.0001
- Medium document (50KB): ~$0.001
- Large document (500KB): ~$0.01

**Example:** Ingesting 100 medium-sized documents = ~$0.10

These are one-time costs. Once ingested, there's no additional cost for retrieval.

## Updating Documents

To update a document:
1. Upload it again with the **same document ID**
2. The old version is automatically replaced
3. New embeddings are generated

Or delete the old document first:
1. Use admin interface to delete
2. Upload new version

## Best Practices

### ✅ Do:
- Use clear, descriptive document names
- Add relevant metadata (category, tags)
- Include code examples with explanations
- Organize by topic
- Update regularly
- Test after uploading

### ❌ Don't:
- Upload raw code without explanation
- Use cryptic file names
- Duplicate content across documents
- Upload confidential data (it's not encrypted separately)
- Forget to categorize

## Troubleshooting

### "Error: OPENAI_API_KEY not set"
**Solution:** Add your OpenAI API key in Supabase Edge Functions settings (see CHATBOT_QUICKSTART.md)

### "Error: Authorization required"
**Solution:** You need the Service Role Key (not the Anon Key) for uploads

### "File uploaded but chatbot doesn't know about it"
**Solution:**
1. Check if upload was successful (look for "Created X chunks" message)
2. Ask a very specific question from the document
3. Check admin stats to confirm chunks were created

### "Chatbot gives wrong answers"
**Solution:**
1. Check if your documents are clear and well-structured
2. Try more specific questions
3. Review retrieved sources to see what's being used
4. Consider uploading more detailed documentation

## Next Steps

1. ✅ Choose your upload method (web tool or batch script)
2. ✅ Prepare your first document
3. ✅ Upload and test
4. ✅ Iterate based on chatbot responses
5. ✅ Upload more documents
6. ✅ Train your team on how to use it

## Need Help?

- Review `CHATBOT_QUICKSTART.md` for testing
- Check `CHATBOT_ARCHITECTURE.md` for technical details
- Review `CHATBOT_USAGE_GUIDE.md` for API documentation
