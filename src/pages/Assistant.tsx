import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, ChevronDown, ArrowLeft, Database, Brain, Zap, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat, Message } from '../contexts/ChatContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const getLoadingSteps = (query: string) => {
  const keywords = query
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 4 && !['what', 'where', 'when', 'how', 'why', 'which', 'about', 'should', 'could', 'would'].includes(word))
    .slice(0, 2)
    .join(' and ');

  const topic = keywords || 'your question';

  return [
    { icon: Search, text: `Scanning knowledge base for "${topic}"...`, color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Database, text: 'Querying vector embeddings database...', color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { icon: Brain, text: `Analyzing forecasting patterns for ${topic}...`, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { icon: Sparkles, text: 'Cross-referencing domain expertise...', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: Zap, text: 'Synthesizing contextual insights...', color: 'text-violet-500', bg: 'bg-violet-50' },
    { icon: Brain, text: 'Formulating comprehensive response...', color: 'text-amber-500', bg: 'bg-amber-50' },
  ];
};

export default function Assistant() {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [showSources, setShowSources] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setLoadingStep(0);
      const steps = getLoadingSteps(currentQuery);
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 1600);
      return () => clearInterval(interval);
    }
  }, [isLoading, currentQuery]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const message = inputValue;
    setCurrentQuery(message);
    setInputValue('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 flex flex-col">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-2xl">Forecasting Assistant</h1>
                <p className="text-amber-100">Get expert insights from our knowledge base</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8" style={{ maxHeight: 'calc(100vh - 400px)' }}>
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-amber-100 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                  <Sparkles className="w-12 h-12 text-amber-600" />
                </div>
                <h2 className="text-gray-900 font-bold text-3xl mb-3">
                  How can I help you today?
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Ask me anything about forecasting, demand planning, predictive analytics, or statistical modeling.
                </p>
                <div className="w-full max-w-xl">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                    Popular questions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'What external signals improve forecast accuracy?',
                      'How does ARIMA modeling work?',
                      'Best practices for seasonal forecasting',
                      'How to handle demand spikes?',
                      'Forecasting for new product launches',
                      'Time series vs machine learning approaches',
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setInputValue(suggestion);
                          inputRef.current?.focus();
                        }}
                        className="text-left bg-white border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:border-amber-400 hover:text-amber-700 hover:shadow-md transition-all group"
                      >
                        <span className="text-sm font-medium group-hover:translate-x-1 inline-block transition-transform">
                          {suggestion}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className="mb-8">
                <div
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl px-6 py-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-amber-500 text-white rounded-br-md shadow-md'
                        : 'bg-white text-gray-800 border-2 border-gray-200 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>

                {message.sources && message.sources.length > 0 && (
                  <div className="mt-3 ml-2">
                    <button
                      onClick={() => setShowSources(showSources === message.id ? null : message.id)}
                      className="text-sm text-gray-600 hover:text-amber-600 flex items-center gap-2 transition-colors font-medium"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${showSources === message.id ? 'rotate-180' : ''}`}
                      />
                      {message.sources.length} source{message.sources.length > 1 ? 's' : ''} referenced
                    </button>

                    <AnimatePresence>
                      {showSources === message.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 space-y-3">
                            {message.sources.map((source, idx) => (
                              <div
                                key={idx}
                                className="bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-amber-200 transition-colors"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-gray-800 truncate text-sm">
                                    {source.documentName}
                                  </span>
                                  <span className="text-amber-600 text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-full">
                                    {Math.round(source.relevanceScore * 100)}% match
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{source.content}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {message.role === 'assistant' && message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                  <div className="mt-4 ml-2">
                    <p className="text-sm text-gray-600 mb-3 font-semibold">You might also ask:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.suggestedQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setInputValue(question);
                            inputRef.current?.focus();
                          }}
                          className="text-sm bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-200 text-gray-700 px-4 py-2 rounded-full hover:from-amber-100 hover:to-amber-200 hover:border-amber-300 hover:shadow-md transition-all"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (() => {
              const steps = getLoadingSteps(currentQuery);
              const currentStep = steps[loadingStep];
              const isLastStep = loadingStep === steps.length - 1;
              return (
                <div className="flex justify-start mb-8">
                  <div className="bg-white border-2 border-gray-200 rounded-2xl rounded-bl-md px-6 py-5 shadow-lg max-w-md">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={loadingStep}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${currentStep.bg} rounded-xl flex items-center justify-center`}>
                            {(() => {
                              const Icon = currentStep.icon;
                              return <Icon className={`w-5 h-5 ${currentStep.color} animate-pulse`} />;
                            })()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <p className="text-sm text-gray-700 font-semibold">
                                {currentStep.text.replace('...', '')}
                              </p>
                              {isLastStep && (
                                <div className="flex gap-0.5 ml-1">
                                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }} />
                                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1s' }} />
                                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1s' }} />
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Step {loadingStep + 1} of {steps.length}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Progress</span>
                            <span>{Math.round(((loadingStep + 1) / steps.length) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            {isLastStep ? (
                              <motion.div
                                className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"
                                animate={{
                                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: 'linear'
                                }}
                                style={{
                                  width: '100%',
                                  backgroundSize: '200% 100%'
                                }}
                              />
                            ) : (
                              <motion.div
                                className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"
                                initial={{ width: `${(loadingStep / steps.length) * 100}%` }}
                                animate={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
                                transition={{ duration: 1.6, ease: 'easeInOut' }}
                              />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              );
            })()}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about forecasting techniques, best practices, or any related topic..."
                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-base focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all resize-none"
                    rows={3}
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-6 py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl flex items-center gap-2 transition-colors font-semibold shadow-lg shadow-amber-500/30 disabled:shadow-none"
                >
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                Responses are generated from our forecasting and predictive analytics knowledge base
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
