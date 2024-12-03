import React from 'react';

export function Terms() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto prose">
        <h1>Terms of Service</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Service Usage</h2>
        <p>By using our text-to-speech service, you agree to these terms and conditions.</p>

        <h2>2. License</h2>
        <p>You may use generated audio content for:</p>
        <ul>
          <li>Personal projects</li>
          <li>Commercial purposes</li>
          <li>Public broadcasting</li>
          <li>Online content creation</li>
        </ul>

        <h2>3. Restrictions</h2>
        <p>You may not use our service to:</p>
        <ul>
          <li>Generate harmful or illegal content</li>
          <li>Impersonate others without permission</li>
          <li>Violate intellectual property rights</li>
          <li>Redistribute our voices or technology</li>
        </ul>

        <h2>4. API Usage</h2>
        <p>API access is subject to:</p>
        <ul>
          <li>Rate limiting</li>
          <li>Usage quotas</li>
          <li>API key requirements</li>
        </ul>

        <h2>5. Content Guidelines</h2>
        <p>All content must comply with our content guidelines and applicable laws.</p>

        <h2>6. Modifications</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.</p>

        <h2>7. Contact</h2>
        <p>For questions about these terms, contact legal@verbatts.com</p>
      </div>
    </div>
  );
}