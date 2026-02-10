import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import logo from '../assets/images/ready-signal-full-logo.png';

const Navbar = () => {
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const industriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const howItWorksTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIndustriesMouseEnter = () => {
    if (industriesTimeoutRef.current) {
      clearTimeout(industriesTimeoutRef.current);
    }
    setIsIndustriesOpen(true);
  };

  const handleIndustriesMouseLeave = () => {
    industriesTimeoutRef.current = setTimeout(() => {
      setIsIndustriesOpen(false);
    }, 800);
  };

  const handleHowItWorksMouseEnter = () => {
    if (howItWorksTimeoutRef.current) {
      clearTimeout(howItWorksTimeoutRef.current);
    }
    setIsHowItWorksOpen(true);
  };

  const handleHowItWorksMouseLeave = () => {
    howItWorksTimeoutRef.current = setTimeout(() => {
      setIsHowItWorksOpen(false);
    }, 800);
  };

  const industries = [
    { name: 'CPG & Retail', path: '/industries/cpg-retail/' },
    { name: 'Manufacturing', path: '/industries/manufacturing/' },
    { name: 'Private Equity', path: '/industries/private-equity/' },
    { name: 'Supply Chain', path: '/industries/supply-chain/' },
    { name: 'B2B Marketing', path: '/industries/b2b-marketing/' },
    { name: 'B2C Marketing', path: '/industries/b2c-marketing/' },
  ];

  const howItWorksItems = [
    { name: 'How It Works', path: '/how-it-works/' },
    { name: 'Data Sources', path: '/data-sources/' },
    { name: 'Integrations', path: '/integrations/' },
    { name: 'Pricing', path: '/plans/' },
    { name: 'Help Center', path: '/help-center/' },
    { name: 'API Documentation', path: '/ready-signal-api-documentation/' },
    { name: 'Resources', path: '/blog/' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Ready Signal" className="h-8" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/platform/" className="text-rs-dark hover:text-rs-cyan transition-colors font-medium">
              Platform
            </Link>
            <Link to="/solutions/" className="text-rs-dark hover:text-rs-cyan transition-colors font-medium">
              Solutions
            </Link>
            <Link to="/assistant/" className="text-rs-dark hover:text-rs-cyan transition-colors font-medium">
              Assistant
            </Link>

            <div
              className="relative"
              onMouseEnter={handleIndustriesMouseEnter}
              onMouseLeave={handleIndustriesMouseLeave}
            >
              <button className="flex items-center space-x-1 text-rs-dark hover:text-rs-cyan transition-colors font-medium">
                <span>Industries</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isIndustriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isIndustriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full -left-4 pt-3 w-64 px-4"
                  onMouseEnter={handleIndustriesMouseEnter}
                  onMouseLeave={handleIndustriesMouseLeave}
                >
                  <div className="bg-white rounded-lg shadow-lg py-2">
                    {industries.map((industry) => (
                      <Link
                        key={industry.name}
                        to={industry.path}
                        className="block px-4 py-2 text-rs-dark hover:bg-rs-light-gray hover:text-rs-cyan transition-colors"
                      >
                        {industry.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={handleHowItWorksMouseEnter}
              onMouseLeave={handleHowItWorksMouseLeave}
            >
              <button className="flex items-center space-x-1 text-rs-dark hover:text-rs-cyan transition-colors font-medium">
                <span>How It Works</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isHowItWorksOpen ? 'rotate-180' : ''}`} />
              </button>

              {isHowItWorksOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full -left-4 pt-3 w-64 px-4"
                  onMouseEnter={handleHowItWorksMouseEnter}
                  onMouseLeave={handleHowItWorksMouseLeave}
                >
                  <div className="bg-white rounded-lg shadow-lg py-2">
                    {howItWorksItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-2 text-rs-dark hover:bg-rs-light-gray hover:text-rs-cyan transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <Link to="/blog/" className="text-rs-dark hover:text-rs-cyan transition-colors font-medium">
              Insights
            </Link>
            <Link to="/about/" className="text-rs-dark hover:text-rs-cyan transition-colors font-medium">
              About Us
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="https://app.readysignal.com/" target="_blank" rel="noopener noreferrer" className="text-rs-dark hover:text-rs-cyan transition-colors font-medium px-4 py-2">
              Log In
            </a>
            <a href="https://app.readysignal.com/auth/sign-up" className="bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-colors font-semibold px-6 py-2 rounded-lg shadow-sm hover:shadow-md">
              Start Free Trial
            </a>
          </div>

          <button
            className="md:hidden text-rs-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-4 py-4 space-y-3">
            <Link to="/platform/" className="block text-rs-dark hover:text-rs-cyan transition-colors font-medium py-2">
              Platform
            </Link>
            <Link to="/solutions/" className="block text-rs-dark hover:text-rs-cyan transition-colors font-medium py-2">
              Solutions
            </Link>
            <Link to="/assistant/" className="block text-rs-dark hover:text-rs-cyan transition-colors font-medium py-2">
              Assistant
            </Link>
            <div className="space-y-2">
              <div className="text-rs-dark font-medium py-2">Industries</div>
              <div className="pl-4 space-y-2">
                {industries.map((industry) => (
                  <Link
                    key={industry.name}
                    to={industry.path}
                    className="block text-sm text-rs-dark hover:text-rs-cyan transition-colors py-1"
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-rs-dark font-medium py-2">How It Works</div>
              <div className="pl-4 space-y-2">
                {howItWorksItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block text-sm text-rs-dark hover:text-rs-cyan transition-colors py-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/blog/" className="block text-rs-dark hover:text-rs-cyan transition-colors font-medium py-2">
              Insights
            </Link>
            <Link to="/about/" className="block text-rs-dark hover:text-rs-cyan transition-colors font-medium py-2">
              About Us
            </Link>
            <div className="pt-4 space-y-3">
              <a href="https://app.readysignal.com/" target="_blank" rel="noopener noreferrer" className="block w-full text-rs-dark hover:text-rs-cyan transition-colors font-medium px-4 py-2 border border-gray-300 rounded-lg text-center">
                Log In
              </a>
              <a href="https://app.readysignal.com/auth/sign-up" className="block w-full bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-colors font-semibold px-6 py-2 rounded-lg shadow-sm text-center">
                Start Free Trial
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
