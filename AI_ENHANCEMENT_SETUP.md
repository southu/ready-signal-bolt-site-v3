# AI Enhancement Setup Guide

This guide explains how to set up and use the AI-powered enhancement features in the blog admin panel.

## Overview

The blog admin panel includes AI-powered enhancement buttons that use OpenAI's GPT-4o model to:
- **Enhance Title**: Optimize article titles for SEO and engagement
- **Enhance Description**: Create compelling meta descriptions (150-160 characters)
- **Enhance Content**: Improve article content for better readability and professionalism
- **SEO Analysis**: Get comprehensive SEO recommendations and scoring

## Setup Instructions

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to "API Keys" section
4. Click "Create new secret key"
5. Copy the API key (it starts with `sk-`)

### 2. Add API Key to Environment Variables

Add your OpenAI API key to the `.env` file in the project root:

```env
VITE_OPENAI_API_KEY=sk-your-api-key-here
```

**Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

### 3. Restart Development Server

After adding the API key, restart your development server:

```bash
npm run dev
```

## How It Works

The enhancement system uses two methods:

1. **Direct API Calls** (Primary): Calls OpenAI API directly from the browser
2. **Supabase Edge Function** (Fallback): Uses the `ai-enhance` edge function if configured

### Direct API Method
- Fastest and most reliable
- Works immediately after adding `VITE_OPENAI_API_KEY`
- No additional setup required
- API key is used client-side (keep it secure)

### Edge Function Method (Optional)
The edge function provides server-side processing but requires additional setup:

1. Add `OPENAI_API_KEY` to Supabase project secrets
2. Deploy the edge function to Supabase

## Using the Enhancement Features

### In the Blog Admin Panel

1. Navigate to `/admin-blog` and log in
2. Create or edit an article
3. Use the enhancement buttons:

#### Title Enhancement
- Click "Enhance Title" next to the title field
- AI will optimize the title for SEO (under 60 characters)
- Review and accept or modify the suggestion

#### Description Enhancement
- Click "Enhance Description" next to the description field
- AI creates an SEO-optimized meta description (150-160 characters)
- Uses the title and content as context

#### Content Enhancement
- Click "Enhance Content" next to the content editor
- AI improves readability, grammar, and structure
- Maintains HTML formatting

#### SEO Analysis
- Switch to the "SEO Analysis" tab
- Click "Analyze with AI"
- Get a comprehensive SEO score with:
  - Overall SEO score (0-100)
  - Suggested optimized title
  - Suggested meta description
  - Target keywords
  - Specific improvement recommendations

## Troubleshooting

### "API key missing" Error
- Make sure `VITE_OPENAI_API_KEY` is set in your `.env` file
- Restart the development server after adding the key
- Check that the key starts with `sk-`

### "Invalid API key" Error
- Verify your API key is correct at [OpenAI Platform](https://platform.openai.com/api-keys)
- Make sure the key is active and not revoked
- Check you have API credits available

### "Rate limited" Error
- You've exceeded OpenAI's rate limits
- Wait a few minutes before trying again
- Consider upgrading your OpenAI plan for higher limits

### Enhancement Takes Too Long
- Large content pieces may take 10-30 seconds
- Don't click the button multiple times
- Check your internet connection

## API Usage and Costs

### OpenAI API Pricing (GPT-4o)
- Input: ~$2.50 per 1M tokens
- Output: ~$10.00 per 1M tokens
- Typical enhancement: $0.01-0.05 per request

### Estimated Costs
- Title enhancement: ~$0.01 per enhancement
- Description enhancement: ~$0.01 per enhancement
- Content enhancement: ~$0.02-0.05 per enhancement
- SEO analysis: ~$0.02 per analysis

## Security Best Practices

1. **Never Share Your API Key**: Keep it private and secure
2. **Use Environment Variables**: Don't hardcode keys in code
3. **Monitor Usage**: Check OpenAI dashboard regularly
4. **Set Usage Limits**: Configure billing limits in OpenAI dashboard
5. **Rotate Keys**: Periodically generate new API keys

## Additional Notes

- The AI enhancement features are optional
- Articles can be created without using AI features
- AI suggestions should be reviewed before publishing
- The system uses GPT-4o, OpenAI's latest and most capable model
- All enhancements maintain the existing HTML structure

## Support

If you encounter issues:
1. Check the browser console for detailed error messages
2. Verify your API key is valid and active
3. Ensure you have sufficient API credits
4. Contact OpenAI support for API-specific issues
