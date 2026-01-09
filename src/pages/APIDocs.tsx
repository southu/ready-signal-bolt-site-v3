import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Code, BookOpen, FileCode, Terminal, ChevronRight } from 'lucide-react';

const CodeBlock = ({ children, language = 'json' }: { children: string; language?: string }) => (
  <div className="bg-gray-900 rounded-lg overflow-x-auto">
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

export default function APIDocs() {
  return (
    <>
      <SEO
        title="Ready Signal API Documentation"
        description="Learn how to authenticate, access endpoints, and retrieve processed signal data using the Ready Signal Platform API."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Ready Signal API Documentation
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Welcome to the Ready Signal API. This guide explains how to authenticate, access endpoints, and retrieve processed signal data using the Ready Signal Platform.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <p className="text-gray-700 font-medium mb-2">The API allows you to:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Programmatically generate and manage your Signals</li>
                <li>Retrieve processed data and metadata</li>
                <li>Automate model inputs and workflows</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Link
              to="/ready-signal-api-documentation-python-sdk/"
              className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all group shadow-sm hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    Python SDK Documentation
                  </h3>
                  <p className="text-gray-600">Integrate Ready Signal with Python 3.6+</p>
                </div>
              </div>
            </Link>

            <Link
              to="/ready-signal-api-documentation-r-3-6/"
              className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-green-300 transition-all group shadow-sm hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-green-600 transition-colors">
                    R Documentation
                  </h3>
                  <p className="text-gray-600">Connect to Ready Signal using R 3.6+</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Base URL</h2>
            <CodeBlock language="url">https://app.readysignal.com/api/</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">1. Get an Access Token</h2>
            <p className="text-gray-700 mb-6">
              To use the Ready Signal API, you'll need an <strong>access token</strong> to authenticate your requests:
            </p>
            <div className="space-y-4 mb-6">
              {[
                'Log in to your Ready Signal Account',
                'Open an existing Signal or create a new one',
                'Select Output for the Signal',
                'In the API Credentials section, click the copy icon next to your access token'
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600">That's it. You will use that token to authenticate your next requests.</p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">2. GET My Signals</h2>
            <p className="text-gray-700 mb-4">
              Retrieve a list of all signals associated with your Ready Signal account. Each record includes summary information such as configuration, time range, status and output links.
            </p>

            <h4 className="font-semibold text-gray-900 mb-2">Request</h4>
            <CodeBlock language="http">GET /api/signals</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Headers</h4>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <TableHeader>Key</TableHeader>
                    <TableHeader>Value</TableHeader>
                    <TableHeader>Required</TableHeader>
                    <TableHeader>Description</TableHeader>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><TableCell mono>Authorization</TableCell><TableCell mono>Bearer &#123;token&#125;</TableCell><TableCell>Yes</TableCell><TableCell>API authentication token</TableCell></tr>
                  <tr><TableCell mono>Accept</TableCell><TableCell mono>application/json</TableCell><TableCell>Yes</TableCell><TableCell>Response format</TableCell></tr>
                  <tr><TableCell mono>Content-Type</TableCell><TableCell mono>application/json</TableCell><TableCell>Yes</TableCell><TableCell>Request format</TableCell></tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">Example Request</h4>
            <CodeBlock language="http">{`GET /api/signals HTTP/1.1
Host: app.readysignal.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJ0eXAiOiJKV1QiLCI1N...bGciOiJSUzI1Nmqhi6A`}</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Example Response</h4>
            <CodeBlock>{`{
  "data": [
    {
      "id": {signal_id},
      "name": "My Signal Name",
      "description": "The description of my signal.",
      "desired_geo_grain": "State",
      "desired_time_grain": "Week",
      "start_at": "01/26/2020",
      "end_at": "05/31/2020",
      "created_at": "06/03/2020",
      "updated_at": "06/03/2020",
      "deleted_at": null,
      "output": {
        "json": "https://app.readysignal.com/api/signals/{signal_id}/output?format=json"
      },
      "links": {
        "self": "https://app.readysignal.com/signal/{signal_id}/manage",
        "manage": "https://app.readysignal.com/signal/{signal_id}/manage"
      },
      "status": "Ready",
      "error_message": ""
    }
  ]
}`}</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">3. GET Signal Metadata</h2>
            <p className="text-gray-700 mb-4">
              Retrieve detailed information about a specific signal ID, including configuration and metadata. This endpoint is typically used to <strong>inspect a signal's setup and metadata</strong> before fetching its output.
            </p>

            <h4 className="font-semibold text-gray-900 mb-2">Request</h4>
            <CodeBlock language="http">GET /api/signals/&#123;signal_id&#125;</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Query Parameters</h4>
            <div className="overflow-x-auto mb-6">
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
                  <tr>
                    <TableCell mono>optimized</TableCell>
                    <TableCell>Boolean</TableCell>
                    <TableCell>Optional</TableCell>
                    <TableCell>When set to 1, returns optimized signal metadata. Only available for signals generated by auto-discovery where create_custom_features = 1.</TableCell>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">Example Request</h4>
            <CodeBlock language="http">{`GET /api/signals/48 HTTP/1.1
Host: app.readysignal.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJ0eXAiOiJKV1QiLCI1N...bGciOiJSUzI1Nmqhi6A`}</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">4. GET My Signal Output</h2>
            <p className="text-gray-700 mb-4">
              Retrieve the processed output data for a specific signal ID. Each response is <strong>paginated</strong>, returning up to <strong>1,000 records per page</strong>. Use the <code className="bg-gray-100 px-1 rounded">page</code> query parameter to request additional pages.
            </p>

            <h4 className="font-semibold text-gray-900 mb-2">Request</h4>
            <CodeBlock language="http">GET /api/signals/&#123;signal_id&#125;/output</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Query Parameters</h4>
            <div className="overflow-x-auto mb-6">
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
                  <tr><TableCell mono>page</TableCell><TableCell>Integer</TableCell><TableCell>Optional</TableCell><TableCell>Page number for pagination (default = 1)</TableCell></tr>
                  <tr><TableCell mono>optimized</TableCell><TableCell>Boolean</TableCell><TableCell>Optional</TableCell><TableCell>When set to 1, returns optimized signal output</TableCell></tr>
                  <tr><TableCell mono>startDate</TableCell><TableCell>String (YYYY-MM-DD)</TableCell><TableCell>Optional</TableCell><TableCell>Filters output to data starting on or after this date</TableCell></tr>
                  <tr><TableCell mono>endDate</TableCell><TableCell>String (YYYY-MM-DD)</TableCell><TableCell>Optional</TableCell><TableCell>Filters output to data ending on or before this date</TableCell></tr>
                  <tr><TableCell mono>useTargetVariableDates</TableCell><TableCell>Boolean</TableCell><TableCell>Optional</TableCell><TableCell>When set to 1, limits output to the date range of the target variable</TableCell></tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">Example Request</h4>
            <CodeBlock language="http">{`GET /api/signals/48/output?page=1&optimized=1&startDate=2020-01-01&endDate=2020-06-30 HTTP/1.1
Host: app.readysignal.com
Authorization: Bearer eyJ0eXAiOiJKV1QiLCI1N...bGciOiJSUzI1Nmqhi6A
Accept: application/json
Content-Type: application/json`}</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">5. POST Auto Discovery</h2>
            <p className="text-gray-700 mb-4">
              Ready Signal analyzes your data to identify and recommend external factors like weather, economic, and demographic trends that impact your unique business. There are two methods to start an Auto Discovery: <strong>Array</strong> or <strong>File</strong>.
            </p>
            <p className="text-gray-700 mb-6">
              Currently Auto Discovery works with "Month" and "Day" time grains, so all dates must be the first day of each month. Processing is asynchronous.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
              <p className="font-medium text-amber-800 mb-2">You have four ways to know when processing completes:</p>
              <ol className="list-decimal list-inside text-amber-700 space-y-1">
                <li>Track the status from the Dashboard</li>
                <li>An email is sent by Ready Signal when processing is complete</li>
                <li>Verify by API using the Signal Details endpoint</li>
                <li>Pass a callback_url parameter for webhook notification</li>
              </ol>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">Request</h4>
            <CodeBlock language="http">{`POST /api/auto-discovery/array
POST /api/auto-discovery/file`}</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Request Parameters</h4>
            <div className="overflow-x-auto mb-6">
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
                  <tr><TableCell mono>callback_url</TableCell><TableCell>URL</TableCell><TableCell>Optional</TableCell><TableCell>URL to receive a GET callback with signal_id when processing completes</TableCell></tr>
                  <tr><TableCell mono>filtered_geo_grains</TableCell><TableCell>String</TableCell><TableCell>Optional</TableCell><TableCell>Filter geographies: "usa", "nonusa", or "all"</TableCell></tr>
                  <tr><TableCell mono>create_custom_features</TableCell><TableCell>Boolean</TableCell><TableCell>Optional</TableCell><TableCell>Enables custom feature generation if set to 1</TableCell></tr>
                  <tr><TableCell mono>signal_name</TableCell><TableCell>String</TableCell><TableCell>Optional</TableCell><TableCell>A custom name for the generated signal</TableCell></tr>
                  <tr><TableCell mono>data</TableCell><TableCell>Array</TableCell><TableCell>Yes (if not file)</TableCell><TableCell>Array of data objects containing your time series</TableCell></tr>
                  <tr><TableCell mono>file</TableCell><TableCell>Excel/CSV</TableCell><TableCell>Yes (if not data)</TableCell><TableCell>Excel or CSV file containing your time series</TableCell></tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">Data Object</h4>
            <div className="overflow-x-auto mb-6">
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

            <h4 className="font-semibold text-gray-900 mb-2">Example Request (Array)</h4>
            <CodeBlock language="http">{`POST /api/auto-discovery/array HTTP/1.1
Host: app.readysignal.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJ0eXAiOiJKV1QiLCI1N...bGciOiJSUzI1Nmqhi6A

{
  "callback_url": "https://my-website.com/my-callback-url",
  "create_custom_features": 1,
  "data": [
    { "Date": "2022-01-01", "Value": 2654.5 },
    { "Date": "2022-02-01", "Value": 854.2 },
    { "Date": "2022-03-01", "Value": 1786.9 }
  ]
}`}</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Example Response</h4>
            <CodeBlock>{`{
  "message": "Your signal has been created",
  "signal_id": 1234
}`}</CodeBlock>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Take the Next Step</h2>
            <p className="text-amber-50 mb-6">
              For language-specific implementation guides, check out our SDK documentation
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/ready-signal-api-documentation-python-sdk/"
                className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-all"
              >
                <Code className="w-5 h-5" />
                Python SDK
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/ready-signal-api-documentation-r-3-6/"
                className="inline-flex items-center justify-center gap-2 bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transition-all"
              >
                <Terminal className="w-5 h-5" />
                R Documentation
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
