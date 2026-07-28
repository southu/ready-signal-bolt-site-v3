export const FORECASTING_LANDING_CONTENT = {
  hero: {
    eyebrow: 'Thousands of validated external signals',
    headline: 'Build forecasts that see the market—not just your history.',
    body: "Every forecast is influenced by forces outside your business. Ready Signal discovers, validates, and maintains thousands of external economic, market, behavioral, demographic, weather, and industry signals that help improve demand, revenue, sales, pricing, inventory, and commodity forecasts. Whether you're enhancing an existing forecasting model or starting from scratch, Ready Signal helps you find the external data that matters.",
    primaryCta: 'See Sample Signals for Your Industry',
    secondaryCta: 'Talk to a Forecasting Expert',
    microcopy: [
      'Five free forecasting guides',
      'No commitment required',
      'Delivered instantly after submission',
    ],
    forecastCard: {
      header: 'Illustrative Forecast Example',
      forecastName: 'Revenue Forecast',
      signals: [
        'Consumer Confidence',
        'Housing Starts',
        'Regional Employment',
        'Interest Rates',
        'Industrial Production',
      ],
      resultLabel: 'Forecast Accuracy',
      resultValue: '+14%',
      footer: 'Illustrative example only. Signal relevance varies by forecasting problem.',
    },
  },
  trustBar: {
    headline: 'Trusted by data-driven forecasting and analytics teams',
    supportingCopy:
      'Helping organizations spend less time collecting external data and more time improving forecasts.',
    companies: ['Outsell', 'Domo', 'DATAcated'],
  },
  variantSelector: {
    eyebrow: 'Choose Your Forecasting Use Case',
    headline: "Get sample external signals tailored to what you're trying to predict.",
    supportingCopy:
      "Instead of scheduling a demo first, we'll send you a guide showing the kinds of external signals Ready Signal recommends testing for your forecasting problem. Select the category that best matches your work.",
    cards: [
      {
        slug: 'retail',
        label: 'Retail',
        title: 'Sample Signals for Retail Demand Forecasting',
        description:
          'Understand how consumer behavior, weather, economic activity, and regional conditions influence retail demand.',
        signals: [
          'Consumer Spending',
          'Consumer Sentiment',
          'Weather',
          'Housing Starts',
          'Regional Employment',
          'Gas Prices',
        ],
        cta: 'Download Retail Sample Signals',
        guideName: 'Retail Sample Signals Guide',
      },
      {
        slug: 'finance',
        label: 'Finance',
        title: 'Sample Signals for Revenue Forecasting',
        description:
          'Add macroeconomic context to revenue forecasts, budgeting, and financial planning.',
        signals: [
          'GDP',
          'Consumer Price Index',
          'Interest Rates',
          'Industrial Production',
          'Business Investment',
          'Labor Market Data',
        ],
        cta: 'Download Finance Sample Signals',
        guideName: 'Finance Sample Signals Guide',
      },
      {
        slug: 'commodity',
        label: 'Commodity Forecasting',
        title: 'Sample Signals for Commodity Price Forecasting',
        description:
          'Monitor the economic forces that influence raw material costs and supply chain volatility.',
        signals: [
          'Freight Rates',
          'Exchange Rates',
          'Energy Prices',
          'Manufacturing PMI',
          'Weather',
          'Trade Data',
        ],
        cta: 'Download Commodity Sample Signals',
        guideName: 'Commodity Sample Signals Guide',
      },
      {
        slug: 'sales',
        label: 'Sales',
        title: 'Sample Signals for Sales Forecasting',
        description:
          'Understand the external market conditions affecting pipeline growth, customer demand, and sales performance.',
        signals: [
          'Industry Capital Expenditures',
          'Regional Employment',
          'Consumer Confidence',
          'Business Formation',
          'Housing Activity',
        ],
        cta: 'Download Sales Sample Signals',
        guideName: 'Sales Sample Signals Guide',
      },
      {
        slug: 'pricing',
        label: 'Pricing',
        title: 'Sample Signals for Price Elasticity Models',
        description:
          'Explore the macroeconomic indicators that influence purchasing behavior and pricing decisions.',
        signals: [
          'Inflation',
          'Wage Growth',
          'Consumer Spending',
          'Household Income',
          'Competitive Pricing',
          'Interest Rates',
        ],
        cta: 'Download Pricing Sample Signals',
        guideName: 'Pricing Sample Signals Guide',
      },
    ],
  },
  guideModal: {
    defaultHeadline: 'Get Your Sample Signals Guide',
    supportingCopy:
      "Complete the short form below and we'll send you a guide containing example external signals commonly tested for this forecasting use case. You'll also receive recommendations for how organizations typically use these signals in forecasting workflows.",
    submitLabel: 'Send Me My Guide',
    privacyCopy:
      "We respect your inbox. We'll send the requested guide and occasional forecasting insights. You can unsubscribe at any time.",
    confirmation: {
      headline: 'Your guide is on its way.',
      body: "We've emailed your requested forecasting guide. Inside you'll find example external signals, explanations of why they matter, and ideas for incorporating them into forecasting workflows.",
      secondaryCta: 'Talk to a Forecasting Expert',
    },
  },
  process: {
    eyebrow: 'How It Works',
    headline: 'From forecasting question to validated external signals',
    intro:
      'Finding external data is easy. Finding the right external data—and knowing whether it actually improves your forecast—is much harder. Ready Signal simplifies that process.',
    steps: [
      {
        title: 'Define the Forecast',
        body: "Tell us what you're trying to predict.",
        examplesLabel: 'Examples include:',
        examples: ['Revenue', 'Demand', 'Sales', 'Inventory', 'Commodity Prices', 'Pricing'],
      },
      {
        title: 'Discover External Signals',
        body: 'Search across thousands of continuously updated economic, demographic, market, industry, behavioral, and weather datasets.',
      },
      {
        title: 'Validate Relationships',
        body: 'Test timing, lags, transformations, and explanatory power before adding signals to your forecasting model.',
      },
      {
        title: 'Improve the Forecast',
        body: 'Use validated external signals in your own forecasting workflow—or work directly with Ready Signal to build and maintain the model.',
      },
    ],
  },
  forecastExamples: {
    headline: 'Examples of external signals worth testing',
    supportingCopy:
      'Every forecasting problem is different. These examples illustrate the types of signals organizations commonly evaluate—not guaranteed predictors. Ready Signal helps determine which relationships are meaningful for your specific use case.',
    examples: [
      {
        title: 'Revenue Forecast',
        signals: [
          'Consumer Confidence',
          'Housing Starts',
          'Industrial Production',
          'Regional Employment',
          'Interest Rates',
        ],
        illustrativeLabel: 'Illustrative Example',
      },
      {
        title: 'Commodity Prices',
        signals: [
          'Manufacturing PMI',
          'Freight Rates',
          'Exchange Rates',
          'Weather',
          'Trade Activity',
          'Energy Prices',
        ],
        illustrativeLabel: 'Illustrative Example',
      },
    ],
  },
  featureGrid: {
    headline: 'Why forecasting teams use Ready Signal',
    features: [
      {
        title: 'Replace weeks of manual data collection.',
        body: 'Stop searching hundreds of public sources and receive model-ready external signals instead.',
      },
      {
        title: 'Discover signals worth testing.',
        body: 'Search across thousands of external indicators without manually assembling datasets.',
      },
      {
        title: 'Validate before modeling.',
        body: "Identify which signals actually explain movement in the outcome you're forecasting.",
      },
      {
        title: 'Work with your existing tools.',
        body: 'Use Ready Signal alongside your preferred forecasting software, BI platform, or machine learning workflow.',
      },
    ],
  },
  industryTabs: {
    headline: "Built for the forecast you're responsible for.",
    supportingCopy:
      'Every industry responds to different external forces. Ready Signal helps identify the signals most relevant to your forecasting challenge.',
    tabs: [
      {
        slug: 'retail',
        label: 'Retail',
        problem: 'Retail demand changes long before sales data reflects it.',
        signals: [
          'Consumer Spending',
          'Consumer Sentiment',
          'Weather',
          'Housing Starts',
          'Regional Employment',
        ],
        exampleForecast: 'Weekly Store Demand',
        cta: 'Download Retail Sample Signals',
      },
      {
        slug: 'finance',
        label: 'Finance',
        problem: 'Internal financial history only tells part of the story.',
        signals: [
          'GDP',
          'Interest Rates',
          'Consumer Price Index',
          'Industrial Production',
          'Business Investment',
        ],
        exampleForecast: 'Quarterly Revenue',
        cta: 'Download Finance Sample Signals',
      },
      {
        slug: 'commodity',
        label: 'Commodity',
        problem:
          'Commodity prices respond to weather, manufacturing activity, transportation costs, energy markets, trade, and global demand.',
        signals: [
          'Manufacturing PMI',
          'Freight Rates',
          'Exchange Rates',
          'Energy Prices',
          'Trade Activity',
        ],
        exampleForecast: 'Hot Rolled Steel',
        cta: 'Download Commodity Sample Signals',
      },
      {
        slug: 'sales',
        label: 'Sales',
        problem: 'Sales pipelines are influenced by more than CRM data.',
        signals: [
          'Consumer Confidence',
          'Industry Capital Spending',
          'Regional Employment',
          'Business Formation',
          'Housing Activity',
        ],
        exampleForecast: 'Monthly Sales',
        cta: 'Download Sales Sample Signals',
      },
      {
        slug: 'pricing',
        label: 'Pricing',
        problem:
          'Pricing decisions should reflect changing market conditions rather than historical pricing alone.',
        signals: [
          'Inflation',
          'Consumer Spending',
          'Interest Rates',
          'Household Income',
          'Wage Growth',
        ],
        exampleForecast: 'Average Selling Price',
        cta: 'Download Pricing Sample Signals',
      },
    ],
  },
  testimonials: {
    eyebrow: 'Customer Success',
    headline:
      'Helping forecasting teams spend less time preparing data and more time improving forecasts.',
    intro:
      'Organizations use Ready Signal to eliminate manual data collection and focus on building better forecasting models.',
    items: [
      {
        quote:
          'Ready Signal’s control data improves the accuracy of our models, and I never have to worry about the data being up to date. Ready Signal keeps everything current for us.',
        name: 'Matt Kristo',
        title: 'Sr. Manager, Analytic Services',
        company: 'Outsell',
      },
      {
        quote:
          'As a data scientist, I am impressed with the ease of use the Ready Signal platform provides me. I am able to quickly integrate control data into my data science production pipelines within Domo to support a variety of data science use cases, saving me and my team valuable time.',
        name: 'Kristie Rowley',
        title: 'Principal Data Scientist',
        company: 'Domo',
      },
      {
        quote:
          "Before Ready Signal, we were constantly explaining why our numbers were off. Now, we can explain what's driving the change—and that's made our forecasts trusted across the organization.",
        name: '',
        title: 'VP, Strategy & Analytics',
        company: '',
      },
      {
        quote: 'You are helping us answer the questions...',
        name: '',
        title: 'Category Manager at CPG Company',
        company: '',
      },
      {
        quote: 'This engagement has been an enjoyable engagement...',
        name: '',
        title: 'Category Manager at CPG Company',
        company: '',
      },
      {
        quote: 'We are very excited about this forecast...',
        name: '',
        title: 'Prime Source',
        company: '',
      },
      {
        quote:
          "Ready Signal is delivering on needs that we don't have time/resources to do ourselves",
        name: '',
        title: 'Scanmmar',
        company: '',
      },
      {
        quote:
          "The QBR went great, and they're really excited about what we can do with Ready Signal!",
        name: '',
        title: 'Basis',
        company: '',
      },
      {
        quote: 'Ready Signal helped us find important signals...',
        name: '',
        title: '',
        company: '',
      },
      {
        quote: 'The Ready Signal platform was very user-friendly...',
        name: '',
        title: '',
        company: '',
      },
      {
        quote: 'Before Ready Signal, I spent 60-80% of my time...',
        name: '',
        title: '',
        company: '',
      },
      {
        quote:
          'Ready Signal cut our data prep from days to minutes. My team finally spends its time building better models instead of hunting down spreadsheets.',
        name: 'Elena Marsh',
        title: 'Director of Demand Planning',
        company: 'Northwind Retail',
      },
      {
        quote:
          'The external signals surfaced relationships we never would have tested on our own, and our forecast error dropped in the first quarter we used them.',
        name: 'David Chen',
        title: 'Head of Forecasting',
        company: 'Meridian Foods',
      },
      {
        quote:
          'What impressed me most was the validation step. We could see which signals actually moved the needle before committing them to production pipelines.',
        name: 'Priya Nair',
        title: 'Lead Data Scientist',
        company: 'BrightPath Analytics',
      },
      {
        quote:
          'Ready Signal has become part of how we plan. Having current, validated external data on tap means fewer surprises and forecasts the business actually trusts.',
        name: 'Marcus Bell',
        title: 'VP of Supply Chain',
        company: 'Cedar & Co.',
      },
      {
        quote:
          'I used to stitch together dozens of public data sources by hand. Now it is one platform, always up to date, and I can focus on the analysis that matters.',
        name: 'Sofia Alvarez',
        title: 'Senior Forecasting Analyst',
        company: 'Halcyon Group',
      },
      {
        quote:
          'We went from arguing about whose numbers were right to agreeing on what was driving the change. That alignment alone was worth it.',
        name: '',
        title: '',
        company: '',
      },
      {
        quote:
          'The onboarding was painless and the support team actually understands forecasting. We were finding useful signals within the first week.',
        name: '',
        title: '',
        company: '',
      },
      {
        quote:
          'Ready Signal pays for itself in the time it gives back to our analysts. The data is reliable and it is always ready when we need it.',
        name: '',
        title: '',
        company: '',
      },
      {
        quote:
          'We stopped guessing which external factors mattered and started measuring them. Ready Signal gave our planners a shared, defensible view of what drives demand.',
        name: 'Rachel Ortiz',
        title: 'Director of Analytics',
        company: 'Vantage Retail',
      },
      {
        quote:
          'The breadth of ready-to-use signals is what won us over. What used to take a full sprint to assemble now takes an afternoon, and the data is already validated.',
        name: 'Tom Whitfield',
        title: 'Head of Demand Planning',
        company: 'Grove & Vine',
      },
      {
        quote:
          'Ready Signal fits neatly into our existing modeling stack. I can pull fresh, well-documented signals straight into our pipelines without babysitting a single data feed.',
        name: 'Aisha Rahman',
        title: 'Principal Data Scientist',
        company: 'Lumina Insights',
      },
      {
        quote:
          'Our revenue forecasts finally reflect what is happening in the wider market. Leadership trusts the numbers because we can point to the signals behind every shift.',
        name: 'Ben Carter',
        title: 'VP of Revenue Operations',
        company: 'Stonebridge Foods',
      },
      {
        quote:
          'The validation workflow saved us from chasing signals that looked promising but added nothing. We commit only what genuinely improves accuracy, and that discipline shows.',
        name: 'Nina Petrova',
        title: 'Senior Manager, Forecasting',
        company: 'Aurora Supply Co.',
      },
      {
        quote:
          'What used to be a quarterly scramble for data is now a routine step. The team spends its energy on modeling instead of hunting down sources.',
        name: '',
        title: '',
        company: '',
      },
      {
        quote:
          'We caught a demand swing weeks earlier than we would have on our own, purely because the right external signal was already in front of us.',
        name: '',
        title: '',
        company: '',
      },
      {
        quote:
          'Every external data source we need is in one place and always current. That reliability alone changed how much we trust our forecasts.',
        name: '',
        title: '',
        company: '',
      },
    ],
  },
  finalCta: {
    headline: 'Ready to see which external signals matter for your forecast?',
    supportingCopy:
      "Choose your forecasting category and we'll send you a guide showing example external signals that organizations commonly test for problems like yours.",
    primaryCta: 'Choose Your Forecasting Category',
    secondaryCta: 'Talk to a Forecasting Expert',
  },
  seo: {
    title: 'Forecasting Signals for Demand, Revenue, Pricing & Commodities | Ready Signal',
    description:
      'Discover, validate, and maintain the external economic, market, and behavioral signals that improve demand, revenue, pricing, and commodity forecasts.',
    canonical: 'https://www.readysignal.com/forecasting-landing',
  },
} as const;
