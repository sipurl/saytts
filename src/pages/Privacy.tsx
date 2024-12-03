import React from 'react';

export function Privacy() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto prose">
        <h1>Privacy Policy</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>We collect information that you provide directly to us when using our text-to-speech service:</p>
        <ul>
          <li>Text content you submit for conversion</li>
          <li>Voice preferences and settings</li>
          <li>Usage data and analytics</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide and improve our text-to-speech service</li>
          <li>Process your requests and generate audio content</li>
          <li>Analyze and optimize service performance</li>
          <li>Communicate with you about service updates</li>
        </ul>

        <h2>3. Data Storage</h2>
        <p>Generated audio files are temporarily stored in your browser's cache and are automatically cleared when you refresh the page. We do not permanently store your generated audio files on our servers.</p>

        <h2>4. Security</h2>
        <p>We implement appropriate security measures to protect your information:</p>
        <ul>
          <li>Secure HTTPS encryption</li>
          <li>Regular security audits</li>
          <li>Limited access to personal information</li>
        </ul>

        <h2>5. Compliance</h2>
        <p>Our service complies with applicable data protection regulations including GDPR and CCPA.</p>

        <h2>6. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@verbatts.com</p>
      </div>
    </div>
  );
}