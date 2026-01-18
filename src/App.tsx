import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import RouteChangeTracker from './components/RouteChangeTracker';
import ChatBot from './components/chat/ChatBot';
import { ChatProvider } from './contexts/ChatContext';
import { initGA } from './lib/analytics';
import Home from './pages/Home';
import Platform from './pages/Platform';
import Solutions from './pages/Solutions';
import HowItWorks from './pages/HowItWorks';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Integrations from './pages/Integrations';
import Assistant from './pages/Assistant';
import DataCatalog from './pages/DataCatalog';
import ForecastingEngine from './pages/ForecastingEngine';
import RecommendationEngine from './pages/RecommendationEngine';
import BlogAndResources from './pages/BlogAndResources';
import AIBIConsulting from './pages/AIBIConsulting';
import APIDocs from './pages/APIDocs';
import APIDocsPython from './pages/APIDocsPython';
import APIDocsR from './pages/APIDocsR';
import HelpCenter from './pages/HelpCenter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import DataRobot from './pages/DataRobot';
import DataEconomic from './pages/DataEconomic';
import DataWeather from './pages/DataWeather';
import DataDemographic from './pages/DataDemographic';
import DataPublicHealth from './pages/DataPublicHealth';
import DataSources from './pages/DataSources';
import DataFeature from './pages/data/DataFeature';
import CPGRetail from './pages/industries/CPGRetail';
import Manufacturing from './pages/industries/Manufacturing';
import PrivateEquity from './pages/industries/PrivateEquity';
import SupplyChain from './pages/industries/SupplyChain';
import B2BMarketing from './pages/industries/B2BMarketing';
import B2CMarketing from './pages/industries/B2CMarketing';
import AdminBlog from './pages/AdminBlog';

// Documentation pages
import BriefIntroduction from './pages/docs/BriefIntroduction';
import HowToCreateSignal from './pages/docs/HowToCreateSignal';
import CreateSignalVideo from './pages/docs/CreateSignalVideo';
import DataScienceTreatments from './pages/docs/DataScienceTreatments';
import DataGrainsExplained from './pages/docs/DataGrainsExplained';
import ExportData from './pages/docs/ExportData';
import ReduceSignalSize from './pages/docs/ReduceSignalSize';
import FeatureDetails from './pages/docs/FeatureDetails';
import DomoConnector from './pages/docs/DomoConnector';
import DomoCaseStudy from './pages/docs/DomoCaseStudy';
import ZipCodeTable from './pages/docs/ZipCodeTable';
import StateAbbreviations from './pages/docs/StateAbbreviations';
import FIPSCodes from './pages/docs/FIPSCodes';
import ElectoralCollege from './pages/docs/ElectoralCollege';
import SP500Companies from './pages/docs/SP500Companies';
import BoxCoxTransformation from './pages/docs/BoxCoxTransformation';
import YeoJohnsonTransformation from './pages/docs/YeoJohnsonTransformation';
import LogarithmicTransformation from './pages/docs/LogarithmicTransformation';
import OrderNormTransformation from './pages/docs/OrderNormTransformation';
import SeasonalAdjustment from './pages/docs/SeasonalAdjustment';
import AdvertisingAdstock from './pages/docs/AdvertisingAdstock';
import RVideoExample from './pages/docs/RVideoExample';

// Blog system - data-driven articles
import BlogArticle from './pages/blog/BlogArticle';

