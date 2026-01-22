import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSpreadsheet, 
  Table, 
  BarChart3, 
  AlertTriangle, 
  Sparkles, 
  TableProperties, 
  TrendingUp, 
  GitCompare, 
  Activity, 
  Brain,
  ChevronRight,
  Check,
  Loader2
} from 'lucide-react';

// Data and outputs
import { internalOnlyData, withExternalData, INTERNAL_COLUMNS } from './dataLoader';
import { 
  internalOnlyOutput, 
  withExternalOutput, 
  computeFeatureImportance 
} from './demoOutputs';
import grangerResults from './grangerResults.json';

// UI Components
import DataTable from './ui/DataTable';
import ModelStatsPanel from './ui/ModelStatsPanel';
import { FeatureImportanceChart, ComparisonChart } from './ui/Charts';
import PipelineRunner, { RegressionRunner } from './ui/PipelineRunner';
import HubSpotCTA, { SecondaryCTA } from './ui/HubSpotCTA';

// ============ TYPES ============

interface WizardStep {
  id: string;
  title: string;
  icon: React.ReactNode;
}

// ============ STEP DEFINITIONS ============

const WIZARD_STEPS: WizardStep[] = [
  { id: 'open', title: 'Open spreadsheet', icon: <FileSpreadsheet className="w-4 h-4" /> },
  { id: 'internal-table', title: 'View internal data', icon: <Table className="w-4 h-4" /> },
  { id: 'baseline-results', title: 'Baseline results', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'diagnostics', title: 'Diagnostics', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'enhance', title: 'Enhance with RS', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'enhanced-table', title: 'Enhanced data', icon: <TableProperties className="w-4 h-4" /> },
  { id: 'enhanced-results', title: 'Enhanced results', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'compare', title: 'Compare', icon: <GitCompare className="w-4 h-4" /> },
  { id: 'importance', title: 'Feature importance', icon: <Activity className="w-4 h-4" /> },
  { id: 'analysis', title: 'Analysis', icon: <Brain className="w-4 h-4" /> },
];

// ============ MAIN COMPONENT ============

