import { Undo2 } from "lucide-react";
import FooterPageLayout from "./FooterPageLayout";

const Returns = () => {
  return (
    <FooterPageLayout title="Return Policy" icon={Undo2}>
      <p className="text-gray-700 mb-4">
        Products can be returned within 7 days of delivery.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-1">Eligible Returns</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Wrong or damaged products</li>
            <li>Manufacturing defects</li>
            <li>Items not matching description</li>
          </ul>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-1">
            Non-returnable Items
          </h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Used or damaged items</li>
            <li>Hygiene products (earphones, innerwear, etc.)</li>
          </ul>
        </div>

        <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg sm:col-span-2">
          <h3 className="font-semibold text-gray-800 mb-1">
            Return Conditions:
          </h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Product must be unused and in original condition</li>
            <li>All accessories, tags, and packaging must be included</li>
            <li>
              IMEI-based products (mobiles, watches) will undergo verification
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-4 text-gray-700">
        Refunds are initiated after product inspection.
      </p>
    </FooterPageLayout>
  );
};

export default Returns;