function App() {
  // Initialize Google Analytics on app load
  useEffect(() => {
    initGA();
  }, []);

  return (
    <Router>
      <ChatProvider>
        <ScrollToTop />
        <RouteChangeTracker />
        <ChatBot />
        <Routes>
          {/* Core pages */}
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/platform/" element={<Platform />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/" element={<Solutions />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/how-it-works/" element={<HowItWorks />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about/" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/contact-us/" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/plans" element={<Pricing />} />
          <Route path="/plans/" element={<Pricing />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/integrations/" element={<Integrations />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/assistant/" element={<Assistant />} />
          <Route path="/data-catalog" element={<DataCatalog />} />
          <Route path="/data-catalog/" element={<DataCatalog />} />
          <Route path="/forecasting-engine" element={<ForecastingEngine />} />
          <Route path="/forecasting-engine/" element={<ForecastingEngine />} />
          <Route path="/recommendation-engine" element={<RecommendationEngine />} />
          <Route path="/recommendation-engine/" element={<RecommendationEngine />} />
          <Route path="/blog" element={<BlogAndResources />} />
          <Route path="/blog/" element={<BlogAndResources />} />
          <Route path="/blog-and-resources" element={<BlogAndResources />} />
          <Route path="/blog-and-resources/" element={<BlogAndResources />} />
          <Route path="/ai-bi-consulting" element={<AIBIConsulting />} />
          <Route path="/ai-bi-consulting/" element={<AIBIConsulting />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/help-center/" element={<HelpCenter />} />

          {/* Documentation / Help Articles */}
          <Route path="/ready-signal-a-brief-introduction" element={<BriefIntroduction />} />
          <Route path="/ready-signal-a-brief-introduction/" element={<BriefIntroduction />} />
          <Route path="/how-to-create-a-signal" element={<HowToCreateSignal />} />
          <Route path="/how-to-create-a-signal/" element={<HowToCreateSignal />} />
          <Route path="/how-to-create-a-signal-video-version" element={<CreateSignalVideo />} />
          <Route path="/how-to-create-a-signal-video-version/" element={<CreateSignalVideo />} />
          <Route path="/overview-of-data-science-treatments" element={<DataScienceTreatments />} />
          <Route path="/overview-of-data-science-treatments/" element={<DataScienceTreatments />} />
          <Route path="/data-grains-explained" element={<DataGrainsExplained />} />
          <Route path="/data-grains-explained/" element={<DataGrainsExplained />} />
          <Route path="/how-to-export-your-processed-control-data-signal" element={<ExportData />} />
          <Route path="/how-to-export-your-processed-control-data-signal/" element={<ExportData />} />
          <Route path="/how-to-reduce-the-size-of-your-signal" element={<ReduceSignalSize />} />
          <Route path="/how-to-reduce-the-size-of-your-signal/" element={<ReduceSignalSize />} />
          <Route path="/ready-signal-feature-details" element={<FeatureDetails />} />
          <Route path="/ready-signal-feature-details/" element={<FeatureDetails />} />
          <Route path="/domo-data-connector" element={<DomoConnector />} />
          <Route path="/domo-data-connector/" element={<DomoConnector />} />
          <Route path="/ready-signal-and-domo-case-study" element={<DomoCaseStudy />} />
          <Route path="/ready-signal-and-domo-case-study/" element={<DomoCaseStudy />} />
          <Route path="/united-states-zip-code-data-table" element={<ZipCodeTable />} />
          <Route path="/united-states-zip-code-data-table/" element={<ZipCodeTable />} />
          <Route path="/us-state-abbreviations-data-table" element={<StateAbbreviations />} />
          <Route path="/us-state-abbreviations-data-table/" element={<StateAbbreviations />} />
          <Route path="/united-states-fips-codes-data-table" element={<FIPSCodes />} />
          <Route path="/united-states-fips-codes-data-table/" element={<FIPSCodes />} />
          <Route path="/united-states-electoral-college-data-table" element={<ElectoralCollege />} />
          <Route path="/united-states-electoral-college-data-table/" element={<ElectoralCollege />} />
          <Route path="/sp-500-companies-data-table" element={<SP500Companies />} />
          <Route path="/sp-500-companies-data-table/" element={<SP500Companies />} />
          <Route path="/box-cox-transformation" element={<BoxCoxTransformation />} />
          <Route path="/box-cox-transformation/" element={<BoxCoxTransformation />} />
          <Route path="/yeo-johnson-transformation" element={<YeoJohnsonTransformation />} />
          <Route path="/yeo-johnson-transformation/" element={<YeoJohnsonTransformation />} />
          <Route path="/logarithmic-transformation" element={<LogarithmicTransformation />} />
          <Route path="/logarithmic-transformation/" element={<LogarithmicTransformation />} />
          <Route path="/order-norm-transformation" element={<OrderNormTransformation />} />
          <Route path="/order-norm-transformation/" element={<OrderNormTransformation />} />
          <Route path="/seasonal-adjustment" element={<SeasonalAdjustment />} />
          <Route path="/seasonal-adjustment/" element={<SeasonalAdjustment />} />
          <Route path="/advertising-adstock" element={<AdvertisingAdstock />} />
          <Route path="/advertising-adstock/" element={<AdvertisingAdstock />} />
          <Route path="/ready-signal-api-documentation-r-3-6" element={<RVideoExample />} />
          <Route path="/ready-signal-api-documentation-r-3-6/" element={<RVideoExample />} />
          <Route path="/ready-signal-api-documentation" element={<APIDocs />} />
          <Route path="/ready-signal-api-documentation/" element={<APIDocs />} />
          <Route path="/ready-signal-api-documentation-python-sdk" element={<APIDocsPython />} />
          <Route path="/ready-signal-api-documentation-python-sdk/" element={<APIDocsPython />} />

          {/* Legal pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfService />} />
          <Route path="/terms-of-use/" element={<TermsOfService />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/terms-of-service/" element={<TermsOfService />} />

          {/* DataRobot AI Accelerator */}
          <Route path="/datarobot" element={<DataRobot />} />
          <Route path="/datarobot/" element={<DataRobot />} />

          {/* Data category pages */}
          <Route path="/data-economic" element={<DataEconomic />} />
          <Route path="/data-economic/" element={<DataEconomic />} />
          <Route path="/data-weather" element={<DataWeather />} />
          <Route path="/data-weather/" element={<DataWeather />} />
          <Route path="/data-demographic" element={<DataDemographic />} />
          <Route path="/data-demographic/" element={<DataDemographic />} />
          <Route path="/public-health" element={<DataPublicHealth />} />
          <Route path="/public-health/" element={<DataPublicHealth />} />

          {/* Data Sources & Individual Feature Pages */}
          <Route path="/data-sources" element={<DataSources />} />
          <Route path="/data-sources/" element={<DataSources />} />
          <Route path="/data/:slug" element={<DataFeature />} />
          <Route path="/data/:slug/" element={<DataFeature />} />
          
          {/* Industry pages */}
          <Route path="/industries/cpg-retail" element={<CPGRetail />} />
          <Route path="/industries/cpg-retail/" element={<CPGRetail />} />
          <Route path="/industries/manufacturing" element={<Manufacturing />} />
          <Route path="/industries/manufacturing/" element={<Manufacturing />} />
          <Route path="/industries/private-equity" element={<PrivateEquity />} />
          <Route path="/industries/private-equity/" element={<PrivateEquity />} />
          <Route path="/industries/supply-chain" element={<SupplyChain />} />
          <Route path="/industries/supply-chain/" element={<SupplyChain />} />
          <Route path="/industries/b2b-marketing" element={<B2BMarketing />} />
          <Route path="/industries/b2b-marketing/" element={<B2BMarketing />} />
          <Route path="/industries/b2c-marketing" element={<B2CMarketing />} />
          <Route path="/industries/b2c-marketing/" element={<B2CMarketing />} />

          {/* Admin page for blog management */}
          <Route path="/admin-blog" element={<AdminBlog />} />
          <Route path="/admin-blog/" element={<AdminBlog />} />

          {/* Blog article routes - both /blog/:slug and root-level /:slug */}
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/blog/:slug/" element={<BlogArticle />} />

          {/*
            Catch-all route for blog articles at root level
            This must be LAST to not interfere with other routes
            Handles WordPress-style URLs: /article-slug/
          */}
          <Route path="/:slug" element={<BlogArticle />} />
          <Route path="/:slug/" element={<BlogArticle />} />
        </Routes>
      </ChatProvider>
    </Router>
  );
}

export default App;
