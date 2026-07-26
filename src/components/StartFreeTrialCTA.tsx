import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const StartFreeTrialCTA = () => {
  return (
    <motion.a
      href="https://app.readysignal.com/auth/sign-up"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-all font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
    >
      <span>Start Free Trial</span>
      <ArrowRight className="w-5 h-5" />
    </motion.a>
  );
};

export default StartFreeTrialCTA;
