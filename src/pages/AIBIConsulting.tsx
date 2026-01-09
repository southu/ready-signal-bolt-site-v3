import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Brain, Database, Cloud, BarChart3, Users, Zap } from 'lucide-react';

export default function AIBIConsulting() {
  return (
    <>
      <SEO
        title="AI & BI Consulting | Ready Signal"
        description="Our team of skilled professionals can convert your ideas into outcomes that are ready for production. AI and BI consulting services for organizations of all sizes."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  AI & BI Consulting
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Our team of skilled professionals can convert your ideas into outcomes that are ready for production
                </p>
                <Link
                  to="/contact-us/"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started
                  <Brain className="w-5 h-5" />
                </Link>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100 shadow-xl">
                  <Brain className="w-full h-64 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applied AI Consulting Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Applied Artificial Intelligence Consulting</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Ready Signal's AI Kickstart Program is customizable for organizations of all sizes across the globe
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-12 rounded-2xl border-2 border-blue-100 mb-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Applied artificial intelligence consulting involves the use of AI to solve business problems and achieve specific objectives. The process typically involves defining the problem and objectives, collecting and preparing data, selecting appropriate algorithms, and training and validating models.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The goal is to create production-ready solutions that can be integrated into a company's operations and processes to deliver value and improve efficiency. The Ready Signal consulting team of experts can help guide businesses through this process and ensure they are leveraging the full potential of AI to drive business success.
              </p>
            </div>
          </div>
        </section>

        {/* BI Consulting Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Business Intelligence Consulting</h2>
              <p className="text-2xl font-semibold text-amber-600 mb-4">The Cost of Big Data</p>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stop exhausting too many resources trying to interpret your business data
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-12 rounded-2xl border-2 border-green-100 mb-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Business Intelligence Consulting involves the use of data and analytics to help companies make more informed decisions and gain insights into their business operations. The process typically involves collecting and analyzing data from various sources, creating dashboards and reports to visualize the data, and using data mining and predictive analytics to identify patterns and trends.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Business Intelligence Consulting can help companies identify growth opportunities and optimize their operations, as well as improve customer satisfaction and retention. Ready Signal Business Intelligence Consultants can help guide companies through this process, providing expertise and insight to ensure they are leveraging their data effectively and making informed decisions based on data-driven insights.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready Signal fills the exact position for the exact amount of time needed
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Data Management</h3>
                    <p className="text-gray-600">
                      The team at Ready Signal is dedicated to ensuring the accurate collection, storage, and integration of data into your existing architecture.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Cloud Management</h3>
                    <p className="text-gray-600">
                      Ready Signal assists you in comprehending the cloud alternatives that are most suitable for your organization's present and future requirements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border-2 border-amber-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Data Visualization</h3>
                    <p className="text-gray-600">
                      Ready Signal constructs resilient data visualization dashboards that offer practical, up-to-the-minute insights into your enterprise.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Data Science</h3>
                    <p className="text-gray-600">
                      The consulting team at Ready Signal maximizes the potential of data by implementing top-tier data science techniques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Partners Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Technology Partners</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready Signal works with the leading analytic, data science, business intelligence, and data stack platforms that are available today
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {['Python', 'R', 'Alteryx', 'AWS', 'Google Cloud', 'Domo', 'Power BI', 'Tableau', 'SAS', 'Snowflake', 'Azure', 'DataRobot'].map((tech) => (
                <div
                  key={tech}
                  className="bg-white p-6 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-amber-300 transition-all"
                >
                  <span className="text-gray-700 font-semibold text-center">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Success Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Over 450 Satisfied Customers Worldwide</h2>
              <p className="text-xl text-gray-600">
                Trusted by leading organizations across industries
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="text-center">
                <Users className="w-16 h-16 text-amber-500 mx-auto mb-2" />
                <p className="text-gray-600 font-semibold">Fortune 500 Companies</p>
              </div>
              <div className="text-center">
                <Zap className="w-16 h-16 text-blue-500 mx-auto mb-2" />
                <p className="text-gray-600 font-semibold">Startups & Scale-ups</p>
              </div>
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-green-500 mx-auto mb-2" />
                <p className="text-gray-600 font-semibold">Analytics Teams</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-amber-50">
              Let's discuss how our consulting services can transform your data strategy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact-us/"
                className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl"
              >
                Schedule Consultation
              </Link>
              <Link
                to="/plans/"
                className="inline-flex items-center justify-center gap-2 bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-all shadow-lg hover:shadow-xl"
              >
                View Plans
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
