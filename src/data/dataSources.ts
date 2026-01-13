// Data Sources - Government and institutional data providers
// Each source provides multiple features/data signals

export interface DataSource {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: 'economic' | 'weather' | 'demographic' | 'public-health';
  featureCount: number;
  dataTypes: string[];
  website?: string;
}

export const dataSources: DataSource[] = [
  {
    id: 'bls',
    name: 'U.S. Bureau of Labor Statistics',
    shortName: 'BLS',
    description: 'Employment data, wages, labor market statistics, and producer price indices',
    category: 'economic',
    featureCount: 1500,
    dataTypes: ['Employment', 'Wages', 'Producer Prices', 'Unemployment', 'Labor Force'],
    website: 'https://www.bls.gov',
  },
  {
    id: 'bea',
    name: 'U.S. Bureau of Economic Analysis',
    shortName: 'BEA',
    description: 'GDP, personal income, consumer spending, and economic accounts',
    category: 'economic',
    featureCount: 50,
    dataTypes: ['GDP', 'Personal Income', 'Consumer Spending', 'Corporate Profits'],
    website: 'https://www.bea.gov',
  },
  {
    id: 'census',
    name: 'U.S. Census Bureau',
    shortName: 'Census',
    description: 'Population data, housing statistics, retail sales, and demographic data',
    category: 'demographic',
    featureCount: 40,
    dataTypes: ['Population', 'Housing', 'Retail Sales', 'Household Income'],
    website: 'https://www.census.gov',
  },
  {
    id: 'fed',
    name: 'Board of Governors of the Federal Reserve System',
    shortName: 'Federal Reserve',
    description: 'Monetary policy, interest rates, money supply, and financial indicators',
    category: 'economic',
    featureCount: 25,
    dataTypes: ['Money Supply', 'Interest Rates', 'Exchange Rates', 'Bank Loans'],
    website: 'https://www.federalreserve.gov',
  },
  {
    id: 'philly-fed',
    name: 'Federal Reserve Bank of Philadelphia',
    shortName: 'Philadelphia Fed',
    description: 'Leading economic indicators by state and regional economic data',
    category: 'economic',
    featureCount: 5,
    dataTypes: ['Leading Index', 'Regional Economy', 'State Indicators'],
    website: 'https://www.philadelphiafed.org',
  },
  {
    id: 'eta',
    name: 'U.S. Employment and Training Administration',
    shortName: 'ETA',
    description: 'Unemployment claims, initial claims, and employment training data',
    category: 'economic',
    featureCount: 10,
    dataTypes: ['Unemployment Claims', 'Initial Claims', 'Continuing Claims'],
    website: 'https://www.dol.gov/agencies/eta',
  },
  {
    id: 'eia',
    name: 'U.S. Energy Information Administration',
    shortName: 'EIA',
    description: 'Energy prices, crude oil, natural gas, and energy production data',
    category: 'economic',
    featureCount: 15,
    dataTypes: ['Oil Prices', 'Natural Gas', 'Energy Production', 'Fuel Prices'],
    website: 'https://www.eia.gov',
  },
  {
    id: 'fhfa',
    name: 'U.S. Federal Housing Finance Agency',
    shortName: 'FHFA',
    description: 'House price indices, housing affordability, and mortgage data',
    category: 'economic',
    featureCount: 20,
    dataTypes: ['House Prices', 'Housing Index', 'Case-Shiller', 'Affordability'],
    website: 'https://www.fhfa.gov',
  },
  {
    id: 'treasury',
    name: 'U.S. Department of the Treasury',
    shortName: 'Treasury',
    description: 'Treasury yields, government bonds, and fiscal data',
    category: 'economic',
    featureCount: 15,
    dataTypes: ['Treasury Yields', 'Bond Rates', 'Fiscal Data'],
    website: 'https://www.treasury.gov',
  },
  {
    id: 'noaa',
    name: 'National Oceanic and Atmospheric Administration',
    shortName: 'NOAA',
    description: 'Weather data, temperature, precipitation, and climate indicators',
    category: 'weather',
    featureCount: 50,
    dataTypes: ['Temperature', 'Precipitation', 'Degree Days', 'Climate'],
    website: 'https://www.noaa.gov',
  },
  {
    id: 'cdc',
    name: 'Centers for Disease Control and Prevention',
    shortName: 'CDC',
    description: 'Public health data, flu tracking, and disease surveillance',
    category: 'public-health',
    featureCount: 20,
    dataTypes: ['Flu Activity', 'Disease Surveillance', 'Health Statistics'],
    website: 'https://www.cdc.gov',
  },
  {
    id: 'hud',
    name: 'U.S. Department of Housing and Urban Development',
    shortName: 'HUD',
    description: 'Housing starts, building permits, and urban development data',
    category: 'economic',
    featureCount: 15,
    dataTypes: ['Housing Starts', 'Building Permits', 'Home Sales'],
    website: 'https://www.hud.gov',
  },
];

export const getSourceById = (id: string): DataSource | undefined => {
  return dataSources.find(source => source.id === id);
};

export const getSourcesByCategory = (category: DataSource['category']): DataSource[] => {
  return dataSources.filter(source => source.category === category);
};

export const getAllCategories = (): DataSource['category'][] => {
  return ['economic', 'weather', 'demographic', 'public-health'];
};

