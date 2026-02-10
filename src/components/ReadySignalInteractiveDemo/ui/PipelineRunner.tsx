import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, ChevronRight, Info } from 'lucide-react';

// ============ TYPES ============

interface PipelineStep {
  id: string;
  title: string;
  logs: string[];
  artifacts: string[];
  tooltip: string;
}

interface PipelineRunnerProps {
  onComplete: () => void;
  autoStart?: boolean;
}

// ============ PIPELINE STEPS DATA ============

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'validate',
    title: 'Validate target + time grain',
    logs: [
      'Scanning date index…',
      'Detected monthly cadence',
      'Target set: Unit Sales',
      'Seasonality scan: candidate patterns found',
    ],
    artifacts: ['Monthly cadence confirmed', 'Target locked'],
    tooltip: 'We confirm time grain and KPI so every downstream step is aligned.',
  },
  {
    id: 'profile',
    title: 'Profile data quality',
    logs: [
      'Checking missingness…',
      'Outlier scan in progress…',
      'Distribution summary generated',
      'Drift check: stable range detected',
    ],
    artifacts: ['Quality profile generated', 'Outliers flagged'],
    tooltip: 'We map data issues that silently increase forecast error.',
  },
  {
    id: 'normalize',
    title: 'Normalize + standardize units',
    logs: [
      'Standardizing numeric fields…',
      'Ensuring consistent units…',
      'Scaling features for stability…',
    ],
    artifacts: ['Units normalized', 'Stability improved'],
    tooltip: 'Clean inputs reduce volatility in model behavior.',
  },
  {
    id: 'backfill',
    title: 'Patch gaps (data backfill)',
    logs: [
      'Evaluating missing segments…',
      'Applying probabilistic backfill…',
      'Confidence bands computed',
      'Patch audit complete',
    ],
    artifacts: ['Gaps patched', 'Patch confidence recorded'],
    tooltip: "We fill missing values using signal-aware estimation—not naive averages.",
  },
  {
    id: 'discover',
    title: 'Discover candidate external signals',
    logs: [
      'Searching external signal library…',
      'Matching signals to Unit Sales behavior…',
      'Shortlisting candidates by correlation + stability…',
      'Candidate set assembled',
    ],
    artifacts: ['External signals added', 'Candidate shortlist created'],
    tooltip: 'We automatically find relevant drivers—economic, commodity, labor, weather, and more.',
  },
  {
    id: 'lags',
    title: 'Create lag/lead features',
    logs: [
      'Generating lag features (1–12)…',
      'Testing delayed response patterns…',
      'Lag candidates ranked',
    ],
    artifacts: ['Lag structure generated', 'Delayed impacts detected'],
    tooltip: 'Most real-world drivers impact sales with a delay. We capture that.',
  },
  {
    id: 'prune',
    title: 'Reduce noise (feature pruning)',
    logs: [
      'Removing redundant signals…',
      'Checking multicollinearity…',
      'Dropping unstable predictors…',
      'Feature set simplified',
    ],
    artifacts: ['Noise removed', 'Model-ready set'],
    tooltip: 'Less noise = stronger generalization and fewer false patterns.',
  },
  {
    id: 'lift',
    title: 'Score predictive lift',
    logs: [
      'Estimating incremental lift by signal…',
      'Ranking drivers by contribution…',
      'Top drivers identified',
    ],
    artifacts: ['Predictive lift measured', 'Top drivers ranked'],
    tooltip: 'We quantify what each added signal contributes—before you commit.',
  },
  {
    id: 'build',
    title: 'Build the enhanced modeling table',
    logs: [
      'Assembling final modeling frame…',
      'Aligning timestamps + lags…',
      'Final dataset locked',
    ],
    artifacts: ['Enhanced table ready', 'Ready Signal columns added'],
    tooltip: 'You get a clean, aligned dataset ready for modeling.',
  },
  {
    id: 'explain',
    title: 'Generate explainability pack',
    logs: [
      'Creating coefficient summary…',
      'Preparing feature importance view…',
      'Generating AI narrative skeleton…',
    ],
    artifacts: ['Explainability ready', 'Insights generated'],
    tooltip: "We package the 'why' alongside the forecast—so teams trust it.",
  },
];

// ============ MAIN COMPONENT ============

