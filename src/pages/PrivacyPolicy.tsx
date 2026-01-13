import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Ready Signal"
        description="Ready Signal's privacy policy explaining how we collect, use, disclose, and protect personal information."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              <strong>Last Updated:</strong> December 10, 2025
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                Ready Signal ("Ready Signal", "we", "us", or "our") provides data intelligence and analytics services through our website (https://www.readysignal.com) and our application platform (https://app.readysignal.com) ("Services").
              </p>
              <p className="text-gray-600 mb-8">
                This Privacy Policy explains how we collect, use, disclose, and protect personal information.
              </p>
              <p className="text-gray-600 mb-12">
                By using our Services, you agree to the practices described in this Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-4">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, company name, job title</li>
                <li><strong>Payment Information:</strong> Billing address, payment details (processed securely through third-party providers)</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our platform</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
                <li><strong>Customer Data:</strong> Data you upload or input into our platform for processing</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use collected information to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                <li>Provide, operate, and improve our Services</li>
                <li>Process transactions and send related information</li>
                <li>Communicate with you about updates, support, and marketing (with consent)</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Ensure security and prevent fraud</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Sharing</h2>
              <p className="text-gray-600 mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                <li><strong>Service Providers:</strong> Third parties who assist in delivering our Services (e.g., hosting, payment processing)</li>
                <li><strong>Legal Compliance:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              </ul>
              <p className="text-gray-600 mb-8">
                We do not sell your personal information.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-600 mb-8">
                We implement industry-standard security measures to protect your data, including encryption, access controls, and regular security assessments. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
              <p className="text-gray-600 mb-8">
                We retain personal information for as long as necessary to provide our Services, comply with legal obligations, and resolve disputes. Customer Data is retained in accordance with your subscription agreement.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-600 mb-8">
                We use cookies and similar technologies to enhance your experience, analyze usage, and deliver targeted content. You can manage cookie preferences through your browser settings.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-600 mb-4">Depending on your location, you may have rights to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Access, correct, or delete your personal information</li>
                <li>Object to or restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent (where applicable)</li>
              </ul>
              <p className="text-gray-600 mb-8">
                To exercise these rights, contact us at: <a href="mailto:privacy@readysignal.com" className="text-amber-600 hover:text-amber-700">privacy@readysignal.com</a>
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-600 mb-8">
                Ready Signal does not knowingly collect personal information from children under 16. If we learn that such information has been collected, we will delete it promptly.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-600 mb-8">
                We may transfer personal information to the United States or other regions where our subprocessors operate. We use appropriate safeguards when doing so.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes To This Policy</h2>
              <p className="text-gray-600 mb-8">
                We may update this Privacy Policy periodically. The "Last Updated" date will reflect the most recent version. Material updates will be communicated via email or a notice on our Site.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-900 font-semibold mb-2">Ready Signal – Privacy Team</p>
                <p className="text-gray-600">
                  Email: <a href="mailto:privacy@readysignal.com" className="text-amber-600 hover:text-amber-700">privacy@readysignal.com</a>
                </p>
                <p className="text-gray-600">
                  Website: <a href="https://www.readysignal.com" className="text-amber-600 hover:text-amber-700">https://www.readysignal.com</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

