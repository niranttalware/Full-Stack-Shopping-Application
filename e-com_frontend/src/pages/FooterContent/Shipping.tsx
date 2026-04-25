import { Truck } from "lucide-react";
import FooterPageLayout from "./FooterPageLayout";

const Shipping = () => {
  return (
    <FooterPageLayout title="Shipping Information" icon={Truck}>
      <p className="text-gray-700 leading-6 mb-4">
        We offer fast and reliable shipping across India.
      </p>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-1">
            Delivery Timelines
          </h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Standard: 3–6 business days</li>
            <li>Express (Metro): 1–3 business days</li>
            <li>Free delivery on selected products</li>
            <li>
              Deliveries may be delayed during holidays or lockdown restrictions
            </li>
          </ul>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-1">Order Processing</h3>
          <p className="text-gray-700">
            Orders are processed within 24 hours. Slight delays may occur during
            high demand.
          </p>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-1">
            Packaging & Safety
          </h3>
          <p className="text-gray-700">
            All items are securely packed to avoid transit damage. In rare cases
            where damage occurs, please report it within 48 hours of delivery.
          </p>
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default Shipping;
