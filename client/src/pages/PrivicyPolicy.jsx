import React from 'react';
import './main.css'

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-title">Privacy Policy</h1>
      <ol className="privacy-policy-list">
        <li className="privacy-policy-item">
          <h2 className="privacy-policy-item-title">Overview:</h2>
          <p className="privacy-policy-item-content">
            We respect your privacy and are committed to safeguarding your personal information when you visit our website.
          </p>
        </li>
        <li className="privacy-policy-item">
          <h2 className="privacy-policy-item-title">Information Collection:</h2>
          <p className="privacy-policy-item-content">
            We collect basic information like IP addresses, browser types, and referring pages for statistical analysis to enhance user experience. Personal information is voluntarily provided by users during account creation, subscription, or when participating in interactive features.
          </p>
        </li>
        <li className="privacy-policy-item">
          <h2 className="privacy-policy-item-title">Use of Information:</h2>
          <p className="privacy-policy-item-content">
            Personal information is used to personalize your experience, process transactions, and provide tailored content. We may use your email to send you newsletters, updates, and promotional material, with an option to unsubscribe at any time.
          </p>
        </li>
        <li className="privacy-policy-item">
          <h2 className="privacy-policy-item-title">Cookies and Tracking Technologies:</h2>
          <p className="privacy-policy-item-content">
            Our website utilizes cookies and similar tracking technologies to enhance user experience and provide personalized content. Users can control cookie preferences through browser settings but disabling cookies may affect certain features.
          </p>
        </li>
        <li className="privacy-policy-item">
          <h2 className="privacy-policy-item-title">Third-Party Links:</h2>
          <p className="privacy-policy-item-content">
            Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of these sites and encourage users to review their privacy policies.
          </p>
        </li>
        <li className="privacy-policy-item">
          <h2 className="privacy-policy-item-title">Security Measures:</h2>
          <p className="privacy-policy-item-content">
            We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>
        </li>
        <li className="privacy-policy-item">
          <h2 className="privacy-policy-item-title">Data Sharing:</h2>
          <p className="privacy-policy-item-content">
            We do not sell, trade, or transfer your personal information to third parties without your explicit consent, except for trusted service providers assisting in website operation.
          </p>
        </li>
        <li className="privacy-policy-item">
          <h2 className="privacy-policy-item-title">Legal Compliance:</h2>
          <p className="privacy-policy-item-content">
            We may disclose personal information if required by law or in response to lawful requests from public authorities, including meeting national security or law enforcement requirements.
          </p>
        </li>
        <li className="privacy-policy-item">
          <h2 className="privacy-policy-item-title">Children's Privacy:</h2>
          <p className="privacy-policy-item-content">
            Our services are not directed at individuals under the age of 13. We do not knowingly collect or maintain personal information from children.
          </p>
        </li>
        <li className="privacy-policy-item">
          <h2 className="privacy-policy-item-title">Updates to Privacy Policy:</h2>
          <p className="privacy-policy-item-content">
            We reserve the right to update this privacy policy to reflect changes in our practices. Users will be notified of significant changes.
          </p>
        </li>
        <li className="privacy-policy-item">
          <h2 className="privacy-policy-item-title">User Control:</h2>
          <p className="privacy-policy-item-content">
            Users have the right to access, correct, or delete their personal information. Contact our support team for assistance.
          </p>
        </li>
        <li className="privacy-policy-item">
          <h2 className="privacy-policy-item-title">Contact Information:</h2>
          <p className="privacy-policy-item-content">
            For any privacy-related concerns or questions about our policies, please contact our designated privacy officer at <a href="mailto:theeducationpressofficial@gmail.com" className="privacy-policy-contact-link">theeducationpressofficial@gmail.com</a>.
          </p>
        </li>
      </ol>
    </div>
  );
}
