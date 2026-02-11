// Forecasting Fundamentals article metadata
// Content is imported as raw markdown strings from separate .md files

import whatIsForecasting from './forecasting-articles/what-is-forecasting-definition-distinctions-misconceptions.md?raw';
import forecastingProcess from './forecasting-articles/end-to-end-forecasting-process-decision-driven.md?raw';
import choosingTargets from './forecasting-articles/choosing-forecast-target-variables.md?raw';
import dataRequirements from './forecasting-articles/forecasting-data-requirements-signal-noise-external-data.md?raw';
import missingData from './forecasting-articles/managing-missing-data-time-series-forecasting.md?raw';
import modelClasses from './forecasting-articles/forecasting-model-classes-model-selection-guide.md?raw';
import evaluatingForecasts from './forecasting-articles/evaluate-forecast-quality-metrics-backtesting-decision-weighted.md?raw';
import scenarioForecasting from './forecasting-articles/scenario-forecasting-decision-making-under-uncertainty.md?raw';
import forecastFailures from './forecasting-articles/forecast-failures-regime-shifts-detection-governance-learning.md?raw';
import operationalizingForecasts from './forecasting-articles/integrating-forecasts-into-business-processes-continuous-improvement.md?raw';

export interface ForecastingArticle {
  /** Display title used in navigation and the page */
  title: string;
  /** URL-friendly slug – also the route segment */
  slug: string;
  /** Short description for SEO and Help Center cards */
  description: string;
  /** Image filename in /images/forecasting/ */
  image: string;
  /** Raw markdown content (imported via ?raw) */
  content: string;
  /** Numeric display order (1-10) */
  order: number;
}

/**
 * Strip YAML frontmatter from markdown content.
 * Frontmatter is delimited by --- at the start of the file.
 */
export function stripFrontmatter(md: string): string {
  const trimmed = md.trimStart();
  if (!trimmed.startsWith('---')) return trimmed;
  const endIdx = trimmed.indexOf('---', 3);
  if (endIdx === -1) return trimmed;
  return trimmed.slice(endIdx + 3).trimStart();
}

export const forecastingArticles: ForecastingArticle[] = [
  {
    title: 'What Forecasting Is (and Is Not)',
    slug: 'what-is-forecasting-definition-distinctions-misconceptions',
    description: 'A neutral, citation-ready definition of business forecasting—how it differs from planning and budgeting, common misconceptions, and implications for decision-makers.',
    image: 'what-is-forecasting-definition-distinctions-misconceptions.png',
    content: whatIsForecasting,
    order: 1,
  },
  {
    title: 'The Forecasting Process: From Question to Decision',
    slug: 'end-to-end-forecasting-process-decision-driven',
    description: 'A decision-driven guide to the end-to-end forecasting process: scoping decisions, translating questions, preparing data, selecting models, and iterating.',
    image: 'end-to-end-forecasting-process-decision-driven.png',
    content: forecastingProcess,
    order: 2,
  },
  {
    title: 'Choosing the Right Target Variable for a Forecast',
    slug: 'choosing-forecast-target-variables',
    description: 'Learn how to choose forecasting target variables that are observable, decision-relevant, and modelable—avoiding latent targets that degrade accuracy.',
    image: 'choosing-forecast-target-variables.png',
    content: choosingTargets,
    order: 3,
  },
  {
    title: 'Data Requirements for Forecasting (and How to Relax Them)',
    slug: 'forecasting-data-requirements-signal-noise-external-data',
    description: 'Learn what data forecasting truly needs—myths, signal-to-noise tradeoffs, external data roles, and strategies for forecasting with real-world limitations.',
    image: 'forecasting-data-requirements-signal-noise-external-data.png',
    content: dataRequirements,
    order: 4,
  },
  {
    title: 'Handling Missing, Noisy, and Incomplete Time Series',
    slug: 'managing-missing-data-time-series-forecasting',
    description: 'Learn how MCAR, MAR, and NMAR missingness affects forecasts, which imputation methods to use, and how to reduce bias and overconfidence in decisions.',
    image: 'managing-missing-data-time-series-forecasting.png',
    content: missingData,
    order: 5,
  },
  {
    title: 'Model Classes for Forecasting and When to Use Them',
    slug: 'forecasting-model-classes-model-selection-guide',
    description: 'A neutral, executive-ready guide to forecasting model classes—qualitative, time series, causal, and hybrid—plus assumptions, tradeoffs, and selection criteria.',
    image: 'forecasting-model-classes-model-selection-guide.png',
    content: modelClasses,
    order: 6,
  },
  {
    title: 'Evaluating Forecasts: Accuracy, Stability, and Usefulness',
    slug: 'evaluate-forecast-quality-metrics-backtesting-decision-weighted',
    description: 'Learn how to evaluate forecast quality using accuracy metrics, robust backtesting, and decision-weighted measures that reflect real business impact.',
    image: 'evaluate-forecast-quality-metrics-backtesting-decision-weighted.png',
    content: evaluatingForecasts,
    order: 7,
  },
  {
    title: 'Scenario Forecasting and Structured Uncertainty',
    slug: 'scenario-forecasting-decision-making-under-uncertainty',
    description: 'Learn scenario forecasting: baseline vs conditional forecasts, narratives, and uncertainty communication to improve decision-making under real-world constraints.',
    image: 'scenario-forecasting-decision-making-under-uncertainty.png',
    content: scenarioForecasting,
    order: 8,
  },
  {
    title: 'When Forecasts Fail: Detection and Response',
    slug: 'forecast-failures-regime-shifts-detection-governance-learning',
    description: 'Learn how to detect forecast failures, manage overrides, and adapt to regime shifts with governance and post-mortems to improve decisions under uncertainty.',
    image: 'forecast-failures-regime-shifts-detection-governance-learning.png',
    content: forecastFailures,
    order: 9,
  },
  {
    title: 'Operationalizing Forecasts for Ongoing Decision Making',
    slug: 'integrating-forecasts-into-business-processes-continuous-improvement',
    description: 'Learn how to integrate forecasting into planning with feedback loops, human oversight, and scalable infrastructure to improve decisions under uncertainty.',
    image: 'integrating-forecasts-into-business-processes-continuous-improvement.png',
    content: operationalizingForecasts,
    order: 10,
  },
];

/** Look up an article by its slug */
export function getArticleBySlug(slug: string): ForecastingArticle | undefined {
  return forecastingArticles.find((a) => a.slug === slug);
}

/** All valid slugs (useful for routing) */
export const forecastingSlugs = forecastingArticles.map((a) => a.slug);