export default function ReadySignalInteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [showExternalOnly, setShowExternalOnly] = useState(false);
  const [baselineRegressionDone, setBaselineRegressionDone] = useState(false);
  const [enhancedRegressionDone, setEnhancedRegressionDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToStep = (step: number) => {
    if (step >= 0 && step <= WIZARD_STEPS.length - 1) {
      setCurrentStep(step);
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const completeAndAdvance = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    goToStep(currentStep + 1);
  };

  const simulateLoading = async (duration: number = 2000) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, duration));
    setIsLoading(false);
  };

  const handleSpreadsheetLoad = async () => {
    await simulateLoading(2500);
    completeAndAdvance();
  };

  const featureImportance = computeFeatureImportance(withExternalOutput.coefficients);

  return (
    <div 
      ref={containerRef}
      className="bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-2xl border border-slate-200 shadow-xl"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal-400 font-medium mb-2">Interactive Demo</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Turn messy inputs into accurate forecasts—automatically.
          </h2>
          <p className="text-slate-300 mb-4">
            See how enrichment improves fit from <span className="text-amber-400 font-semibold">0.24</span> → <span className="text-emerald-400 font-semibold">0.79</span> adjusted R² in this demo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <SecondaryCTA 
              onClick={() => goToStep(0)} 
              label="See it in action right now"
            />
            <HubSpotCTA variant="primary" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Stepper */}
        <div className="lg:w-64 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 p-4">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {WIZARD_STEPS.map((step, idx) => {
              const isActive = currentStep === idx;
              const isComplete = completedSteps.has(idx);
              const isAccessible = idx <= currentStep || completedSteps.has(idx - 1);

              return (
                <button
                  key={step.id}
                  onClick={() => isAccessible && goToStep(idx)}
                  disabled={!isAccessible}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all whitespace-nowrap
                    ${isActive ? 'bg-teal-100 text-teal-800' : ''}
                    ${isComplete && !isActive ? 'text-emerald-600' : ''}
                    ${!isActive && !isComplete ? 'text-slate-500' : ''}
                    ${isAccessible ? 'hover:bg-slate-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                  `}
                >
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs
                    ${isActive ? 'bg-teal-600 text-white' : ''}
                    ${isComplete && !isActive ? 'bg-emerald-500 text-white' : ''}
                    ${!isActive && !isComplete ? 'bg-slate-200 text-slate-500' : ''}
                  `}>
                    {isComplete && !isActive ? <Check className="w-3 h-3" /> : step.icon}
                  </div>
                  <span className="text-sm font-medium hidden lg:block">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 0: Open Spreadsheet */}
              {currentStep === 0 && (
                <StepContainer
                  title="Open the spreadsheet"
                  subtitle="This is the starting point for most forecasting workflows."
                  showContinue={false}
                >
                  {!isLoading ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FileSpreadsheet className="w-10 h-10 text-slate-400" />
                      </div>
                      <button
                        onClick={handleSpreadsheetLoad}
                        className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
                      >
                        Load demo spreadsheet
                      </button>
                      <p className="text-sm text-slate-400 mt-4">
                        Or <button onClick={() => goToStep(2)} className="text-teal-600 hover:underline">skip to results</button>
                      </p>
                    </div>
                  ) : (
                    <LoadingState messages={[
                      'Reading workbook…',
                      'Detecting time grain…',
                      'Identifying target metric…',
                      'Preparing preview…',
                    ]} />
                  )}
                </StepContainer>
              )}

              {/* Step 1: Internal Table */}
              {currentStep === 1 && (
                <StepContainer
                  title="What you have today (internal-only)"
                  subtitle="A typical dataset: sales plus a couple controllable levers."
                  onContinue={completeAndAdvance}
                  continueLabel="Run baseline model"
                >
                  <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-sm text-amber-800">
                      <strong>What to notice:</strong> Sales move, but the drivers here can't explain all of it. That gap shows up as forecast error.
                    </p>
                  </div>
                  <DataTable 
                    rows={internalOnlyData.rows} 
                    columns={INTERNAL_COLUMNS}
                    highlightTarget
                  />
                  <p className="text-xs text-slate-400 mt-4 text-center italic">
                    This demo uses simulated data, but the workflow mirrors real projects.
                  </p>
                </StepContainer>
              )}

              {/* Step 2: Baseline Results */}
              {currentStep === 2 && (
                <StepContainer
                  title={baselineRegressionDone ? "Baseline model (internal-only)" : ""}
                  subtitle={baselineRegressionDone ? "A quick regression—what most teams can do in Excel." : ""}
                  onContinue={completeAndAdvance}
                  showContinue={baselineRegressionDone}
                  continueLabel="See what's missing"
                >
                  {!baselineRegressionDone ? (
                    <RegressionRunner 
                      variant="baseline"
                      onComplete={() => setBaselineRegressionDone(true)}
                      autoStart={true}
                    />
                  ) : (
                    <>
                      <ModelStatsPanel 
                        stats={internalOnlyOutput.stats}
                        coefficients={internalOnlyOutput.coefficients}
                        variant="baseline"
                      />
                      <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-200">
                        <h4 className="font-semibold text-slate-800 mb-4">What this model is telling us</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex gap-3">
                            <span className="text-emerald-500 mt-0.5">✓</span>
                            <div>
                              <span className="font-medium text-slate-700">A solid baseline:</span>
                              <span className="text-slate-600"> This is a typical internal-only model—directionally correct and useful, but incomplete.</span>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-emerald-500 mt-0.5">✓</span>
                            <div>
                              <span className="font-medium text-slate-700">Price per Unit dominates:</span>
                              <span className="text-slate-600"> Price shows a strong, highly significant negative relationship with unit sales, confirming the model is capturing real behavior.</span>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-emerald-500 mt-0.5">✓</span>
                            <div>
                              <span className="font-medium text-slate-700">Marketing appears very strong:</span>
                              <span className="text-slate-600"> Marketing spend is positive and statistically significant, suggesting it plays an important role—at least in this limited view.</span>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-amber-500 mt-0.5">⚠</span>
                            <div>
                              <span className="font-medium text-slate-700">Signals are overloaded:</span>
                              <span className="text-slate-600"> When internal-only models show a few variables doing most of the work, it often indicates missing external drivers.</span>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-amber-500 mt-0.5">⚠</span>
                            <div>
                              <span className="font-medium text-slate-700">Low adjusted R² (~24%):</span>
                              <span className="text-slate-600"> The model explains some variation, but most demand movement remains unexplained—pointing to factors outside this dataset.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </StepContainer>
              )}

              {/* Step 3: Diagnostics */}
              {currentStep === 3 && (
                <StepContainer
                  title="What the baseline is missing"
                  subtitle="The residual patterns suggest unmodeled drivers."
                  onContinue={completeAndAdvance}
                  continueLabel="Enhance with Ready Signal"
                >
                  <div className="space-y-4">
                    <IssueCard 
                      icon="🌍" 
                      title="External conditions not represented"
                      description="Economic, industry, and weather signals that correlate with sales are missing."
                    />
                    <IssueCard 
                      icon="⏰" 
                      title="Lag effects likely"
                      description="Drivers often impact sales with a delay. This isn't captured."
                    />
                    <IssueCard 
                      icon="📊" 
                      title="Residual variance remains high"
                      description="Standard error of ~4,400 units suggests significant unexplained variation."
                    />
                  </div>
                  <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-xl text-center">
                    <p className="text-teal-800 font-medium">
                      This is the moment Ready Signal steps in—automatically.
                    </p>
                  </div>
                </StepContainer>
              )}

              {/* Step 4: Pipeline */}
              {currentStep === 4 && (
                <StepContainer
                  title=""
                  subtitle=""
                  showContinue={false}
                >
                  <PipelineRunner 
                    onComplete={completeAndAdvance}
                    autoStart={true}
                  />
                </StepContainer>
              )}

              {/* Step 5: Enhanced Table */}
              {currentStep === 5 && (
                <StepContainer
                  title="Enhanced dataset (Ready Signal)"
                  subtitle="The same base data—now enriched with predictive external drivers."
                  onContinue={completeAndAdvance}
                  continueLabel="Run enhanced model"
                >
                  <div className="mb-4 p-4 bg-teal-50 border border-teal-200 rounded-xl">
                    <p className="text-sm text-teal-800">
                      <strong>What changed:</strong> We added drivers that explain the residual variance the baseline couldn't.
                    </p>
                  </div>
                  <DataTable 
                    rows={withExternalData.rows}
                    columns={withExternalData.columns}
                    showExternalBadges
                    highlightTarget
                  />
                </StepContainer>
              )}

              {/* Step 6: Enhanced Results */}
              {currentStep === 6 && (
                <StepContainer
                  title={enhancedRegressionDone ? "Model results (with Ready Signal)" : ""}
                  subtitle={enhancedRegressionDone ? "Same workflow—better inputs." : ""}
                  onContinue={completeAndAdvance}
                  continueLabel="Compare before vs after"
                  showContinue={enhancedRegressionDone}
                >
                  {!enhancedRegressionDone ? (
                    <RegressionRunner 
                      variant="enhanced"
                      onComplete={() => setEnhancedRegressionDone(true)}
                      autoStart={true}
                    />
                  ) : (
                    <>
                      <ModelStatsPanel 
                        stats={withExternalOutput.stats}
                        coefficients={withExternalOutput.coefficients}
                        variant="enhanced"
                      />
                      <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                        <h4 className="font-semibold text-emerald-800 mb-2">Interpretation</h4>
                        <ul className="text-sm text-emerald-700 space-y-1">
                          <li>• Explained variance jumps from ~24% → ~79% (adjusted).</li>
                          <li>• Most of the improvement comes from external drivers + lag structure.</li>
                        </ul>
                      </div>
                    </>
                  )}
                </StepContainer>
              )}

              {/* Step 7: Compare */}
              {currentStep === 7 && (
                <StepContainer
                  title="Before vs After"
                  subtitle="Same analysis. Different outcome."
                  onContinue={completeAndAdvance}
                  continueLabel="See what's driving results"
                >
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <ComparisonTile 
                      label="Adjusted R²"
                      before="0.240"
                      after="0.790"
                    />
                    <ComparisonTile 
                      label="Std. Error"
                      before="4,408"
                      after="2,319"
                    />
                    <ComparisonTile 
                      label="Significance F"
                      before="0.00045"
                      after="2.48e-14"
                    />
                  </div>
                  <ComparisonChart data={withExternalData.rows} />
                  <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-2">What this means for your business</h4>
                    <p className="text-sm text-slate-600">
                      More accurate forecasts reduce stockouts, overproduction, and last-minute labor adjustments.
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <HubSpotCTA variant="primary" />
                    <HubSpotCTA variant="secondary" label="Talk to an expert" />
                  </div>
                </StepContainer>
              )}

              {/* Step 8: Feature Importance */}
              {currentStep === 8 && (
                <StepContainer
                  title="What drives Unit Sales"
                  subtitle="Ranked drivers based on statistical contribution (demo)."
                  onContinue={completeAndAdvance}
                  continueLabel="View analysis"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showExternalOnly}
                        onChange={(e) => setShowExternalOnly(e.target.checked)}
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                      Show Ready Signal-added only
                    </label>
                  </div>
                  <FeatureImportanceChart 
                    features={featureImportance}
                    showOnlyExternal={showExternalOnly}
                  />
                  <p className="text-sm text-slate-500 mt-4 text-center">
                    Ready Signal-added drivers account for most of the lift.
                  </p>
                </StepContainer>
              )}

              {/* Step 9: Analysis */}
              {currentStep === 9 && (
                <StepContainer
                  title="Analysis"
                  subtitle="Executive narrative + predictive lead/lag relationships."
                  showContinue={false}
                >
                  {/* Narrative */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-2 text-teal-400 mb-4">
                      <Brain className="w-5 h-5" />
                      <span className="font-semibold">Analyst Summary</span>
                    </div>
                    <TypedNarrative />
                  </div>

                  {/* Predictive Power Table */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                      <h4 className="font-semibold text-slate-800">Predictive power</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-4 py-2 text-left font-medium text-slate-600">Feature</th>
                            <th className="px-4 py-2 text-center font-medium text-slate-600">Best Lag</th>
                            <th className="px-4 py-2 text-center font-medium text-slate-600">P-Value</th>
                            <th className="px-4 py-2 text-center font-medium text-slate-600">Interpretation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {grangerResults.results.map((result, idx) => (
                            <tr key={idx} className="border-b border-slate-100">
                              <td className="px-4 py-2.5 font-medium text-slate-700">
                                {formatFeatureName(result.feature)}
                              </td>
                              <td className="px-4 py-2.5 text-center text-slate-600">
                                {result.bestLag} months
                              </td>
                              <td className="px-4 py-2.5 text-center font-mono text-slate-600">
                                {result.pValue.toFixed(4)}
                              </td>
                              <td className="px-4 py-2.5 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  result.pValue <= 0.01 ? 'bg-emerald-100 text-emerald-700' :
                                  result.pValue <= 0.05 ? 'bg-amber-100 text-amber-700' :
                                  result.pValue <= 0.10 ? 'bg-orange-100 text-orange-700' :
                                  'bg-slate-100 text-slate-600'
                                }`}>
                                  {result.interpretation}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Final CTA */}
                  <div className="mt-8 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">Ready to improve your forecasts?</h3>
                    <p className="text-teal-100 mb-6">
                      Upload a sample or connect a source. We'll show you the lift in under a week.
                    </p>
                    <HubSpotCTA variant="primary" label="Run this on my data" className="!bg-white !text-teal-700 hover:!bg-teal-50" />
                  </div>
                </StepContainer>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ============ HELPER COMPONENTS ============

function StepContainer({ 
  title, 
  subtitle, 
  children,
  onContinue,
  continueLabel = 'Continue',
  showContinue = true,
}: { 
  title: string; 
  subtitle: string; 
  children: React.ReactNode;
  onContinue?: () => void;
  continueLabel?: string;
  showContinue?: boolean;
}) {
  return (
    <div>
      {/* Action button - LEFT side, top */}
      {showContinue && onContinue && (
        <div className="mb-6">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/25"
          >
            {continueLabel}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Title section */}
      {title && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}
      
      {children}
    </div>
  );
}

function LoadingState({ messages }: { messages: string[] }) {
  const [currentMessage, setCurrentMessage] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 600);
    return () => clearInterval(interval);
  });

  return (
    <div className="text-center py-12">
      <Loader2 className="w-12 h-12 text-teal-500 animate-spin mx-auto mb-4" />
      <p className="text-slate-600 font-medium">{messages[currentMessage]}</p>
    </div>
  );
}

function IssueCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: string; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-slate-200">
      <div className="text-2xl">{icon}</div>
      <div>
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function ComparisonTile({ 
  label, 
  before, 
  after 
}: { 
  label: string; 
  before: string; 
  after: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
      <div className="text-sm font-medium text-slate-500 mb-2">{label}</div>
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg font-mono text-slate-400">{before}</span>
        <ChevronRight className="w-4 h-4 text-slate-300" />
        <span className="text-lg font-mono font-bold text-emerald-600">{after}</span>
      </div>
    </div>
  );
}

function TypedNarrative() {
  const narrative = `After enrichment, the model's adjusted R² improves from 0.240 → 0.790, indicating the enhanced dataset explains substantially more of the month-to-month variation in Unit Sales.

The largest gains come from Ready Signal-added external drivers and lagged effects, which capture delayed demand response.

Top predictive signals include: Temperature (Lag 4), Other Separations (Lag 4), and Strawberry PPI.

Notably, Price per Unit remains directionally negative, but becomes less dominant once external conditions are included—suggesting demand swings are often driven by factors outside direct pricing and marketing controls.

Recommendation: operational planning should monitor these drivers as early indicators and incorporate scenario sensitivity when they shift.`;

  return (
    <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
      {narrative}
    </div>
  );
}

function formatFeatureName(name: string): string {
  return name
    .replace(/_Lag(\d+)$/, ' (Lag $1)')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// ============ EXPORT ============

export { ReadySignalInteractiveDemo };
