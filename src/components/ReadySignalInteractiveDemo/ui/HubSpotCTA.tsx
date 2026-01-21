import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Mail } from 'lucide-react';
import HubSpotForm from '../../contact/HubSpotForm';

interface HubSpotCTAProps {
  variant?: 'primary' | 'secondary';
  label?: string;
  className?: string;
}

export default function HubSpotCTA({
  variant = 'primary',
  label = 'Run this on my data',
  className = '',
}: HubSpotCTAProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`
          inline-flex items-center gap-2 font-semibold transition-all
          ${variant === 'primary'
            ? 'px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/25'
            : 'px-4 py-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg'
          }
          ${className}
        `}
      >
        {label}
        <ArrowRight className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Run this on your data
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Upload a sample or connect a source. We'll show you the lift in under a week.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Form Container */}
              <div className="p-6">
                <HubSpotForm />
                
                {/* Fallback */}
                <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                  <p className="text-sm text-slate-500">
                    Having trouble loading the form?
                  </p>
                  <a
                    href="mailto:info@readysignal.com?subject=Demo%20Request"
                    className="inline-flex items-center gap-2 mt-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Email us at info@readysignal.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Secondary CTA component for "See it in action" style links
export function SecondaryCTA({
  onClick,
  label = 'See it in action right now',
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors"
    >
      {label}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}
