import { Linkedin, Twitter, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/ready-signal-full-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rs-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Ready Signal" className="h-8 brightness-0 invert" />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Stop Reacting. Start Predicting.
            </p>
            <div className="flex space-x-4">
              <a href="#linkedin" className="text-gray-300 hover:text-rs-cyan transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#twitter" className="text-gray-300 hover:text-rs-cyan transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#facebook" className="text-gray-300 hover:text-rs-cyan transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#email" className="text-gray-300 hover:text-rs-cyan transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/platform/" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  Platform
                </Link>
              </li>
              <li>
                <Link to="/solutions/" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/how-it-works/" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/integrations/" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/plans/" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about/" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/ready-signal/jobs/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  Careers
                </a>
              </li>
              <li>
                <Link to="/blog-and-resources/" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact-us/" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/overview-of-data-science-treatments/" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/help-center/" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/how-to-create-a-signal/" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link to="/ready-signal-api-documentation/" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © {currentYear} Ready Signal. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.readysignal.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="https://www.readysignal.com/terms-of-use/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#cookies" className="text-gray-300 hover:text-rs-cyan transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
