import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Code, ArrowLeft, BookOpen, Lightbulb } from 'lucide-react';

const CodeBlock = ({ children, language = 'python' }: { children: string; language?: string }) => (
  <div className="bg-gray-900 rounded-lg overflow-x-auto my-4">
    <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
      <span className="text-xs text-gray-400 uppercase">{language}</span>
    </div>
    <pre className="p-4 text-sm text-green-400 font-mono whitespace-pre-wrap">{children}</pre>
  </div>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 bg-gray-50">{children}</th>
);

const TableCell = ({ children, mono = false }: { children: React.ReactNode; mono?: boolean }) => (
  <td className={`px-4 py-3 text-sm ${mono ? 'font-mono text-gray-900' : 'text-gray-600'}`}>{children}</td>
);

export default function APIDocsPython() {
  return (
    <>
      <SEO
        title="Python SDK Documentation | Ready Signal API"
        description="Learn how to integrate Ready Signal with Python 3.6+ using the official SDK to automate your forecasting workflows."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/ready-signal-api-documentation/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to API Documentation
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Python SDK Documentation
                </h1>
                <p className="text-xl text-gray-600 mt-2">Python 3.6+ integration guide</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">1. Get an Access Token</h2>
            <p className="text-gray-700 mb-4">
              To use the Ready Signal API, you'll need an <strong>access token</strong> to authenticate your requests:
            </p>
            <div className="space-y-3 mb-6">
              {[
                'Log in to your Ready Signal Account',
                'Open an existing Signal or create a new one',
                'Select Output for the Signal',
                'In the API Credentials section, click the copy icon next to your access token'
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600">You will use that token to authenticate your next requests.</p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">2. Install and Import</h2>
            <p className="text-gray-700 mb-2">Install the Ready Signal SDK:</p>
            <CodeBlock language="bash">pip install --upgrade readysignal</CodeBlock>

            <p className="text-gray-700 mt-6 mb-2">Import the required packages:</p>
            <CodeBlock>{`import os
import readysignal as rs
import pandas as pd`}</CodeBlock>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Tip: Store your token securely</p>
                  <p className="text-amber-700 text-sm mt-1">Store your token as an environment variable rather than hard-coding it:</p>
                </div>
              </div>
            </div>
            <CodeBlock>{`ACCESS_TOKEN = os.getenv("READYSIGNAL_TOKEN")  # set this in your shell or .env`}</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">3. GET My Signals</h2>
            <p className="text-gray-700 mb-4">
              Retrieve a list of all signals associated with your Ready Signal account. Each record includes summary information such as configuration, time range, status and output links.
            </p>
            <CodeBlock>{`signals = rs.list_signals(ACCESS_TOKEN)
signals  # dict with your signals (id, name, status, links, etc.)`}</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Example Response</h4>
            <CodeBlock language="json">{`{
  "data": [
    {
      "id": 123,
      "name": "My Signal Name",
      "description": "The description of my signal.",
      "desired_geo_grain": "State",
      "desired_time_grain": "Week",
      "start_at": "01/26/2020",
      "end_at": "05/31/2020",
      "created_at": "06/03/2020",
      "updated_at": "06/03/2020",
      "status": "Ready",
      "output": {
        "json": "https://app.readysignal.com/api/signals/123/output?format=json"
      },
      "links": {
        "self": "https://app.readysignal.com/signal/123/manage",
        "manage": "https://app.readysignal.com/signal/123/manage"
      }
    }
  ]
}`}</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">4. GET Signal Metadata</h2>
            <p className="text-gray-700 mb-4">
              Retrieve detailed information about a specific signal ID, including configuration and metadata. This is typically used to <strong>inspect a signal's setup and metadata</strong> before fetching its output.
            </p>
            <CodeBlock>{`signal_id = 1234
signal_meta = rs.get_signal_details(ACCESS_TOKEN, signal_id, optimized=1)
signal_meta  # dict with config, features (incl. lead/lag), links, status`}</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Parameters</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <TableHeader>Parameter</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Required</TableHeader>
                    <TableHeader>Description</TableHeader>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><TableCell mono>ACCESS_TOKEN</TableCell><TableCell>string</TableCell><TableCell>Yes</TableCell><TableCell>Your Ready Signal Bearer Token</TableCell></tr>
                  <tr><TableCell mono>signal_id</TableCell><TableCell>integer</TableCell><TableCell>Yes</TableCell><TableCell>Your Ready Signal Signal ID</TableCell></tr>
                  <tr><TableCell mono>optimized</TableCell><TableCell>Boolean</TableCell><TableCell>Optional</TableCell><TableCell>When set to 1, returns optimized signal metadata</TableCell></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">5. GET My Signal Output</h2>
            <p className="text-gray-700 mb-4">
              Retrieve the processed output data for a specific signal ID. You can filter by startDate, endDate, limit to the target variable range, and request optimized output.
            </p>

            <h4 className="font-semibold text-gray-900 mb-2">Default Usage</h4>
            <CodeBlock>{`# Returns pandas dataframe
df = rs.get_signal_pandas(ACCESS_TOKEN, signal_id)

# Returns JSON
data = rs.get_signal(ACCESS_TOKEN, signal_id)`}</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">With Optional Parameters</h4>
            <CodeBlock>{`df = rs.get_signal_pandas(
    ACCESS_TOKEN,
    signal_id,
    optimized=1,
    startDate="2020-01-01",
    endDate="2020-06-30",
    useTargetVariableDates=1
)`}</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Parameters</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <TableHeader>Parameter</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Required</TableHeader>
                    <TableHeader>Description</TableHeader>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><TableCell mono>ACCESS_TOKEN</TableCell><TableCell>string</TableCell><TableCell>Yes</TableCell><TableCell>Your Ready Signal Bearer Token</TableCell></tr>
                  <tr><TableCell mono>signal_id</TableCell><TableCell>integer</TableCell><TableCell>Yes</TableCell><TableCell>Your Ready Signal Signal ID</TableCell></tr>
                  <tr><TableCell mono>optimized</TableCell><TableCell>Boolean</TableCell><TableCell>Optional</TableCell><TableCell>When set to 1, returns optimized signal output</TableCell></tr>
                  <tr><TableCell mono>startDate</TableCell><TableCell>String</TableCell><TableCell>Optional</TableCell><TableCell>Filter data starting on or after this date (YYYY-MM-DD)</TableCell></tr>
                  <tr><TableCell mono>endDate</TableCell><TableCell>String</TableCell><TableCell>Optional</TableCell><TableCell>Filter data ending on or before this date (YYYY-MM-DD)</TableCell></tr>
                  <tr><TableCell mono>useTargetVariableDates</TableCell><TableCell>Boolean</TableCell><TableCell>Optional</TableCell><TableCell>When set to 1, limits output to target variable date range</TableCell></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">6. Auto Discovery</h2>
            <p className="text-gray-700 mb-4">
              Auto Discovery finds external drivers (economic, demographic, weather, etc.) that explain your target series. You can submit data as an array or upload a file.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Supported time grains: <strong>Month</strong> or <strong>Day</strong></li>
              <li>For monthly data, dates must be the first day of the month (YYYY-MM-01)</li>
              <li>Processing is asynchronous and returns a <code className="bg-gray-100 px-1 rounded">signal_id</code> immediately</li>
            </ul>

            <CodeBlock>{`signal_auto_discover = rs.auto_discover(
    access_token=ACCESS_TOKEN,
    df=my_target_df,  # OR use file_path='path/to.csv'
    filtered_geo_grains="usa",  # "usa" | "nonusa" | "all"
    create_custom_features=1,   # enable optimized signal generation
    signal_name="My Auto Discovery Signal"
)`}</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Request Parameters</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <TableHeader>Parameter</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Required</TableHeader>
                    <TableHeader>Description</TableHeader>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><TableCell mono>access_token</TableCell><TableCell>String</TableCell><TableCell>Yes</TableCell><TableCell>Your Ready Signal Bearer Token</TableCell></tr>
                  <tr><TableCell mono>df</TableCell><TableCell>DataFrame</TableCell><TableCell>Yes*</TableCell><TableCell>Pandas DataFrame with Date and Value columns</TableCell></tr>
                  <tr><TableCell mono>file_path</TableCell><TableCell>String</TableCell><TableCell>Yes*</TableCell><TableCell>Path to CSV or Excel file (alternative to df)</TableCell></tr>
                  <tr><TableCell mono>filtered_geo_grains</TableCell><TableCell>String</TableCell><TableCell>Optional</TableCell><TableCell>Filter geographies: "usa", "nonusa", or "all"</TableCell></tr>
                  <tr><TableCell mono>create_custom_features</TableCell><TableCell>Boolean</TableCell><TableCell>Optional</TableCell><TableCell>Set to 1 to enable custom feature generation</TableCell></tr>
                  <tr><TableCell mono>signal_name</TableCell><TableCell>String</TableCell><TableCell>Optional</TableCell><TableCell>Custom name for the generated signal</TableCell></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-2">* Either df or file_path is required</p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Data Format</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Required</TableHeader>
                    <TableHeader>Description</TableHeader>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><TableCell mono>Date</TableCell><TableCell>String (YYYY-MM-DD)</TableCell><TableCell>Yes</TableCell><TableCell>Date of the observation (first day of month)</TableCell></tr>
                  <tr><TableCell mono>Value</TableCell><TableCell>Numeric</TableCell><TableCell>Yes</TableCell><TableCell>Value of your target variable</TableCell></tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Example Response</h4>
            <CodeBlock language="json">{`{
  "message": "Your signal has been created",
  "signal_id": 1234
}`}</CodeBlock>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
            <p className="text-blue-50 mb-6">
              For complete API reference and REST endpoints, visit our main documentation
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/ready-signal-api-documentation/"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all"
              >
                <BookOpen className="w-5 h-5" />
                API Documentation
              </Link>
              <Link
                to="/contact-us/"
                className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all"
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