export default function PipelineRunner({ onComplete, autoStart = true }: PipelineRunnerProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);

  const runStep = useCallback(async (stepIndex: number) => {
    const step = PIPELINE_STEPS[stepIndex];
    setCurrentStep(stepIndex);
    setCurrentLogs([]);

    // Stream logs one at a time
    for (let i = 0; i < step.logs.length; i++) {
      await new Promise(r => setTimeout(r, 300 + Math.random() * 400));
      setCurrentLogs(prev => [...prev, step.logs[i]]);
    }

    // Mark complete
    await new Promise(r => setTimeout(r, 200));
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
  }, []);

  const runPipeline = useCallback(async () => {
    setIsRunning(true);
    setCompletedSteps(new Set());
    setCurrentStep(-1);

    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      await runStep(i);
    }

    await new Promise(r => setTimeout(r, 500));
    setIsRunning(false);
    onComplete();
  }, [runStep, onComplete]);

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => runPipeline(), 500);
      return () => clearTimeout(timer);
    }
  }, [autoStart, runPipeline]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-slate-800">
          Enhancing your dataset with Ready Signal
        </h3>
        <p className="text-slate-500 mt-1">
          Automated signal discovery + data prep—what normally takes days.
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-400 to-emerald-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((completedSteps.size) / PIPELINE_STEPS.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Pipeline steps */}
      <div className="space-y-3">
        {PIPELINE_STEPS.map((step, idx) => {
          const isComplete = completedSteps.has(idx);
          const isCurrent = currentStep === idx;
          const isPending = idx > currentStep;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`
                rounded-xl border transition-all
                ${isCurrent ? 'border-teal-300 bg-teal-50/50 shadow-sm' : ''}
                ${isComplete ? 'border-emerald-200 bg-emerald-50/30' : ''}
                ${isPending ? 'border-slate-200 bg-white opacity-50' : ''}
              `}
            >
              {/* Step header */}
              <div className="flex items-center gap-3 p-4">
                {/* Status icon */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center shrink-0
                  ${isComplete ? 'bg-emerald-500 text-white' : ''}
                  ${isCurrent ? 'bg-teal-500 text-white' : ''}
                  ${isPending ? 'bg-slate-200 text-slate-400' : ''}
                `}>
                  {isComplete ? (
                    <Check className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span className="text-sm font-medium">{idx + 1}</span>
                  )}
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${isComplete || isCurrent ? 'text-slate-800' : 'text-slate-500'}`}>
                      {step.title}
                    </span>
                    <button
                      onMouseEnter={() => setShowTooltip(idx)}
                      onMouseLeave={() => setShowTooltip(null)}
                      className="p-0.5 text-slate-400 hover:text-slate-600 relative"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <AnimatePresence>
                        {showTooltip === idx && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-10 w-64 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-lg"
                          >
                            {step.tooltip}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>

                  {/* Artifacts (shown when complete) */}
                  {isComplete && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {step.artifacts.map((artifact, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full"
                        >
                          <Check className="w-3 h-3" />
                          {artifact}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expand indicator */}
                <ChevronRight className={`w-4 h-4 transition-transform ${isCurrent ? 'rotate-90 text-teal-500' : 'text-slate-300'}`} />
              </div>

              {/* Streaming logs (only show for current step) */}
              <AnimatePresence>
                {isCurrent && currentLogs.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 overflow-hidden"
                  >
                    <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs space-y-1">
                      {currentLogs.map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-emerald-400"
                        >
                          <span className="text-slate-500 mr-2">›</span>
                          {log}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Completion summary */}
      <AnimatePresence>
        {completedSteps.size === PIPELINE_STEPS.length && !isRunning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 text-center"
          >
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">
              Enhancement complete
            </h4>
            <ul className="text-sm text-slate-600 space-y-1 mb-4">
              <li>✓ External signals added + lag effects captured</li>
              <li>✓ Noise reduced + dataset stabilized</li>
              <li>✓ Ready for higher-accuracy forecasting</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ REGRESSION RUNNER COMPONENT ============

interface RegressionStep {
  id: string;
  title: string;
  logs: string[];
  artifact: string;
}

const BASELINE_REGRESSION_STEPS: RegressionStep[] = [
  {
    id: 'prepare',
    title: 'Prepare data matrix',
    logs: [
      'Building design matrix…',
      'Encoding target variable…',
      'Validating input dimensions…',
    ],
    artifact: 'Matrix ready (52 × 3)',
  },
  {
    id: 'validate',
    title: 'Validate assumptions',
    logs: [
      'Checking for missing values…',
      'Testing variance inflation…',
      'Inputs validated',
    ],
    artifact: 'Assumptions checked',
  },
  {
    id: 'fit',
    title: 'Fit OLS regression',
    logs: [
      'Computing least squares solution…',
      'Estimating coefficients…',
      'Calculating standard errors…',
    ],
    artifact: 'Model fitted',
  },
  {
    id: 'diagnostics',
    title: 'Calculate diagnostics',
    logs: [
      'Computing R² and adjusted R²…',
      'Running ANOVA decomposition…',
      'Generating p-values…',
    ],
    artifact: 'Diagnostics complete',
  },
];

const ENHANCED_REGRESSION_STEPS: RegressionStep[] = [
  {
    id: 'prepare',
    title: 'Prepare enhanced data matrix',
    logs: [
      'Loading enriched feature set…',
      'Building design matrix (7 predictors)…',
      'Aligning lag structures…',
    ],
    artifact: 'Matrix ready (52 × 8)',
  },
  {
    id: 'validate',
    title: 'Validate assumptions',
    logs: [
      'Checking multicollinearity (VIF)…',
      'Testing heteroskedasticity…',
      'Validating feature stability…',
    ],
    artifact: 'Enhanced features validated',
  },
  {
    id: 'fit',
    title: 'Fit OLS regression',
    logs: [
      'Computing least squares solution…',
      'Estimating 8 coefficients…',
      'Calculating robust standard errors…',
    ],
    artifact: 'Enhanced model fitted',
  },
  {
    id: 'diagnostics',
    title: 'Calculate diagnostics',
    logs: [
      'Computing R² and adjusted R²…',
      'Running ANOVA decomposition…',
      'Testing coefficient significance…',
    ],
    artifact: 'Diagnostics complete',
  },
  {
    id: 'compare',
    title: 'Compare to baseline',
    logs: [
      'Calculating improvement metrics…',
      'Measuring variance explained lift…',
      'Ranking feature contributions…',
    ],
    artifact: 'Improvement: +55% adj. R²',
  },
];

interface RegressionRunnerProps {
  onComplete: () => void;
  variant: 'baseline' | 'enhanced';
  autoStart?: boolean;
}

export function RegressionRunner({ onComplete, variant, autoStart = true }: RegressionRunnerProps) {
  const steps = variant === 'enhanced' ? ENHANCED_REGRESSION_STEPS : BASELINE_REGRESSION_STEPS;
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runStep = useCallback(async (stepIndex: number) => {
    const step = steps[stepIndex];
    setCurrentStep(stepIndex);
    setCurrentLogs([]);

    // Stream logs
    for (let i = 0; i < step.logs.length; i++) {
      await new Promise(r => setTimeout(r, 250 + Math.random() * 300));
      setCurrentLogs(prev => [...prev, step.logs[i]]);
    }

    // Mark complete
    await new Promise(r => setTimeout(r, 150));
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
  }, [steps]);

  const runRegression = useCallback(async () => {
    setIsRunning(true);
    setCompletedSteps(new Set());
    setCurrentStep(-1);

    for (let i = 0; i < steps.length; i++) {
      await runStep(i);
    }

    await new Promise(r => setTimeout(r, 400));
    setIsRunning(false);
    onComplete();
  }, [steps, runStep, onComplete]);

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => runRegression(), 300);
      return () => clearTimeout(timer);
    }
  }, [autoStart, runRegression]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-slate-800">
          {variant === 'enhanced' ? 'Running Enhanced Regression' : 'Running Baseline Regression'}
        </h3>
        <p className="text-slate-500 mt-1">
          {variant === 'enhanced' 
            ? 'Fitting model with Ready Signal-added features…' 
            : 'Fitting model with internal data only…'}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${variant === 'enhanced' 
            ? 'bg-gradient-to-r from-teal-400 to-emerald-500' 
            : 'bg-gradient-to-r from-slate-400 to-slate-500'}`}
          initial={{ width: '0%' }}
          animate={{ width: `${((completedSteps.size) / steps.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, idx) => {
          const isComplete = completedSteps.has(idx);
          const isCurrent = currentStep === idx;
          const isPending = idx > currentStep;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.03 }}
              className={`
                rounded-lg border transition-all p-3
                ${isCurrent ? 'border-teal-300 bg-teal-50/50' : ''}
                ${isComplete ? 'border-emerald-200 bg-emerald-50/30' : ''}
                ${isPending ? 'border-slate-200 bg-white opacity-40' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                {/* Status icon */}
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs
                  ${isComplete ? 'bg-emerald-500 text-white' : ''}
                  ${isCurrent ? 'bg-teal-500 text-white' : ''}
                  ${isPending ? 'bg-slate-200 text-slate-400' : ''}
                `}>
                  {isComplete ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : isCurrent ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span className="font-medium">{idx + 1}</span>
                  )}
                </div>

                {/* Title + artifact */}
                <div className="flex-1 flex items-center justify-between gap-2">
                  <span className={`font-medium text-sm ${isComplete || isCurrent ? 'text-slate-800' : 'text-slate-500'}`}>
                    {step.title}
                  </span>
                  {isComplete && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium"
                    >
                      {step.artifact}
                    </motion.span>
                  )}
                </div>
              </div>

              {/* Streaming logs */}
              <AnimatePresence>
                {isCurrent && currentLogs.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2 overflow-hidden"
                  >
                    <div className="bg-slate-900 rounded p-2 font-mono text-xs space-y-0.5">
                      {currentLogs.map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-emerald-400"
                        >
                          <span className="text-slate-500 mr-1.5">›</span>
                          {log}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Completion */}
      <AnimatePresence>
        {completedSteps.size === steps.length && !isRunning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              rounded-lg p-4 text-center
              ${variant === 'enhanced' 
                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200' 
                : 'bg-slate-50 border border-slate-200'}
            `}
          >
            <div className="flex items-center justify-center gap-2">
              <Check className={`w-5 h-5 ${variant === 'enhanced' ? 'text-emerald-600' : 'text-slate-600'}`} />
              <span className={`font-semibold ${variant === 'enhanced' ? 'text-emerald-800' : 'text-slate-700'}`}>
                {variant === 'enhanced' ? 'Enhanced model ready' : 'Baseline model ready'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
