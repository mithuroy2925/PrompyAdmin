import { Lock } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 mb-6">
          <Lock className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-slate-400 text-lg">Last updated: March 14, 2026</p>
      </div>

      <div className="prose prose-invert prose-slate max-w-none">
        <div className="bg-[#161925] rounded-2xl p-8 border border-slate-800/50 space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 text-slate-300 space-y-2">
              <li>Create an account or profile</li>
              <li>Submit or share AI prompts</li>
              <li>Interact with other users' content (e.g., liking prompts)</li>
              <li>Contact us for support or feedback</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-300 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience and content</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Communicate with you about updates, security alerts, and support messages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
            <p className="text-slate-300 leading-relaxed">
              We do not share your personal information with third parties except as described in this privacy policy. We may share your information with service providers who perform services on our behalf, or when required by law to protect our rights or the rights of others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p className="text-slate-300 leading-relaxed">
              We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or email transmission is ever fully secure or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Cookies and Tracking</h2>
            <p className="text-slate-300 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
            <p className="text-slate-300 leading-relaxed">
              Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to This Policy</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
