import { LifeBuoy } from "lucide-react";
import FooterPageLayout from "./FooterPageLayout";

const HelpCenter = () => {
  return (
    <FooterPageLayout title="Help Center" icon={LifeBuoy}>
      <p className="text-gray-700 leading-6">
        Welcome to the MyShop Help Center. Here you can find answers to the most
        common questions about orders, delivery, returns, payments, and account
        support.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {[
          "Track your order",
          "Update or cancel an order",
          "Payment issues & resolutions",
          "Return, refund & replacement help",
          "Account login support",
          "Report a product issue",
        ].map((item) => (
          <div
            key={item}
            className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm"
          >
            <p className="text-gray-800">{item}</p>
          </div>
        ))}
      </div>
      <div className="pb-4">
        <h3 className="font-semibold text-gray-800 mt-6 mb-2">
          Popular Help Topics
        </h3>
        <ul className="list-disc ml-5 text-gray-700 space-y-1">
          <li>How to apply a coupon or discount code</li>
          <li>How to change my delivery address</li>
          <li>How to track my refund</li>
          <li>How to check product warranty</li>
        </ul>
      </div>

      <p className="mt-4 text-gray-700">
        Need more help? Contact{" "}
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

export default HelpCenter;
