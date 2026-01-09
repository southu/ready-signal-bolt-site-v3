import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Database, Map, Download } from 'lucide-react';

export default function FIPSCodes() {
  return (
    <>
      <SEO
        title="FIPS County Codes Data Table | Ready Signal"
        description="Reference for Federal Information Processing Standard (FIPS) county codes used in Ready Signal."
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
                <Map className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                FIPS County Codes Data Table
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Federal Information Processing Standard codes for US counties
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About FIPS Codes</h2>
            <p className="text-gray-700 mb-4">
              FIPS (Federal Information Processing Standard) codes are numeric codes assigned by the National Institute of Standards and Technology (NIST) to identify various geographic entities.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">FIPS Code Structure</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>State FIPS:</strong> 2-digit code (01-56)</li>
                <li><strong>County FIPS:</strong> 3-digit code (001-999)</li>
                <li><strong>Combined:</strong> 5-digit state+county code</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Example: Los Angeles County, CA = <code className="bg-gray-200 px-2 py-1 rounded">06037</code> (06 = California, 037 = Los Angeles)
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sample State FIPS Codes</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { code: '01', name: 'Alabama' }, { code: '06', name: 'California' }, { code: '12', name: 'Florida' },
                { code: '17', name: 'Illinois' }, { code: '36', name: 'New York' }, { code: '48', name: 'Texas' },
              ].map((state, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <span className="font-mono text-lg font-bold text-teal-600">{state.code}</span>
                  <span className="text-gray-700 ml-2">{state.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Using FIPS Codes in Ready Signal</h2>
            <p className="text-gray-700 mb-4">
              Ready Signal uses FIPS codes to uniquely identify counties when you select County as your geographic grain:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Over 3,000 counties and county-equivalents</li>
              <li>Consistent with Census Bureau definitions</li>
              <li>Enables precise county-level analysis</li>
              <li>Can be joined with other FIPS-coded datasets</li>
            </ul>
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
            <p className="text-teal-800">
              <strong>Reference:</strong> Complete FIPS code lists are maintained by the Census Bureau and are periodically updated to reflect changes in county boundaries and definitions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://f.hubspotusercontent30.net/hubfs/7540639/FIPS%20Codes.csv"
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
