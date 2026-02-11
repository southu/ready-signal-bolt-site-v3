export const helpArticlesData = [
  {
    title: 'What Forecasting Is (and Is Not)',
    description: 'A formal definition of business forecasting, how it differs from planning and budgeting, and common misconceptions.',
    content: 'Forecasting is the practice of producing evidence-based estimates about future outcomes using historical data, current information, domain knowledge, and explicit assumptions. This resource defines forecasting, clarifies what it is for, and addresses common misconceptions.',
    url: '/what-is-forecasting-definition-distinctions-misconceptions/',
    category: 'Forecasting Fundamentals',
    tags: ['forecasting', 'definition', 'planning', 'budgeting', 'fundamentals']
  },
  {
    title: 'The Forecasting Process: From Question to Decision',
    description: 'A decision-driven guide to the end-to-end forecasting process from scoping decisions to deploying forecasts.',
    content: 'An end-to-end forecasting process organized around decision-making. Covers decision-first forecasting, translating business questions into targets, data preparation, model selection, validation, deployment, and communicating uncertainty.',
    url: '/end-to-end-forecasting-process-decision-driven/',
    category: 'Forecasting Fundamentals',
    tags: ['forecasting process', 'decision-making', 'model selection', 'data preparation', 'fundamentals']
  },
  {
    title: 'Choosing the Right Target Variable for a Forecast',
    description: 'How to select forecasting target variables that are observable, decision-relevant, and modelable.',
    content: 'A framework for selecting forecast targets that support decision-making. Covers observable vs latent variables, characteristics of good targets, stakeholder collaboration, common pitfalls, and practical examples.',
    url: '/choosing-forecast-target-variables/',
    category: 'Forecasting Fundamentals',
    tags: ['target variable', 'forecast target', 'observable variables', 'decision-relevant', 'fundamentals']
  },
  {
    title: 'Data Requirements for Forecasting (and How to Relax Them)',
    description: 'What data forecasting truly needs—myths, signal-to-noise tradeoffs, and strategies for real-world limitations.',
    content: 'A practical guide to forecasting data requirements covering data quality, common myths, forecasting with limited data, feature engineering, external data, and data governance frameworks.',
    url: '/forecasting-data-requirements-signal-noise-external-data/',
    category: 'Forecasting Fundamentals',
    tags: ['data requirements', 'data quality', 'signal-to-noise', 'external data', 'fundamentals']
  },
  {
    title: 'Handling Missing, Noisy, and Incomplete Time Series',
    description: 'Learn how missingness affects forecasts, which imputation methods to use, and how to reduce bias.',
    content: 'Managing missing data in time series forecasting. Covers MCAR, MAR, NMAR missingness types, interpolation and imputation methods, validation via masking, governance, and decision risks from imputation.',
    url: '/managing-missing-data-time-series-forecasting/',
    category: 'Forecasting Fundamentals',
    tags: ['missing data', 'imputation', 'time series', 'data quality', 'MCAR', 'MAR', 'NMAR', 'fundamentals']
  },
  {
    title: 'Model Classes for Forecasting and When to Use Them',
    description: 'A guide to forecasting model classes—qualitative, time series, causal, and hybrid—with selection criteria.',
    content: 'Forecasting model classes and practical guide to choosing the right approach. Covers qualitative, time series, causal, heuristic, ML/AI, and hybrid methods with assumptions, strengths, risks, and decision-first selection framework.',
    url: '/forecasting-model-classes-model-selection-guide/',
    category: 'Forecasting Fundamentals',
    tags: ['model classes', 'model selection', 'time series', 'regression', 'machine learning', 'fundamentals']
  },
  {
    title: 'Evaluating Forecasts: Accuracy, Stability, and Usefulness',
    description: 'How to evaluate forecast quality using metrics, backtesting, and decision-weighted performance measures.',
    content: 'Evaluate forecast quality with accuracy metrics (MAE, RMSE, MAPE), scaled metrics (MASE), probabilistic forecast evaluation, backtesting strategies, and decision-weighted metrics that reflect business consequences.',
    url: '/evaluate-forecast-quality-metrics-backtesting-decision-weighted/',
    category: 'Forecasting Fundamentals',
    tags: ['forecast evaluation', 'accuracy metrics', 'MAE', 'RMSE', 'MAPE', 'backtesting', 'fundamentals']
  },
  {
    title: 'Scenario Forecasting and Structured Uncertainty',
    description: 'A practical framework for scenario forecasting, baseline vs conditional forecasts, and communicating uncertainty.',
    content: 'Scenario forecasting as a decision tool. Covers baseline vs conditional forecasts, integrating models with scenarios, narratives, communicating uncertainty, and a 6-step practical workflow.',
    url: '/scenario-forecasting-decision-making-under-uncertainty/',
    category: 'Forecasting Fundamentals',
    tags: ['scenario forecasting', 'uncertainty', 'baseline forecast', 'conditional forecast', 'fundamentals']
  },
  {
    title: 'When Forecasts Fail: Detection and Response',
    description: 'Detect forecast failures, manage overrides, and adapt to regime shifts with governance and post-mortems.',
    content: 'Framework for detecting forecast failures and regime shifts using structural break detection, model drift monitoring, override governance, post-mortems, and recovery strategies.',
    url: '/forecast-failures-regime-shifts-detection-governance-learning/',
    category: 'Forecasting Fundamentals',
    tags: ['forecast failure', 'regime shift', 'model drift', 'governance', 'override', 'fundamentals']
  },
  {
    title: 'Operationalizing Forecasts for Ongoing Decision Making',
    description: 'How to integrate forecasting into planning with feedback loops, governance, and continuous improvement.',
    content: 'Integrating forecasts into business processes. Covers forecast-to-decision contracts, S&OP integration, FP&A forecasting, override governance, backtesting, monitoring, maturity model, and implementation sequence.',
    url: '/integrating-forecasts-into-business-processes-continuous-improvement/',
    category: 'Forecasting Fundamentals',
    tags: ['operationalizing forecasts', 'governance', 'S&OP', 'FP&A', 'continuous improvement', 'fundamentals']
  },
  {
    title: 'Ready Signal - A Brief Introduction',
    description: 'Get started with Ready Signal - learn how to find external data that improves your forecasts.',
    content: 'Ready Signal external data platform helps you find, prepare, and integrate third-party data into your forecasting and analytical models. Instead of spending weeks or months sourcing and cleaning external data, Ready Signal gives you instant access to thousands of curated, model-ready features from trusted sources.',
    url: '/ready-signal-a-brief-introduction/',
    category: 'Getting Started',
    tags: ['introduction', 'getting started', 'overview']
  },
  {
    title: 'How to Create a Signal - Video Version',
    description: 'Watch a step-by-step video guide on creating your first signal in Ready Signal.',
    content: 'Video tutorial showing how to create a signal in Ready Signal. Learn the complete process from data selection to signal creation in this comprehensive video guide.',
    url: '/how-to-create-a-signal-video-version/',
    category: 'Getting Started',
    tags: ['video', 'tutorial', 'signal creation', 'getting started']
  },
  {
    title: 'How to Create a Signal',
    description: 'Step-by-step guide to creating your first signal in Ready Signal.',
    content: 'Complete guide to creating signals in Ready Signal. Learn how to select data sources, configure parameters, and generate your first signal for forecasting and analysis.',
    url: '/how-to-create-a-signal/',
    category: 'Getting Started',
    tags: ['signal', 'tutorial', 'getting started', 'guide']
  },
  {
    title: 'How to Reduce the Size of Your Signal',
    description: 'Optimize your signal size for better performance and faster processing.',
    content: 'Learn techniques to reduce signal size while maintaining data quality. Discover how to optimize your signals for better performance, faster processing, and more efficient storage.',
    url: '/how-to-reduce-the-size-of-your-signal/',
    category: 'Signals and Features',
    tags: ['signal', 'optimization', 'performance']
  },
  {
    title: 'Overview of Feature Details Page',
    description: 'Understand the feature details page and how to use it effectively.',
    content: 'Comprehensive overview of the feature details page in Ready Signal. Learn how to interpret feature statistics, visualizations, and metadata to make informed decisions about your data.',
    url: '/overview-of-feature-details-page/',
    category: 'Signals and Features',
    tags: ['features', 'details', 'interface']
  },
  {
    title: 'Data Grains Explained',
    description: 'Understanding geographic and time granularity in your signals.',
    content: 'Learn about data grains in Ready Signal. Understand geographic grain (Country, State, City, ZIP) and time grain (Day, Week, Month, Quarter, Year) and how they affect your signal output.',
    url: '/data-grains-explained/',
    category: 'Geographic and Time Grains',
    tags: ['data grains', 'geography', 'time', 'granularity']
  },
  {
    title: 'Overview of Data Science Treatments',
    description: 'Transform and optimize your data with advanced statistical methods.',
    content: 'Comprehensive guide to data science treatments available in Ready Signal. Learn about transformations, normalizations, and other statistical methods to prepare your data for modeling.',
    url: '/overview-of-data-science-treatments/',
    category: 'Data Science Treatments',
    tags: ['data science', 'transformations', 'treatments']
  },
  {
    title: 'What is a Yeo-Johnson Power Transformation?',
    description: 'Learn about Yeo-Johnson transformations for normalizing data distributions.',
    content: 'Yeo-Johnson Power Transformation is a statistical method to normalize data distributions. Works with both positive and negative values, making it more versatile than Box-Cox transformation.',
    url: '/what-is-a-yeo-johnson-power-transformation/',
    category: 'Data Science Treatments',
    tags: ['transformation', 'yeo-johnson', 'normalization', 'statistics']
  },
  {
    title: 'What is Seasonal Adjustment?',
    description: 'Remove seasonal patterns from your time series data.',
    content: 'Seasonal adjustment removes predictable seasonal patterns from time series data to reveal underlying trends. Essential for accurate forecasting when your data has seasonal components.',
    url: '/what-is-seasonal-adjustment/',
    category: 'Data Science Treatments',
    tags: ['seasonal', 'time series', 'adjustment', 'deseasonalization']
  },
  {
    title: 'What is an Order-Norm Transformation?',
    description: 'Understand order-norm transformations for rank-based normalization.',
    content: 'Order-Norm Transformation converts data to ranks and then normalizes. Useful for handling outliers and creating more robust features for modeling.',
    url: '/what-is-an-order-norm-transformation/',
    category: 'Data Science Treatments',
    tags: ['transformation', 'normalization', 'ranking', 'order-norm']
  },
  {
    title: 'What does Advertising Adstock Mean?',
    description: 'Learn about adstock modeling for measuring advertising carry-over effects.',
    content: 'Advertising Adstock models the delayed and prolonged effect of advertising on sales. Accounts for how advertising impact persists over time, essential for marketing mix modeling.',
    url: '/what-does-advertising-adstock-mean/',
    category: 'Data Science Treatments',
    tags: ['adstock', 'advertising', 'marketing', 'carry-over']
  },
  {
    title: 'What is a Logarithmic Transformation?',
    description: 'Use log transformations to handle exponential growth and stabilize variance.',
    content: 'Logarithmic Transformation compresses large values and expands small values. Useful for handling exponential growth patterns and stabilizing variance in your data.',
    url: '/what-is-a-logarithmic-transformation/',
    category: 'Data Science Treatments',
    tags: ['transformation', 'logarithm', 'log', 'variance']
  },
  {
    title: 'What is a Box-Cox Transformation?',
    description: 'Box-Cox Transformations can help reduce non-constant variance in a dataset.',
    content: 'Box-Cox Transformation reduces heteroscedasticity (non-constant variance) by inflating low variance data and reducing high variance data to create uniform datasets. Essential for meeting assumptions of many statistical models.',
    url: '/what-is-a-box-cox-transformation/',
    category: 'Data Science Treatments',
    tags: ['transformation', 'box-cox', 'variance', 'statistics']
  },
  {
    title: 'Ready Signal API Documentation',
    description: 'Complete API reference for integrating Ready Signal into your applications.',
    content: 'Comprehensive API documentation for Ready Signal. Learn how to authenticate, query data, create signals, and integrate Ready Signal into your data pipelines and applications.',
    url: '/ready-signal-api-documentation/',
    category: 'APIs and Integrations',
    tags: ['api', 'documentation', 'integration', 'developer']
  },
  {
    title: 'Python SDK Documentation',
    description: 'Use the Ready Signal Python SDK for seamless integration.',
    content: 'Complete guide to the Ready Signal Python SDK. Learn how to install, authenticate, and use the Python client library to access Ready Signal data in your Python applications.',
    url: '/ready-signal-api-documentation-python-sdk/',
    category: 'APIs and Integrations',
    tags: ['python', 'sdk', 'api', 'integration']
  },
  {
    title: 'R 3.6+ Documentation',
    description: 'Integrate Ready Signal with R for statistical analysis and modeling.',
    content: 'Guide to using Ready Signal with R programming language. Learn how to access Ready Signal data in R for statistical analysis, modeling, and visualization.',
    url: '/ready-signal-api-documentation-r-3-6/',
    category: 'APIs and Integrations',
    tags: ['r', 'api', 'integration', 'statistics']
  },
  {
    title: 'R 3.6+ Video Example',
    description: 'Watch a video tutorial on using Ready Signal with R.',
    content: 'Video tutorial demonstrating Ready Signal integration with R. See practical examples of accessing and analyzing Ready Signal data in R.',
    url: '/ready-signal-api-documentation-r-3-6-video-example/',
    category: 'APIs and Integrations',
    tags: ['r', 'video', 'tutorial', 'example']
  },
  {
    title: 'How to Export Your Processed Data',
    description: 'Export your processed signals and control data for use in other tools.',
    content: 'Learn how to export processed data and signals from Ready Signal. Discover various export formats and integration options for using Ready Signal data in your existing tools and workflows.',
    url: '/how-to-export-your-processed-control-data-signal/',
    category: 'APIs and Integrations',
    tags: ['export', 'data', 'integration', 'download']
  },
  {
    title: 'Domo Data Connector',
    description: 'Connect Ready Signal directly to your Domo dashboards.',
    content: 'Ready Signal Domo Connector enables seamless integration with Domo BI platform. Automatically sync Ready Signal data to your Domo dashboards for real-time insights.',
    url: '/domo-data-connector/',
    category: 'APIs and Integrations',
    tags: ['domo', 'connector', 'integration', 'bi']
  },
  {
    title: 'Ready Signal and Domo - Case Study',
    description: 'See how companies use Ready Signal with Domo for better insights.',
    content: 'Case study showing real-world integration of Ready Signal with Domo. Learn how organizations leverage this integration for enhanced forecasting and business intelligence.',
    url: '/ready-signal-and-domo-case-study/',
    category: 'APIs and Integrations',
    tags: ['domo', 'case study', 'integration', 'success story']
  },
  {
    title: 'United States Zip Code Data Table',
    description: 'Free reference table of US ZIP codes with geographic information.',
    content: 'Comprehensive US ZIP code reference table. Includes ZIP codes with associated geographic information, useful for location-based analysis and modeling.',
    url: '/united-states-zip-code-data-table/',
    category: 'Free Data Tables',
    tags: ['zip code', 'geography', 'reference', 'data table']
  },
  {
    title: 'FIPS County Codes Data Table',
    description: 'Federal Information Processing Standard county codes reference.',
    content: 'FIPS county codes reference table. Federal standard codes for identifying US counties, essential for geographic analysis and data joining.',
    url: '/federal-information-processing-standard-fips-county-codes-data-table/',
    category: 'Free Data Tables',
    tags: ['fips', 'county codes', 'geography', 'reference']
  },
  {
    title: 'S&P 500 Companies Data Table',
    description: 'Reference table of S&P 500 companies with key information.',
    content: 'S&P 500 companies reference table. Includes company information, sectors, and other key data points for financial analysis and modeling.',
    url: '/sp-500-companies-data-table/',
    category: 'Free Data Tables',
    tags: ['sp500', 'stocks', 'companies', 'financial']
  },
  {
    title: 'Electoral College Data Table',
    description: 'US Electoral College votes by state reference table.',
    content: 'Electoral College reference table showing electoral votes by state. Useful for political analysis and election forecasting models.',
    url: '/electoral-college-data-table/',
    category: 'Free Data Tables',
    tags: ['electoral college', 'politics', 'voting', 'reference']
  },
  {
    title: 'State Abbreviation Data Table',
    description: 'US state abbreviations and full names reference.',
    content: 'US state abbreviations reference table. Maps state names to standard two-letter postal abbreviations for data standardization.',
    url: '/state-abbreviation-data-table/',
    category: 'Free Data Tables',
    tags: ['states', 'abbreviations', 'reference', 'geography']
  }
];
