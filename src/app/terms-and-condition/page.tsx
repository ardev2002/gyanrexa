import { Mail } from "lucide-react";

export default function TermsAndCondition() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-base-100 rounded-2xl shadow-lg my-10 border border-base-300">
      <h1 className="text-4xl font-bold text-primary mb-3 text-center">Terms and Conditions</h1>
      <p className="text-center text-sm text-gray-500 mb-8">Last updated: October 12, 2025</p>

      <div className="space-y-6 leading-relaxed text-base-content">
        <p>
          Welcome to <strong>GyanRexa</strong>. By accessing or using our website, you agree to
          be bound by these Terms and Conditions. Please read them carefully before using our
          services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">1. Acceptance of Terms</h2>
        <p>
          By accessing or using GyanRexa, you confirm that you have read, understood, and
          agreed to these Terms and Conditions. If you do not agree, you must discontinue
          using the website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">2. Eligibility</h2>
        <p>
          To use our services, you must be at least 13 years old. By continuing to use our site,
          you represent that you meet this eligibility requirement.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">3. Intellectual Property Rights</h2>
        <p>
          All content on this site, including text, images, graphics, code, and logos, is the
          property of GyanRexa or its respective creators. Unauthorized reproduction or
          distribution of any materials is strictly prohibited.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">4. User Responsibilities</h2>
        <p>
          You agree not to misuse our website or engage in any activity that may disrupt its
          functionality or harm other users. Prohibited actions include spreading malware,
          unauthorized access, or spamming.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">5. Content Accuracy</h2>
        <p>
          While we strive to provide accurate and updated information, GyanRexa does not
          guarantee the completeness or reliability of any content. All information is for
          educational and informational purposes only.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">6. Limitation of Liability</h2>
        <p>
          GyanRexa shall not be held liable for any direct, indirect, incidental, or
          consequential damages arising from your use of the website or reliance on its
          content.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">7. Third-Party Links</h2>
        <p>
          Our website may include links to external sites. We do not endorse or assume any
          responsibility for the content, products, or services offered on these third-party
          websites.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">8. Modifications</h2>
        <p>
          We reserve the right to modify or replace these Terms and Conditions at any time.
          Continued use of the site after updates implies your acceptance of the revised
          terms.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">9. Termination</h2>
        <p>
          We may suspend or terminate your access to the website if you violate these terms or
          engage in behavior deemed harmful to GyanRexa or other users.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">10. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of India. Any
          disputes shall be subject to the jurisdiction of the courts in Assam, India.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">11. Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, please reach out to us:
        </p>
        <div className="font-medium">
          <p className="flex items-center gap-2"><Mail size={18} /> <span>Email: support@gyanrexa.com </span></p>
          🌐 Website: www.gyanrexa.online
        </div>
      </div>
    </div>
  );
}
