import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft } from 'lucide-react';

const R_DOCS_HTML = `
<h1>Ready Signal API Documentation - R 3.6+</h1>

<p>
  This library is designed to be a wrapper for the Ready Signal API:
  <a href="https://app.readysignal.com/" target="_blank" rel="noopener noreferrer">app.readysignal.com</a>
</p>

<p>
  It is hosted on GitHub here:
  <a href="https://github.com/rxa-io/readysignal-r" target="_blank" rel="noopener noreferrer">github.com/rxa-io/readysignal-r</a>
</p>

<p>
  Please direct all questions and recommendations to
  <a href="mailto:support@readysignal.com">support@readysignal.com</a>.
</p>

<h2>Installation</h2>
<pre><code>library(devtools)
devtools::install_github("rxa-io/readysignal-r")</code></pre>

<h2>Usage</h2>
<p>
  Your access token and signal ID can be found on your "Manage Signal" page within the Output information.
  Your signal ID is also visible in the URL of the Manage Signal page:
</p>
<pre><code>https://app.readysignal.com/signal/SIGNAL_ID/manage</code></pre>

<h2>Setup</h2>
<pre><code>library(readysignal)

access_token &lt;- "YOUR_ACCESS_TOKEN"
signal_id &lt;- 123  # your signal ID</code></pre>

<h2>List Signals</h2>
<p>
  Using your <code>access_token</code>, you can list all signals and metadata associated with your Ready Signal account.
</p>
<pre><code>account.list_signals(access_token)</code></pre>

<h3>Example Output</h3>
<pre><code>id  name            description        ...  links.manage
1   7   test signal  first signal      ...  https://app.readysignal.com/signal/7/manage
2   11  another signal useful signal   ...  https://app.readysignal.com/signal/11/manage
3   13  one more signal important stuff...  https://app.readysignal.com/signal/13/manage</code></pre>

<h2>Signal Details</h2>
<p>
  Using your <code>access_token</code> and <code>signal_id</code>, you can view the details of a specific signal.
</p>
<pre><code>signal.get_signal_details(access_token, signal_id)</code></pre>

<h2>Signal Data</h2>
<p>There are two ways to receive your signal data:</p>
<ul>
  <li>R data.frame</li>
  <li>CSV export</li>
</ul>

<h3>data.frame</h3>
<pre><code>df &lt;- get_signal(access_token, signal_id)</code></pre>

<h3>Example Output</h3>
<pre><code>start       end         country                     actual-snow-fall  ... population-total
2019-11-01  2019-11-30  United States of America   160205.00         ... 308745538.00
2019-12-01  2019-12-31  United States of America   219691.00         ... 308745538.00
2020-01-01  2020-01-31  United States of America   220869.00         ... 308745538.00</code></pre>

<h3>CSV Export</h3>
<pre><code>signal_to_csv(access_token, signal_id, "my_signal.csv")</code></pre>

<h2>Help</h2>
<p>Use the built-in <code>help()</code> command to view function descriptions.</p>
<pre><code>help(signal_to_csv)</code></pre>

<h2>Auto Discover</h2>

<h3>Description</h3>
<p>Create a signal with the Auto Discover feature.</p>

<h3>Usage</h3>
<pre><code>auto_discovery(
  token,
  geo_grain,
  date_grain,
  filename = NULL,
  df = NULL,
  callback_url = NULL
)</code></pre>

<h3>Arguments</h3>
<ul>
  <li><code>token</code>: User access token</li>
  <li><code>geo_grain</code>: Geo grain of upload, "State" or "Country"</li>
  <li><code>date_grain</code>: Date grain of upload, "Day" or "Month"</li>
  <li><code>create_custom_features</code>: "0" or "1" (optional, numeric)</li>
  <li><code>filename</code>: Filename of .CSV or .XLS with "Date", "Value", and "State" (if geo_grain = State) columns. Do not use with <code>df</code>.</li>
  <li><code>df</code>: Data frame with "Date", "Value", and "State" (if geo_grain = State). Do not use with <code>filename</code>.</li>
  <li><code>callback_url</code>: Callback URL for notifications</li>
</ul>

<h3>Value</h3>
<p>HTTP response</p>

<h3>Sample Code</h3>
<pre><code># Create a new signal with the Auto Discover feature from a data frame.
# When geo_grain = "Country", columns must be c("Date", "Value").
# When geo_grain = "State", columns must be c("Date", "Value", "State").

df &lt;- data.frame(
  Date = c("2022-01-01", "2022-01-02", "2022-01-03"),
  Value = c(351, 465, 712)
)

auto_discover(token, geo_grain = "Country", date_grain = "Day", df = df)

# Use Auto Discover with a file upload and State geo grain.
system("cat states.csv")
# Date,State,Value
# 2020-03-01,TN,416000
# 2020-03-01,KY,373000
# ...

resp &lt;- auto_discover(
  token,
  geo_grain = "State",
  date_grain = "Month",
  filename = "states.csv"
)</code></pre>
`;

export default function RVideoExample() {
  return (
    <>
      <SEO
        title="Ready Signal API Documentation - R 3.6+ | Ready Signal"
        description="Official Ready Signal API documentation for the R 3.6+ package, including installation, setup, signal retrieval, and auto discover examples."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/help-center/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>

          <article
            className="
              bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm
              text-gray-800
              [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mb-6
              [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:text-base [&_p]:leading-7 [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1
              [&_a]:text-green-700 [&_a]:underline hover:[&_a]:text-green-800
              [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-gray-200 [&_pre]:bg-gray-50 [&_pre]:p-4 [&_pre]:mb-4
              [&_code]:font-mono [&_code]:text-sm
            "
            dangerouslySetInnerHTML={{ __html: R_DOCS_HTML }}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
