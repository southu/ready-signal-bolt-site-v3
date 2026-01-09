import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, ChevronDown, Maximize2, Database, Brain, Zap, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useChat, Message } from '../../contexts/ChatContext';

interface ChatBotProps {
  position?: 'bottom-right' | 'bottom-left';
}

const getLoadingSteps = (query: string) => {
  const keywords = query
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 4 && !['what', 'where', 'when', 'how', 'why', 'which', 'about', 'should', 'could', 'would'].includes(word))
    .slice(0, 2)
    .join(' and ');

  const topic = keywords || 'your question';

  return [
    { icon: Search, text: `Scanning knowledge base for "${topic}"...`, color: 'text-blue-500' },
    { icon: Database, text: 'Querying vector embeddings database...', color: 'text-cyan-500' },
    { icon: Brain, text: `Analyzing forecasting patterns for ${topic}...`, color: 'text-indigo-500' },
    { icon: Sparkles, text: 'Cross-referencing domain expertise...', color: 'text-purple-500' },
    { icon: Zap, text: 'Synthesizing contextual insights...', color: 'text-violet-500' },
    { icon: Brain, text: 'Formulating comprehensive response...', color: 'text-amber-500' },
  ];
};

export default function ChatBot({ position = 'bottom-right' }: ChatBotProps) {
  const navigate = useNavigate();
  const { messages, isLoading, sendMessage } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showSources, setShowSources] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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

  const handleExpand = () => {
    setIsOpen(false);
    navigate('/assistant');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const positionClasses = position === 'bottom-right' ? 'right-6' : 'left-6';

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-24 ${positionClasses} z-50 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}
          >
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Forecasting Assistant</h3>
                  <p className="text-amber-100 text-xs">Powered by Ready Signal</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExpand}
                  className="text-white/80 hover:text-white transition-colors p-1"
                  title="Expand to full screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="h-[350px] overflow-y-auto p-4 bg-gray-50">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-amber-600" />
                  </div>
                  <h4 className="text-gray-800 font-medium mb-2">How can I help you today?</h4>
                  <p className="text-gray-500 text-sm mb-4">
                    Ask me anything about forecasting, demand planning, or predictive analytics.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['What signals improve forecasts?', 'How does ARIMA work?', 'Best practices for demand planning'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setInputValue(suggestion);
                          inputRef.current?.focus();
                        }}
                        className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-amber-400 hover:text-amber-600 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className="mb-4">
                  <div
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-amber-500 text-white rounded-br-md'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>

                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 ml-1">
                      <button
                        onClick={() => setShowSources(showSources === message.id ? null : message.id)}
                        className="text-xs text-gray-500 hover:text-amber-600 flex items-center gap-1 transition-colors"
                      >
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${showSources === message.id ? 'rotate-180' : ''}`}
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
                            <div className="mt-2 space-y-2">
                              {message.sources.map((source, idx) => (
                                <div
                                  key={idx}
                                  className="bg-white border border-gray-100 rounded-lg p-2 text-xs"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-gray-700 truncate">
                                      {source.documentName}
                                    </span>
                                    <span className="text-amber-600 text-[10px] bg-amber-50 px-1.5 py-0.5 rounded">
                                      {Math.round(source.relevanceScore * 100)}% match
                                    </span>
                                  </div>
                                  <p className="text-gray-500 line-clamp-2">{source.content}</p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {message.role === 'assistant' && message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                    <div className="mt-3 ml-1">
                      <p className="text-xs text-gray-500 mb-2 font-medium">You might also ask:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestedQuestions.map((question, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setInputValue(question);
                              inputRef.current?.focus();
                            }}
                            className="text-xs bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 text-gray-700 px-3 py-1.5 rounded-full hover:from-amber-100 hover:to-amber-200 hover:border-amber-300 transition-all"
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
                  <div className="mb-4">
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm max-w-[85%]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={loadingStep}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.4 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`${currentStep.color}`}>
                            {(() => {
                              const Icon = currentStep.icon;
                              return <Icon className="w-4 h-4 animate-pulse" />;
                            })()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <p className="text-xs text-gray-600 font-medium">
                                {currentStep.text.replace('...', '')}
                              </p>
                              {isLastStep && (
                                <div className="flex gap-0.5 ml-1">
                                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }} />
                                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1s' }} />
                                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1s' }} />
                                </div>
                              )}
                            </div>
                            <div className="mt-1.5 h-1 bg-gray-100 rounded-full overflow-hidden">
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
                                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
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

            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about forecasting..."
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="w-10 h-10 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                Answers are generated from our forecasting knowledge base
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 ${positionClasses} z-50 group`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <div className={`w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 transition-all ${isOpen ? 'rotate-0' : ''}`}>
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            >
              <span className="font-medium">Need forecasting help?</span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
            </motion.div>
          )}

          {!isOpen && messages.length === 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
            >
              <span className="text-[10px] text-white font-bold">?</span>
            </motion.div>
          )}
        </div>
      </motion.button>
    </>
  );
}
