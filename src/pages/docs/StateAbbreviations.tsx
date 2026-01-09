import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Database, Download } from 'lucide-react';

const states = [
  { name: 'Alabama', abbr: 'AL' }, { name: 'Alaska', abbr: 'AK' }, { name: 'Arizona', abbr: 'AZ' },
  { name: 'Arkansas', abbr: 'AR' }, { name: 'California', abbr: 'CA' }, { name: 'Colorado', abbr: 'CO' },
  { name: 'Connecticut', abbr: 'CT' }, { name: 'Delaware', abbr: 'DE' }, { name: 'Florida', abbr: 'FL' },
  { name: 'Georgia', abbr: 'GA' }, { name: 'Hawaii', abbr: 'HI' }, { name: 'Idaho', abbr: 'ID' },
  { name: 'Illinois', abbr: 'IL' }, { name: 'Indiana', abbr: 'IN' }, { name: 'Iowa', abbr: 'IA' },
  { name: 'Kansas', abbr: 'KS' }, { name: 'Kentucky', abbr: 'KY' }, { name: 'Louisiana', abbr: 'LA' },
  { name: 'Maine', abbr: 'ME' }, { name: 'Maryland', abbr: 'MD' }, { name: 'Massachusetts', abbr: 'MA' },
  { name: 'Michigan', abbr: 'MI' }, { name: 'Minnesota', abbr: 'MN' }, { name: 'Mississippi', abbr: 'MS' },
  { name: 'Missouri', abbr: 'MO' }, { name: 'Montana', abbr: 'MT' }, { name: 'Nebraska', abbr: 'NE' },
  { name: 'Nevada', abbr: 'NV' }, { name: 'New Hampshire', abbr: 'NH' }, { name: 'New Jersey', abbr: 'NJ' },
  { name: 'New Mexico', abbr: 'NM' }, { name: 'New York', abbr: 'NY' }, { name: 'North Carolina', abbr: 'NC' },
  { name: 'North Dakota', abbr: 'ND' }, { name: 'Ohio', abbr: 'OH' }, { name: 'Oklahoma', abbr: 'OK' },
  { name: 'Oregon', abbr: 'OR' }, { name: 'Pennsylvania', abbr: 'PA' }, { name: 'Rhode Island', abbr: 'RI' },
  { name: 'South Carolina', abbr: 'SC' }, { name: 'South Dakota', abbr: 'SD' }, { name: 'Tennessee', abbr: 'TN' },
  { name: 'Texas', abbr: 'TX' }, { name: 'Utah', abbr: 'UT' }, { name: 'Vermont', abbr: 'VT' },
  { name: 'Virginia', abbr: 'VA' }, { name: 'Washington', abbr: 'WA' }, { name: 'West Virginia', abbr: 'WV' },
  { name: 'Wisconsin', abbr: 'WI' }, { name: 'Wyoming', abbr: 'WY' }, { name: 'District of Columbia', abbr: 'DC' },
];

export default function StateAbbreviations() {
  return (
    <>
      <SEO
        title="State Abbreviation Data Table | Ready Signal"
        description="Complete reference table of US state abbreviations for data integration and modeling."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/help-center/"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                State Abbreviation Data Table
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Complete reference of US state and territory abbreviations
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">All 50 States + DC</h2>
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                51 Records
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">State Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Abbreviation</th>
                  </tr>
                </thead>
                <tbody>
                  {states.map((state, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 text-gray-700">{state.name}</td>
                      <td className="py-2 px-4 font-mono text-gray-900 font-medium">{state.abbr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
            <p className="text-teal-800">
              <strong>Usage:</strong> These abbreviations are commonly used in Ready Signal for state-level geographic grain data. They follow the USPS standard two-letter codes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://f.hubspotusercontent30.net/hubfs/7540639/state_abbreviations.csv"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download the Data
            </a>
            <Link
              to="/help-center/"
              className="inline-flex items-center justify-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-all"
            >
              <Database className="w-5 h-5" />
              More Data Tables
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
