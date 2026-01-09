import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Terminal, ArrowLeft, BookOpen, Github } from 'lucide-react';

const CodeBlock = ({ children, language = 'r' }: { children: string; language?: string }) => (
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

export default function APIDocsR() {
  return (
    <>
      <SEO
        title="R API Documentation | Ready Signal"
        description="Learn how to connect to Ready Signal using R 3.6+ for data science and forecasting workflows."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/ready-signal-api-documentation/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to API Documentation
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
                <Terminal className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  R API Documentation
                </h1>
                <p className="text-xl text-gray-600 mt-2">R 3.6+ integration guide</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <p className="text-gray-700 mb-4">
              This library is designed to be a wrapper for the Ready Signal API: <a href="https://app.readysignal.com" className="text-green-600 hover:underline">app.readysignal.com</a>
            </p>
            <a
              href="https://github.com/rxa-io/readysignal-r"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">github.com/rxa-io/readysignal-r</span>
            </a>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Installation</h2>
            <p className="text-gray-700 mb-2">Install the Ready Signal R package from GitHub:</p>
            <CodeBlock>{`library(devtools)
devtools::install_github("rxa-io/readysignal-r")`}</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Usage</h2>
            <p className="text-gray-700 mb-4">
              Your access token and signal ID can be found on your "Manage Signal" page within the Output information. Your signal ID is also visible within the URL of the "Manage Signal" page:
            </p>
            <CodeBlock language="url">https://app.readysignal.com/signal/SIGNAL_ID/manage</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Setup</h2>
            <CodeBlock>{`library(readysignal)

access_token <- "YOUR_ACCESS_TOKEN"
signal_id <- 123  # your signal ID`}</CodeBlock>
            <p className="text-gray-600 mt-4">
              Replace <code className="bg-gray-100 px-1 rounded">YOUR_ACCESS_TOKEN</code> with your actual access token and <code className="bg-gray-100 px-1 rounded">123</code> with your actual signal ID.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">List Signals</h2>
            <p className="text-gray-700 mb-4">
              Using your <code className="bg-gray-100 px-1 rounded">access_token</code>, you can list all signals and metadata associated with your Ready Signal account.
            </p>
            <CodeBlock>{`list_signals(access_token)`}</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Example Output</h4>
            <CodeBlock language="output">{`  id  name              description       ... links.manage
1  7  test signal       first signal      ... https://app.readysignal.com/signal/7/manage
2 11  another signal    useful signal     ... https://app.readysignal.com/signal/11/manage
3 13  one more signal   important stuff   ... https://app.readysignal.com/signal/13/manage`}</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Signal Details</h2>
            <p className="text-gray-700 mb-4">
              Using your <code className="bg-gray-100 px-1 rounded">access_token</code> and <code className="bg-gray-100 px-1 rounded">signal_id</code>, you can view the details of a specific signal.
            </p>
            <CodeBlock>{`get_signal_details(access_token, signal_id)`}</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Signal Data</h2>
            <p className="text-gray-700 mb-4">
              There are two different ways to receive your signal data:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>R data.frame</li>
              <li>CSV export</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mb-2">As data.frame</h4>
            <CodeBlock>{`df <- get_signal(access_token, signal_id)`}</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Example Output</h4>
            <CodeBlock language="output">{`  start       end         country                     actual-snow-fall  population-total
1 2019-11-01  2019-11-30  United States of America    160205.00         308745538.00
2 2019-12-01  2019-12-31  United States of America    219691.00         308745538.00
3 2020-01-01  2020-01-31  United States of America    220869.00         308745538.00`}</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">CSV Export</h2>
            <p className="text-gray-700 mb-4">
              Export your signal data directly to a CSV file:
            </p>
            <CodeBlock>{`signal_to_csv(access_token, signal_id, "my_signal.csv")`}</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Help</h2>
            <p className="text-gray-700 mb-4">
              Use the built-in <code className="bg-gray-100 px-1 rounded">help()</code> command to view function descriptions:
            </p>
            <CodeBlock>{`help(signal_to_csv)`}</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Auto Discovery</h2>
            <p className="text-gray-700 mb-4">
              Create a signal using your own data and the Auto Discover feature.
            </p>

            <h4 className="font-semibold text-gray-900 mb-2">Function Signature</h4>
            <CodeBlock>{`auto_discovery(
  token,
  geo_grain,
  date_grain,
  filename = NULL,
  df = NULL,
  callback_url = NULL
)`}</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Arguments</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <TableHeader>Argument</TableHeader>
                    <TableHeader>Description</TableHeader>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><TableCell mono>token</TableCell><TableCell>User access token</TableCell></tr>
                  <tr><TableCell mono>geo_grain</TableCell><TableCell>Geo grain of upload: "State" or "Country"</TableCell></tr>
                  <tr><TableCell mono>date_grain</TableCell><TableCell>Date grain of upload: "Day" or "Month"</TableCell></tr>
                  <tr><TableCell mono>create_custom_features</TableCell><TableCell>"0" or "1" (Optional, Numeric)</TableCell></tr>
                  <tr><TableCell mono>filename</TableCell><TableCell>Filename of .CSV or .XLS with "Date", "Value", "State" columns. Not to be used with df</TableCell></tr>
                  <tr><TableCell mono>df</TableCell><TableCell>Dataframe with "Date", "Value", "State" (if geo_grain=State). Not to be used with filename</TableCell></tr>
                  <tr><TableCell mono>callback_url</TableCell><TableCell>Callback URL for notifications</TableCell></tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Example: Using a DataFrame</h4>
            <CodeBlock>{`# Create a new signal with AutoDiscovery from a dataframe
# When geo_grain="Country", columns MUST be c("Date", "Value")
# When geo_grain="State", columns MUST be c("Date", "Value", "State")

df <- data.frame(
  Date = c("2022-01-01", "2022-01-02", "2022-01-03"),
  Value = c(351, 465, 712)
)

auto_discover(token, geo_grain="Country", date_grain="Day", df=df)`}</CodeBlock>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">Example: Using a File</h4>
            <CodeBlock>{`# Use AutoDiscovery with a file upload
# Using State geo_grain - file needs columns: Date, State, Value

# Example file content (states.csv):
# Date,State,Value
# 2020-03-01,TN,416000
# 2020-03-01,KY,373000
# ...

resp <- auto_discover(
  token,
  geo_grain="State",
  date_grain="Month",
  filename="states.csv"
)`}</CodeBlock>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Function Reference</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <TableHeader>Function</TableHeader>
                    <TableHeader>Description</TableHeader>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><TableCell mono>list_signals(access_token)</TableCell><TableCell>Lists all signals associated with your account</TableCell></tr>
                  <tr><TableCell mono>get_signal_details(access_token, signal_id)</TableCell><TableCell>Gets details for a specific signal</TableCell></tr>
                  <tr><TableCell mono>get_signal(access_token, signal_id)</TableCell><TableCell>Retrieves signal data as R data.frame</TableCell></tr>
                  <tr><TableCell mono>signal_to_csv(access_token, signal_id, filename)</TableCell><TableCell>Exports signal data to CSV</TableCell></tr>
                  <tr><TableCell mono>auto_discover(token, geo_grain, date_grain, ...)</TableCell><TableCell>Creates a new signal with Auto Discover feature</TableCell></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
            <p className="text-green-50 mb-6">
              For complete API reference and REST endpoints, visit our main documentation
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/ready-signal-api-documentation/"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all"
              >
                <BookOpen className="w-5 h-5" />
                API Documentation
              </Link>
              <Link
                to="/contact-us/"
                className="inline-flex items-center justify-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-all"
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
