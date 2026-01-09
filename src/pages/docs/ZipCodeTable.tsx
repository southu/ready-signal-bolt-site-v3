import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Database, MapPin, Download } from 'lucide-react';

export default function ZipCodeTable() {
  return (
    <>
      <SEO
        title="United States Zip Code Data Table | Ready Signal"
        description="Reference information about US ZIP codes and how they're used in Ready Signal for geographic data analysis."
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
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                United States Zip Code Data Table
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Reference information for US ZIP code geographic data
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About ZIP Codes</h2>
            <p className="text-gray-700 mb-4">
              ZIP codes are a system of postal codes used by the United States Postal Service (USPS). The term ZIP is an acronym for <strong>Zone Improvement Plan</strong>.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">ZIP Code Structure</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>5-digit standard format</li>
                  <li>ZIP+4 extends to 9 digits</li>
                  <li>First digit: National area (0-9)</li>
                  <li>Second & third: Sectional center</li>
                  <li>Fourth & fifth: Delivery area</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Coverage Statistics</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>~41,000+ active ZIP codes</li>
                  <li>All 50 states covered</li>
                  <li>US territories included</li>
                  <li>Military and special codes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Using ZIP Codes in Ready Signal</h2>
            <p className="text-gray-700 mb-4">
              Ready Signal supports ZIP code as a geographic grain for your signals. When you select ZIP code granularity:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Data is aggregated at the ZIP code level</li>
              <li>Each row represents a unique ZIP code and time period combination</li>
              <li>Higher granularity = more rows in your output</li>
              <li>Some features may not be available at ZIP level</li>
            </ul>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-800">
                <strong>Note:</strong> ZIP code grain creates the largest signal outputs. Consider using City or State grain if you don't need ZIP-level precision to reduce processing time and output size.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sample ZIP Code Ranges by Region</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">First Digit</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Region</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="py-2 px-4 font-mono">0</td><td className="py-2 px-4 text-gray-700">Northeast (CT, MA, ME, NH, NJ, NY, PR, RI, VT, VI)</td></tr>
                  <tr className="bg-gray-50"><td className="py-2 px-4 font-mono">1</td><td className="py-2 px-4 text-gray-700">Northeast (DE, NY, PA)</td></tr>
                  <tr><td className="py-2 px-4 font-mono">2</td><td className="py-2 px-4 text-gray-700">Mid-Atlantic (DC, MD, NC, SC, VA, WV)</td></tr>
                  <tr className="bg-gray-50"><td className="py-2 px-4 font-mono">3</td><td className="py-2 px-4 text-gray-700">Southeast (AL, FL, GA, MS, TN)</td></tr>
                  <tr><td className="py-2 px-4 font-mono">4</td><td className="py-2 px-4 text-gray-700">Great Lakes (IN, KY, MI, OH)</td></tr>
                  <tr className="bg-gray-50"><td className="py-2 px-4 font-mono">5</td><td className="py-2 px-4 text-gray-700">North Central (IA, MN, MT, ND, SD, WI)</td></tr>
                  <tr><td className="py-2 px-4 font-mono">6</td><td className="py-2 px-4 text-gray-700">Central (IL, KS, MO, NE)</td></tr>
                  <tr className="bg-gray-50"><td className="py-2 px-4 font-mono">7</td><td className="py-2 px-4 text-gray-700">South Central (AR, LA, OK, TX)</td></tr>
                  <tr><td className="py-2 px-4 font-mono">8</td><td className="py-2 px-4 text-gray-700">Mountain (AZ, CO, ID, NM, NV, UT, WY)</td></tr>
                  <tr className="bg-gray-50"><td className="py-2 px-4 font-mono">9</td><td className="py-2 px-4 text-gray-700">Pacific (AK, AS, CA, GU, HI, OR, WA)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://share.hsforms.com/2qjXFQXRIQC2JpvlVzAu_xw2bh6r"
              target="_blank"
              rel="noopener noreferrer"
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
