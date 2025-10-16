import { Mail } from "lucide-react";
export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-base-100 rounded-2xl shadow-lg my-10 border border-gray-400 dark:border-gray-600">
      <h1 className="text-4xl font-bold text-primary mb-3 text-center">Privacy Policy</h1>
      <p className="text-center text-sm text-gray-500 mb-8">Last updated: October 12, 2025</p>

      <div className="space-y-6 leading-relaxed text-base-content">
        <p>
          At <strong>GyanRexa</strong>, we value your privacy and are committed to protecting
          your personal data. This Privacy Policy explains how we collect, use, and safeguard
          your information when you use our website or services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">1. Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul className="list-disc list-inside">
          <li><strong>Personal Information:</strong> such as your name, email address, or contact details when you sign up or communicate with us.</li>
          <li><strong>Usage Data:</strong> details like your browser type, IP address, and pages visited to improve user experience.</li>
          <li><strong>Cookies:</strong> small files that help us enhance site functionality and remember user preferences.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">2. How We Use Your Information</h2>
        <p>We use your data responsibly for the following purposes:</p>
        <ul className="list-disc list-inside">
          <li>To provide, operate, and maintain our website.</li>
          <li>To improve user experience and website functionality.</li>
          <li>To send you updates, newsletters, or promotional materials (only if you have opted in).</li>
          <li>To respond to your inquiries and support requests.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">3. Data Protection</h2>
        <p>
          We use secure servers, encryption, and limited access protocols to protect your
          personal information. However, no online transmission is entirely risk-free, and
          we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">4. Cookies Policy</h2>
        <p>
          Cookies help us analyze website traffic and improve your experience. You can disable
          cookies anytime through your browser settings, though some site features may not work properly.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">5. Third-Party Services</h2>
        <p>
          We may use third-party tools such as Google Analytics for analytics purposes.
          These services may collect information in accordance with their own privacy policies.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">6. Links to Other Websites</h2>
        <p>
          Our website may contain links to external sites. We are not responsible for the
          content or privacy practices of these websites. Please review their policies separately.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">7. Your Data Rights</h2>
        <p>
          You have the right to request access, correction, or deletion of your data. To
          exercise these rights, please contact us using the information provided below.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">8. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. The revised policy will be posted
          with an updated “Last Updated” date.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">9. Contact Us</h2>
        <p>
          For any questions regarding this Privacy Policy, please contact us at:
        </p>
        <div className="font-medium">
          <p className="flex items-center gap-2"><Mail size={18} /> <span>Email: support@gyanrexa.com </span></p>
          🌐 Website: www.gyanrexa.online
        </div>
      </div>
    </div>
  );
}
