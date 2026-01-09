import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ChatBot from './components/chat/ChatBot';
import { ChatProvider } from './contexts/ChatContext';
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
import HowToCreateSignal from './pages/docs/HowToCreateSignal';
import DataScienceTreatments from './pages/docs/DataScienceTreatments';
import BoxCoxTransformation from './pages/docs/BoxCoxTransformation';
import LogarithmicTransformation from './pages/docs/LogarithmicTransformation';
import SeasonalAdjustment from './pages/docs/SeasonalAdjustment';
import AdvertisingAdstock from './pages/docs/AdvertisingAdstock';
import YeoJohnsonTransformation from './pages/docs/YeoJohnsonTransformation';
import OrderNormTransformation from './pages/docs/OrderNormTransformation';
import StateAbbreviations from './pages/docs/StateAbbreviations';
import ZipCodeTable from './pages/docs/ZipCodeTable';
import FIPSCodes from './pages/docs/FIPSCodes';
import SP500Companies from './pages/docs/SP500Companies';
import ElectoralCollege from './pages/docs/ElectoralCollege';
import BriefIntroduction from './pages/docs/BriefIntroduction';
import DataGrainsExplained from './pages/docs/DataGrainsExplained';
import ReduceSignalSize from './pages/docs/ReduceSignalSize';
import ExportData from './pages/docs/ExportData';
import DomoConnector from './pages/docs/DomoConnector';
import DomoCaseStudy from './pages/docs/DomoCaseStudy';
import CreateSignalVideo from './pages/docs/CreateSignalVideo';
import RVideoExample from './pages/docs/RVideoExample';
import FeatureDetails from './pages/docs/FeatureDetails';
import CPGRetail from './pages/industries/CPGRetail';
import Manufacturing from './pages/industries/Manufacturing';
import PrivateEquity from './pages/industries/PrivateEquity';
import SupplyChain from './pages/industries/SupplyChain';
import B2BMarketing from './pages/industries/B2BMarketing';
import B2CMarketing from './pages/industries/B2CMarketing';
import RetailStrategy from './pages/blog/RetailStrategy';
import FluImpactSales from './pages/blog/FluImpactSales';
import HighPrecisionForecasting from './pages/blog/HighPrecisionForecasting';
import TariffsIndicators from './pages/blog/TariffsIndicators';
import TariffImpacts from './pages/blog/TariffImpacts';
import InteractionVariables from './pages/blog/InteractionVariables';

