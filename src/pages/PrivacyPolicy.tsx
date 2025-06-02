const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <p className="text-gray-300 mb-6">
            <strong>Effective Date:</strong> May 30, 2025
          </p>
          
          <div className="space-y-6 text-gray-300">
            <p>
              Foretoken, a service of RGI Enterprises LLC ("we," "us," "our"), respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p className="mb-3">
                We collect minimal personal data, limited to what is necessary to provide and improve our Services. This includes:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Email address and login credentials when you create an account</li>
                <li>Payment information via secure third-party processors (we do not store this data)</li>
                <li>Usage data for analytics (e.g., page views, session duration)</li>
              </ul>
              <p className="mt-3">
                We do not sell or rent your personal information to any third parties. Ever.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Data</h2>
              <p className="mb-3">We use your data to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Provide access to your account</li>
                <li>Improve and personalize your user experience</li>
                <li>Deliver customer support</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Cookies and Analytics</h2>
              <p>
                We use cookies and third-party analytics tools (such as Google Analytics) to understand user behavior and optimize our Services. These cookies are anonymized and cannot track your identity.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <p>
                We take your privacy seriously. Foretoken uses industry-standard encryption and access controls to protect your information. Our data connections—including API calls—are secured via HTTPS and stored in secure environments.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party APIs</h2>
              <p>
                Foretoken connects with third-party data providers (CoinGecko, Yahoo Finance, API Ninjas, etc.). These providers may collect anonymized usage data through their endpoints. We do not control their practices and encourage you to review their respective privacy policies.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p className="mb-3">You may request to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Access your data</li>
                <li>Correct inaccuracies</li>
                <li>Delete your account and associated information</li>
              </ul>
              <p className="mt-3">
                Contact us at privacy@foretoken.co for any such requests.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Children's Privacy</h2>
              <p>
                Foretoken does not knowingly collect data from individuals under the age of 18. If we learn that a child has provided us with personal information, we will delete it immediately.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Policy Updates</h2>
              <p>
                We may update this Privacy Policy from time to time. Any updates will be posted to this page with the effective date noted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;