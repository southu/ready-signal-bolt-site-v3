# Knowledge Base - Sample Documents

This directory contains sample documents that demonstrate the ideal format for your forecasting knowledge base.

## What's Included

### 📁 modeling/
- **arima-guide.md** - Comprehensive guide to ARIMA modeling
  - When to use ARIMA vs alternatives
  - Parameter selection process
  - Complete code examples
  - Common issues and solutions

### 📁 code-examples/
- **data-preprocessing.md** - Complete preprocessing pipeline
  - Handling missing values
  - Outlier detection
  - Data transformations
  - Feature engineering

### 📁 troubleshooting/
- Empty - Add your team's troubleshooting guides here

## How to Use These Samples

### Option 1: Test the System

Use these documents to test your chatbot:

1. Upload these sample documents using `admin-upload.html`
2. Test the chatbot with questions like:
   - "When should I use ARIMA?"
   - "Show me how to handle missing values in time series"
   - "What are the ARIMA parameters?"
   - "How do I detect outliers in my data?"

### Option 2: Use as Templates

These documents show the ideal format:

✅ **Good structure:**
- Clear headings and sections
- "When to use" decision criteria
- Complete, runnable code examples
- Troubleshooting sections
- Best practices

✅ **Good content:**
- Explains WHY, not just HOW
- Includes business context
- Shows common mistakes
- Provides checklists

### Option 3: Extend with Your Content

Replace or extend these with your team's knowledge:

1. Keep the same structure
2. Add your team's specific approaches
3. Include your actual code examples
4. Add your lessons learned

## Quick Upload Commands

### Upload All Sample Documents

```bash
# Set your credentials
export SUPABASE_URL="https://xxxxx.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."

# Upload modeling documents
node batch-upload.js ./knowledge-base/modeling --category=modeling

# Upload code examples
node batch-upload.js ./knowledge-base/code-examples --category=code-examples
```

### Upload Single Document

```bash
# Using curl
curl -X POST "${SUPABASE_URL}/functions/v1/ingest-document" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d @- <<EOF
{
  "content": "$(cat knowledge-base/modeling/arima-guide.md)",
  "documentName": "arima-guide.md",
  "documentId": "docs/modeling/arima-guide",
  "metadata": {
    "category": "modeling",
    "tags": ["arima", "statistical", "time-series"]
  }
}
EOF
```

Or just use the web interface at `admin-upload.html`!

## Document Format Guidelines

### Structure Every Document Like This:

```markdown
# [Topic] - [Type: Guide/Tutorial/Reference]

## Overview
Brief description of what this document covers

## When to Use [This Technique/Model]
Clear decision criteria - this is CRITICAL for the chatbot

### Best Use Cases
- Bullet points of ideal scenarios

### When NOT to Use
- Bullet points of when to avoid

## How It Works
Technical explanation with examples

## Implementation
Complete, runnable code examples

## Common Issues
Problems users face and solutions

## Best Practices
Your team's accumulated wisdom

## Key Takeaways
Summary for quick reference
```

### Code Example Format:

```python
# Always include:
# 1. Imports at the top
# 2. Comments explaining what code does
# 3. Example usage
# 4. Expected output

import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

def fit_arima(data, order=(1,1,1)):
    """
    Fit ARIMA model to time series

    Args:
        data: pandas Series with time series
        order: tuple (p, d, q)

    Returns:
        Fitted model object
    """
    model = ARIMA(data, order=order)
    return model.fit()

# Example usage
sales_data = pd.read_csv('sales.csv')['sales']
fitted_model = fit_arima(sales_data)
forecast = fitted_model.forecast(steps=12)
print(f"Next month: {forecast[0]:.2f}")
```

## What to Add to Your Knowledge Base

### Priority 1 (Start Here)
- [ ] Model selection guide (ARIMA vs ETS vs ML)
- [ ] Your team's standard code templates
- [ ] Top 10 questions analysts ask
- [ ] Data quality requirements
- [ ] Common error messages and fixes

### Priority 2 (High Value)
- [ ] Past project case studies
- [ ] Validation frameworks
- [ ] Best practices documentation
- [ ] Model performance benchmarks
- [ ] Your organization's data sources

### Priority 3 (Nice to Have)
- [ ] Research paper summaries
- [ ] Industry benchmarks
- [ ] Advanced techniques
- [ ] Experimental approaches
- [ ] Tool comparisons

## Tips for Success

1. **Start small** - Upload 3-5 key documents first
2. **Test often** - Ask questions after each upload
3. **Iterate** - Improve documents based on chatbot responses
4. **Be specific** - More context = better answers
5. **Keep updated** - Refresh content as practices evolve

## Next Steps

1. ✅ Review these sample documents
2. ✅ Test by uploading them to your chatbot
3. ✅ Ask test questions to verify quality
4. ✅ Create your own documents using this format
5. ✅ Upload your team's actual knowledge
6. ✅ Train your team on how to use the chatbot

## Need Help?

- See `DOCUMENT_INGESTION_GUIDE.md` for detailed upload instructions
- See `CHATBOT_QUICKSTART.md` for testing
- See `CHATBOT_USAGE_GUIDE.md` for API details