function App() {
  return (
    <Router>
      <ChatProvider>
        <ScrollToTop />
        <ChatBot />
        <Routes>
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
        <Route path="/blog-and-resources" element={<BlogAndResources />} />
        <Route path="/blog-and-resources/" element={<BlogAndResources />} />
        <Route path="/ai-bi-consulting" element={<AIBIConsulting />} />
        <Route path="/ai-bi-consulting/" element={<AIBIConsulting />} />
        <Route path="/ready-signal-api-documentation" element={<APIDocs />} />
        <Route path="/ready-signal-api-documentation/" element={<APIDocs />} />
        <Route path="/ready-signal-api-documentation-python-3-6" element={<APIDocsPython />} />
        <Route path="/ready-signal-api-documentation-python-3-6/" element={<APIDocsPython />} />
        <Route path="/ready-signal-api-documentation-r-3-6" element={<APIDocsR />} />
        <Route path="/ready-signal-api-documentation-r-3-6/" element={<APIDocsR />} />
        <Route path="/ready-signal-api-documentation-python-sdk" element={<APIDocsPython />} />
        <Route path="/ready-signal-api-documentation-python-sdk/" element={<APIDocsPython />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/help-center/" element={<HelpCenter />} />
        <Route path="/how-to-create-a-signal" element={<HowToCreateSignal />} />
        <Route path="/how-to-create-a-signal/" element={<HowToCreateSignal />} />
        <Route path="/overview-of-data-science-treatments" element={<DataScienceTreatments />} />
        <Route path="/overview-of-data-science-treatments/" element={<DataScienceTreatments />} />
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
        <Route path="/blog/retail-strategy" element={<RetailStrategy />} />
        <Route path="/blog/retail-strategy/" element={<RetailStrategy />} />
        <Route path="/blog/flu-impact-sales" element={<FluImpactSales />} />
        <Route path="/blog/flu-impact-sales/" element={<FluImpactSales />} />
        <Route path="/blog/high-precision-forecasting" element={<HighPrecisionForecasting />} />
        <Route path="/blog/high-precision-forecasting/" element={<HighPrecisionForecasting />} />
        <Route path="/blog/tariffs-indicators" element={<TariffsIndicators />} />
        <Route path="/blog/tariffs-indicators/" element={<TariffsIndicators />} />
        <Route path="/blog/tariff-impacts" element={<TariffImpacts />} />
        <Route path="/blog/tariff-impacts/" element={<TariffImpacts />} />
        <Route path="/blog/interaction-variables" element={<InteractionVariables />} />
        <Route path="/blog/interaction-variables/" element={<InteractionVariables />} />
        <Route path="/what-is-a-box-cox-transformation" element={<BoxCoxTransformation />} />
        <Route path="/what-is-a-box-cox-transformation/" element={<BoxCoxTransformation />} />
        <Route path="/what-is-a-logarithmic-transformation" element={<LogarithmicTransformation />} />
        <Route path="/what-is-a-logarithmic-transformation/" element={<LogarithmicTransformation />} />
        <Route path="/what-is-seasonal-adjustment" element={<SeasonalAdjustment />} />
        <Route path="/what-is-seasonal-adjustment/" element={<SeasonalAdjustment />} />
        <Route path="/what-does-advertising-adstock-mean" element={<AdvertisingAdstock />} />
        <Route path="/what-does-advertising-adstock-mean/" element={<AdvertisingAdstock />} />
        <Route path="/what-is-a-yeo-johnson-power-transformation" element={<YeoJohnsonTransformation />} />
        <Route path="/what-is-a-yeo-johnson-power-transformation/" element={<YeoJohnsonTransformation />} />
        <Route path="/what-is-an-order-norm-transformation" element={<OrderNormTransformation />} />
        <Route path="/what-is-an-order-norm-transformation/" element={<OrderNormTransformation />} />
        <Route path="/state-abbreviation-data-table" element={<StateAbbreviations />} />
        <Route path="/state-abbreviation-data-table/" element={<StateAbbreviations />} />
        <Route path="/united-states-zip-code-data-table" element={<ZipCodeTable />} />
        <Route path="/united-states-zip-code-data-table/" element={<ZipCodeTable />} />
        <Route path="/federal-information-processing-standard-fips-county-codes-data-table" element={<FIPSCodes />} />
        <Route path="/federal-information-processing-standard-fips-county-codes-data-table/" element={<FIPSCodes />} />
        <Route path="/s-p-500-companies-data-table" element={<SP500Companies />} />
        <Route path="/s-p-500-companies-data-table/" element={<SP500Companies />} />
        <Route path="/sp-500-companies-data-table" element={<SP500Companies />} />
        <Route path="/sp-500-companies-data-table/" element={<SP500Companies />} />
        <Route path="/electoral-college-data-table" element={<ElectoralCollege />} />
        <Route path="/electoral-college-data-table/" element={<ElectoralCollege />} />
        <Route path="/ready-signal-a-brief-introduction" element={<BriefIntroduction />} />
        <Route path="/ready-signal-a-brief-introduction/" element={<BriefIntroduction />} />
        <Route path="/data-grains-explained" element={<DataGrainsExplained />} />
        <Route path="/data-grains-explained/" element={<DataGrainsExplained />} />
        <Route path="/how-to-reduce-the-size-of-your-signal" element={<ReduceSignalSize />} />
        <Route path="/how-to-reduce-the-size-of-your-signal/" element={<ReduceSignalSize />} />
        <Route path="/how-to-export-your-processed-control-data-signal" element={<ExportData />} />
        <Route path="/how-to-export-your-processed-control-data-signal/" element={<ExportData />} />
        <Route path="/domo-data-connector" element={<DomoConnector />} />
        <Route path="/domo-data-connector/" element={<DomoConnector />} />
        <Route path="/ready-signal-and-domo-case-study" element={<DomoCaseStudy />} />
        <Route path="/ready-signal-and-domo-case-study/" element={<DomoCaseStudy />} />
        <Route path="/how-to-create-a-signal-video-version" element={<CreateSignalVideo />} />
        <Route path="/how-to-create-a-signal-video-version/" element={<CreateSignalVideo />} />
        <Route path="/ready-signal-api-documentation-r-3-6-video-example" element={<RVideoExample />} />
        <Route path="/ready-signal-api-documentation-r-3-6-video-example/" element={<RVideoExample />} />
        <Route path="/overview-of-feature-details-page" element={<FeatureDetails />} />
        <Route path="/overview-of-feature-details-page/" element={<FeatureDetails />} />
      </Routes>
      </ChatProvider>
    </Router>
  );
}

export default App;
