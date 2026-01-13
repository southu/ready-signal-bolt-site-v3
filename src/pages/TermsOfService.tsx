import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service | Ready Signal"
        description="Ready Signal's terms of service governing the use of our data intelligence and analytics platform."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Terms of Service
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
                These Terms of Service ("Terms") govern your access to and use of Ready Signal's website, platform, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-8">
                By creating an account, accessing, or using Ready Signal's Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, you may not use our Services.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
              <p className="text-gray-600 mb-4">
                Ready Signal provides a data intelligence and analytics platform that enables users to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                <li>Access external data sources for forecasting and predictive modeling</li>
                <li>Integrate external data with internal business data</li>
                <li>Generate insights and analytics through our platform</li>
                <li>Export processed data for use in third-party applications</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration</h2>
              <p className="text-gray-600 mb-4">To use our Services, you must:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any changes to your information</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription and Payment</h2>
              <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                <li><strong>Fees:</strong> You agree to pay all fees associated with your selected subscription plan</li>
                <li><strong>Billing:</strong> Subscriptions are billed in advance on a monthly or annual basis</li>
                <li><strong>Renewals:</strong> Subscriptions automatically renew unless cancelled before the renewal date</li>
                <li><strong>Refunds:</strong> Fees are non-refundable except as required by law or stated in your agreement</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use</h2>
              <p className="text-gray-600 mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                <li>Use the Services for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Services</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
                <li>Share your account credentials with unauthorized users</li>
                <li>Resell or redistribute the Services without authorization</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                <li><strong>Our Property:</strong> Ready Signal retains all rights to the Services, including all software, algorithms, and proprietary methodologies</li>
                <li><strong>Your Data:</strong> You retain ownership of any data you upload to the platform</li>
                <li><strong>License:</strong> We grant you a limited, non-exclusive license to use the Services during your subscription</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data and Privacy</h2>
              <p className="text-gray-600 mb-8">
                Your use of the Services is also governed by our Privacy Policy, which describes how we collect, use, and protect your information. By using the Services, you consent to the practices described in the Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Data Sources</h2>
              <p className="text-gray-600 mb-8">
                Our Services incorporate data from third-party sources. While we strive to ensure data quality, we make no guarantees regarding the accuracy, completeness, or reliability of third-party data. You are responsible for verifying data suitability for your specific use case.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-gray-600 mb-8">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-600 mb-8">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, READY SIGNAL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE SERVICES IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
              <p className="text-gray-600 mb-8">
                You agree to indemnify and hold harmless Ready Signal and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Services or violation of these Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
              <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
                <li><strong>By You:</strong> You may cancel your subscription at any time through your account settings</li>
                <li><strong>By Us:</strong> We may suspend or terminate your access for violation of these Terms</li>
                <li><strong>Effect:</strong> Upon termination, your right to use the Services ceases immediately</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Modifications to Terms</h2>
              <p className="text-gray-600 mb-8">
                We may modify these Terms at any time. We will notify you of material changes via email or through the Services. Continued use after changes constitutes acceptance of the modified Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Governing Law</h2>
              <p className="text-gray-600 mb-8">
                These Terms shall be governed by and construed in accordance with the laws of the State of Michigan, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Dispute Resolution</h2>
              <p className="text-gray-600 mb-8">
                Any disputes arising from these Terms or your use of the Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, unless prohibited by applicable law.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms, please contact:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-900 font-semibold mb-2">Ready Signal – Legal Team</p>
                <p className="text-gray-600">
                  Email: <a href="mailto:legal@readysignal.com" className="text-amber-600 hover:text-amber-700">legal@readysignal.com</a>
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

