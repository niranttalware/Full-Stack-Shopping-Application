import { Shield } from "lucide-react";
import FooterPageLayout from "./FooterPageLayout";

const PrivacyPolicy = () => {
  return (
    <FooterPageLayout title="Privacy Policy" icon={Shield}>
      <p className="text-gray-700 mb-4">We value and protect your privacy.</p>

      <div className="space-y-3 pb-2">
        {[
          "We never sell your personal data",
          "We only collect essential information",
          "Secure encrypted payments",
          "Cookies improve your shopping experience",
        ].map((item) => (
          <div
            key={item}
            className="p-4 bg-green-50 border border-green-100 rounded-lg"
          >
            <p className="text-gray-800">{item}</p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg sm:col-span-2">
        <h3 className="font-semibold text-gray-800 mb-1">Your Rights</h3>
        <ul className="list-disc ml-5 text-gray-700 space-y-1">
          <li>You can request your data anytime</li>
          <li>You may ask for correction or deletion of your information</li>
          <li>You may opt out of marketing emails anytime</li>
        </ul>
      </div>

      <p className="mt-4">
        For data deletion:{" "}
        <a
          href="mailto:support@myshop.com"
          className="hover:underline text-indigo-600"
        >
          support@myshop.com
        </a>
      </p>
    </FooterPageLayout>
  );
};

export default PrivacyPolicy;
