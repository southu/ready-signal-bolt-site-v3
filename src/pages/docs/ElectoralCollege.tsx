import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Database, Vote, Download } from 'lucide-react';

const electoralData = [
  { state: 'California', votes: 54 }, { state: 'Texas', votes: 40 }, { state: 'Florida', votes: 30 },
  { state: 'New York', votes: 28 }, { state: 'Pennsylvania', votes: 19 }, { state: 'Illinois', votes: 19 },
  { state: 'Ohio', votes: 17 }, { state: 'Georgia', votes: 16 }, { state: 'North Carolina', votes: 16 },
  { state: 'Michigan', votes: 15 }, { state: 'New Jersey', votes: 14 }, { state: 'Virginia', votes: 13 },
  { state: 'Washington', votes: 12 }, { state: 'Arizona', votes: 11 }, { state: 'Massachusetts', votes: 11 },
  { state: 'Tennessee', votes: 11 }, { state: 'Indiana', votes: 11 }, { state: 'Maryland', votes: 10 },
  { state: 'Minnesota', votes: 10 }, { state: 'Missouri', votes: 10 }, { state: 'Wisconsin', votes: 10 },
  { state: 'Colorado', votes: 10 }, { state: 'Alabama', votes: 9 }, { state: 'South Carolina', votes: 9 },
];

export default function ElectoralCollege() {
  return (
    <>
      <SEO
        title="Electoral College Data Table | Ready Signal"
        description="Reference table of Electoral College votes by state for political and demographic analysis."
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
                <Vote className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Electoral College Data Table
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Electoral votes by state for US presidential elections
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Electoral College</h2>
            <p className="text-gray-700 mb-4">
              The Electoral College is the process by which the United States elects its president. Each state is allocated a number of electors based on its Congressional representation.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">538</div>
                <div className="text-gray-600">Total Electors</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-600">270</div>
                <div className="text-gray-600">To Win</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-amber-600">50+DC</div>
                <div className="text-gray-600">Voting Entities</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Electoral Votes by State (Top 24)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">State</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Electoral Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {electoralData.map((item, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 text-gray-700">{item.state}</td>
                      <td className="py-2 px-4 text-right font-semibold text-teal-600">{item.votes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
            <p className="text-teal-800">
              <strong>Note:</strong> Electoral vote allocations are reapportioned after each decennial census. The data shown reflects current allocations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://f.hubspotusercontent30.net/hubfs/7540639/Electoral_College.csv"
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
