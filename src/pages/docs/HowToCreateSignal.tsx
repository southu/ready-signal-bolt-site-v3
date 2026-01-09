import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Plus, Settings, Filter, Download, ChevronRight } from 'lucide-react';

const StepCard = ({
  number,
  title,
  children
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-6">
    <div className="flex items-start gap-4 mb-4">
      <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold">
        {number}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 pt-1">{title}</h2>
    </div>
    <div className="ml-14 text-gray-700">{children}</div>
  </div>
);

export default function HowToCreateSignal() {
  return (
    <>
      <SEO
        title="How to Create a Signal | Ready Signal Help"
        description="Step by step guide on how to create a signal in Ready Signal from start to finish."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/help-center/"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              How to Create a Signal
            </h1>
            <p className="text-xl text-gray-600">
              Step by step walk through of how to create a signal from start to finish.
            </p>
          </div>

          <StepCard number={1} title="Click Create Signal">
            <p>To get started, click the <strong>Create Signal</strong> button on the top right of the page.</p>
          </StepCard>

          <StepCard number={2} title="Enter Basic Info">
            <p className="mb-4">Put in a name and a description for the signal you are creating.</p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800">Note: These are only used for descriptive purposes to help you identify your signals.</p>
            </div>
          </StepCard>

          <StepCard number={3} title="Select Your Analysis Type">
            <p className="mb-4">Enter your industry and analysis type.</p>
            <p>This information is used to recommend features (control data sets) you should consider including in your signal.</p>
          </StepCard>

          <StepCard number={4} title="Select Desired Output Grain">
            <p className="mb-4">This information determines the granularity of the signal output (number of rows).</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Select a <strong>geographic grain</strong> (City, State, Zip, etc.)</li>
              <li>Select a <strong>time grain</strong> (Day, Week, Month, etc.)</li>
            </ul>
            <p className="mb-4">
              For example, if you select a granularity of Month and Zip, you will get a unique row of data for each month and zip code combination.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-amber-800">
                <strong>Tip:</strong> If you select "no end date", the signal will always include the most recently available data.
              </p>
            </div>
          </StepCard>

          <StepCard number={5} title="Add Features - Filter Features">
            <p className="mb-4">Start by filtering what features (control data sets) you want to look at:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Select or deselect any category</li>
              <li>Enter a keyword to search for signals with that word or phrase</li>
              <li>View recommendations based on the Industry and Analysis Type you selected</li>
            </ul>
            <p>Click <strong>Explore</strong> to see matching results.</p>
          </StepCard>

          <StepCard number={6} title="Add Features - Select From Matching Features">
            <p className="mb-4">Features that match your criteria will be shown in the results:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><span className="text-amber-600">Yellow stars</span> - Previously favored features (shown at top)</li>
              <li><span className="text-gray-500">Grey stars</span> - System recommended features based on your selections</li>
              <li>Other matching features shown in alphabetical order</li>
            </ul>
            <p className="mb-4">
              For each feature you'll see its name, the publisher, and the source geographic/date grain. The Ready Signal system will transform this data to match your desired output grain.
            </p>
            <p className="mb-4">Click on the feature's name to see more information.</p>
            <p>Click the <strong>+</strong> icon to add a feature to your signal. Repeat until you've added all desired features.</p>
          </StepCard>

          <StepCard number={7} title="Confirm Selected Features">
            <p className="mb-4">You will see a list of the features you have selected at the bottom of the page:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Click the trash can icon to remove a feature from your list</li>
              <li>You can apply recommended Data Science treatments by default (can be changed later)</li>
            </ul>
            <p>Click <strong>Finish</strong> to create your signal.</p>
          </StepCard>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
            <p className="text-gray-700 mb-4">
              Once your signal is created, you can continue to modify it until you're ready to ingest it into your models:
            </p>
            <ul className="space-y-3">
              {[
                'Apply data science treatments to individual features',
                'Add, remove, or duplicate features',
                'Edit basic signal details (name, description, etc.)',
                'Get an output of your data (Download to CSV/Excel, or connect via API)'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Resources</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                to="/data-grains-explained/"
                className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all group"
              >
                <Settings className="w-6 h-6 text-amber-500 mb-2" />
                <span className="font-medium text-gray-900 group-hover:text-amber-600">Time & Geo Grains</span>
              </Link>
              <Link
                to="/overview-of-data-science-treatments/"
                className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all group"
              >
                <Filter className="w-6 h-6 text-amber-500 mb-2" />
                <span className="font-medium text-gray-900 group-hover:text-amber-600">Data Science Treatments</span>
              </Link>
              <Link
                to="/how-to-export-your-processed-control-data-signal/"
                className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all group"
              >
                <Download className="w-6 h-6 text-amber-500 mb-2" />
                <span className="font-medium text-gray-900 group-hover:text-amber-600">Output Options</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
