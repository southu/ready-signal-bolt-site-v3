import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import SearchResults from '../components/help/SearchResults';
import SearchAutocomplete from '../components/help/SearchAutocomplete';
import { searchArticles, getSearchSuggestions, trackClickedResult, SearchResult, SearchSuggestion } from '../services/searchService';
import {
  BookOpen, Code, Terminal, PlayCircle, Settings, Database,
  TrendingUp, Calendar, Download, Layers, ChevronRight, Search, BarChart3
} from 'lucide-react';

const CategoryCard = ({
  title,
  description,
  icon: Icon,
  links,
  color
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  links: { title: string; href: string }[];
  color: string;
}) => (
  <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start gap-4 mb-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
    </div>
    <ul className="space-y-2">
      {links.map((link, i) => (
        <li key={i}>
          <Link
            to={link.href}
            className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors group"
          >
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500" />
            <span>{link.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function HelpCenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const suggestionsTimeoutRef = useRef<NodeJS.Timeout>();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSuggestions([]);
      return;
    }

    if (searchQuery.length >= 2) {
      suggestionsTimeoutRef.current = setTimeout(async () => {
        const results = await getSearchSuggestions(searchQuery);
        setSuggestions(results);
        setShowSuggestions(true);
      }, 200);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setLoading(true);
      const results = await searchArticles(searchQuery);
      setSearchResults(results);
      setLoading(false);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      if (suggestionsTimeoutRef.current) clearTimeout(suggestionsTimeoutRef.current);
    };
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setShowSuggestions(false);
    setLoading(true);
    const results = await searchArticles(searchQuery);
    setSearchResults(results);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionSelect = (url: string, title: string) => {
    setSearchQuery(title);
    setShowSuggestions(false);
    trackClickedResult(searchQuery, url);
    navigate(url);
  };

  const handleResultClick = (url: string) => {
    trackClickedResult(searchQuery, url);
  };

  const categories = [
    {
      title: 'Forecasting Fundamentals',
      description: 'Conceptual guides to forecasting best practices',
      icon: BarChart3,
      color: 'bg-indigo-500',
      links: [
        { title: 'What Forecasting Is (and Is Not)', href: '/what-is-forecasting-definition-distinctions-misconceptions/' },
        { title: 'The Forecasting Process: From Question to Decision', href: '/end-to-end-forecasting-process-decision-driven/' },
        { title: 'Choosing the Right Target Variable for a Forecast', href: '/choosing-forecast-target-variables/' },
        { title: 'Data Requirements for Forecasting (and How to Relax Them)', href: '/forecasting-data-requirements-signal-noise-external-data/' },
        { title: 'Handling Missing, Noisy, and Incomplete Time Series', href: '/managing-missing-data-time-series-forecasting/' },
        { title: 'Model Classes for Forecasting and When to Use Them', href: '/forecasting-model-classes-model-selection-guide/' },
        { title: 'Evaluating Forecasts: Accuracy, Stability, and Usefulness', href: '/evaluate-forecast-quality-metrics-backtesting-decision-weighted/' },
        { title: 'Scenario Forecasting and Structured Uncertainty', href: '/scenario-forecasting-decision-making-under-uncertainty/' },
        { title: 'When Forecasts Fail: Detection and Response', href: '/forecast-failures-regime-shifts-detection-governance-learning/' },
        { title: 'Operationalizing Forecasts for Ongoing Decision Making', href: '/integrating-forecasts-into-business-processes-continuous-improvement/' },
      ]
    },
    {
      title: 'Data Science Treatments',
      description: 'Transform and optimize your data',
      icon: TrendingUp,
      color: 'bg-amber-500',
      links: [
        { title: 'Overview of Data Science Treatments', href: '/overview-of-data-science-treatments/' },
        { title: 'What is a Yeo-Johnson Power Transformation?', href: '/what-is-a-yeo-johnson-power-transformation/' },
        { title: 'What is Seasonal Adjustment?', href: '/what-is-seasonal-adjustment/' },
        { title: 'What is an Order-Norm Transformation?', href: '/what-is-an-order-norm-transformation/' },
        { title: 'What does Advertising Adstock Mean?', href: '/what-does-advertising-adstock-mean/' },
        { title: 'What is a Logarithmic Transformation?', href: '/what-is-a-logarithmic-transformation/' },
        { title: 'What is a Box-Cox Transformation?', href: '/what-is-a-box-cox-transformation/' },
      ]
    },
    {
      title: 'APIs and Integrations',
      description: 'Connect with your tools',
      icon: Code,
      color: 'bg-gray-700',
      links: [
        { title: 'Ready Signal API Documentation', href: '/ready-signal-api-documentation/' },
        { title: 'Python SDK Documentation', href: '/ready-signal-api-documentation-python-sdk/' },
        { title: 'R 3.6+ Documentation', href: '/ready-signal-api-documentation-r-3-6/' },
        { title: 'R 3.6+ Video Example', href: '/ready-signal-api-documentation-r-3-6-video-example/' },
        { title: 'How to Export Your Processed Data', href: '/how-to-export-your-processed-control-data-signal/' },
        { title: 'Domo Data Connector', href: '/domo-data-connector/' },
        { title: 'Ready Signal and Domo - Case Study', href: '/ready-signal-and-domo-case-study/' },
      ]
    },
    {
      title: 'Getting Started',
      description: 'New to Ready Signal? Start here',
      icon: PlayCircle,
      color: 'bg-green-500',
      links: [
        { title: 'Ready Signal - A Brief Introduction', href: '/ready-signal-a-brief-introduction/' },
        { title: 'How to Create a Signal - Video Version', href: '/how-to-create-a-signal-video-version/' },
        { title: 'How to Create a Signal', href: '/how-to-create-a-signal/' },
      ]
    },
    {
      title: 'Signals and Features',
      description: 'Managing your signals',
      icon: Layers,
      color: 'bg-blue-500',
      links: [
        { title: 'How to Reduce the Size of Your Signal', href: '/how-to-reduce-the-size-of-your-signal/' },
        { title: 'Overview of Feature Details Page', href: '/overview-of-feature-details-page/' },
      ]
    },
    {
      title: 'Geographic and Time Grains',
      description: 'Understanding data granularity',
      icon: Calendar,
      color: 'bg-cyan-500',
      links: [
        { title: 'Data Grains Explained', href: '/data-grains-explained/' },
      ]
    },
    {
      title: 'Free Data Tables',
      description: 'Reference data for your models',
      icon: Database,
      color: 'bg-teal-500',
      links: [
        { title: 'United States Zip Code Data Table', href: '/united-states-zip-code-data-table/' },
        { title: 'FIPS County Codes Data Table', href: '/federal-information-processing-standard-fips-county-codes-data-table/' },
        { title: 'S&P 500 Companies Data Table', href: '/sp-500-companies-data-table/' },
        { title: 'Electoral College Data Table', href: '/electoral-college-data-table/' },
        { title: 'State Abbreviation Data Table', href: '/state-abbreviation-data-table/' },
      ]
    },
  ];

  return (
    <>
      <SEO
        title="Help Center | Ready Signal"
        description="Find guides, tutorials, and documentation to help you get the most out of Ready Signal's external data platform."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to get started and make the most of Ready Signal
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-12" ref={searchContainerRef}>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <SearchAutocomplete
                  suggestions={suggestions}
                  onSelect={handleSuggestionSelect}
                  visible={showSuggestions}
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          <SearchResults
            results={searchResults}
            query={searchQuery}
            loading={loading}
            onResultClick={handleResultClick}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, i) => (
              <CategoryCard key={i} {...category} />
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h2>
                <p className="text-amber-50">Our support team is here to help you get the most out of Ready Signal.</p>
              </div>
              <Link
                to="/contact-us/"
                className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors flex-shrink-0"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
