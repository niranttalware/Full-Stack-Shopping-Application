import { FileText } from "lucide-react";
import FooterPageLayout from "./FooterPageLayout";

const TermsCondition = () => {
  return (
    <FooterPageLayout title="Terms & Conditions" icon={FileText}>
      <p className="text-gray-700 leading-6 mb-4">
        By accessing MyShop, you agree to follow these policies.
      </p>

      <div className="space-y-4">
        <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
          <h3 className="font-semibold">User Responsibilities</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1 mt-1">
            <li>Use real & updated personal details</li>
            <li>Valid payment information</li>
            <li>Use website lawfully</li>
          </ul>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
          <h3 className="font-semibold">Product & Pricing</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1 mt-1">
            <li>Prices may change anytime</li>
            <li>Minor display differences may occur</li>
            <li>No liability for manufacturer packaging variations</li>
          </ul>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
          <h3 className="font-semibold">Order & Cancellation</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1 mt-1">
            <li>Fraudulent orders can be cancelled</li>
            <li>Refunds follow standard timelines</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
        <h3 className="font-semibold">Warranty & Service</h3>
        <ul className="list-disc ml-5 text-gray-700 space-y-1 mt-1">
          <li>Warranty is provided directly by the manufacturer</li>
          <li>MyShop assists in connecting customers to service centers</li>
          <li>Warranty claims require valid invoices</li>
        </ul>
      </div>

      <p className="text-gray-700 mt-4">
        All trademarks, logos, and product images are owned by their respective
        brands.
      </p>

      <p className="mt-4 text-gray-700">
        Questions?{" "}
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

export default TermsCondition;
