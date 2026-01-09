import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, PlayCircle, FileText } from 'lucide-react';

export default function CreateSignalVideo() {
  return (
    <>
      <SEO
        title="How to Create a Signal - Video Version | Ready Signal"
        description="Watch a video walkthrough of how to create a signal in Ready Signal."
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

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                How to Create a Signal - Video
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Watch a complete walkthrough of the signal creation process
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center mb-6">
              <div className="text-center">
                <PlayCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Video tutorial available in the Ready Signal platform</p>
                <a
                  href="https://app.readysignal.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Watch in Platform
                </a>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>How to start creating a new signal</li>
              <li>Selecting your analysis type and output grain</li>
              <li>Browsing and filtering available features</li>
              <li>Adding features to your signal</li>
              <li>Applying data science treatments</li>
              <li>Exporting your processed data</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
            <h3 className="font-semibold text-green-800 mb-2">Prefer Reading?</h3>
            <p className="text-green-700">
              Check out our detailed written guide for step-by-step instructions with screenshots.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/how-to-create-a-signal/"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all"
            >
              <FileText className="w-5 h-5" />
              Written Guide
            </Link>
            <Link
              to="/help-center/"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
