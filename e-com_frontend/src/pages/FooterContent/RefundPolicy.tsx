import { RotateCcw } from "lucide-react";
import FooterPageLayout from "./FooterPageLayout";

const RefundPolicy = () => {
  return (
    <FooterPageLayout title="Refund Policy" icon={RotateCcw}>
      <p className="text-gray-700">
        Refunds are issued within 3–7 business days depending on payment method.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-teal-50 border border-teal-100 rounded-lg">
          <h3 className="font-semibold mb-1">Refunds Allowed If:</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Product returned successfully</li>
            <li>Order cancelled before shipping</li>
            <li>Product damaged or defective</li>
          </ul>
        </div>

        <div className="p-4 bg-teal-50 border border-teal-100 rounded-lg">
          <h3 className="font-semibold mb-1">Refund Not Applicable For:</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Products damaged after use</li>
            <li>Products returned without original accessories</li>
            <li>Products with visible wear and tear</li>
          </ul>
        </div>
      </div>
      <div className="p-4 bg-teal-50 border border-teal-100 rounded-lg">
        <h3 className="font-semibold mb-1">Refund Timelines:</h3>
        <ul className="list-disc ml-5 text-gray-700 space-y-1">
          <li>UPI / Wallet: 24–72 hours</li>
          <li>Bank Account: 3–5 days</li>
          <li>Credit/Debit Card: 5–7 days</li>
        </ul>
      </div>

      <p className="mt-4 text-gray-700">
        Once processed, refund tracking details will be sent to your email.
      </p>

      <p className="mt-4 text-gray-700">
        Delay? Contact{" "}
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

export default RefundPolicy;
