import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  ShoppingBag,
  Smartphone,
  Shirt,
} from "lucide-react";

export const categoryTree = {
  Electronics: [
    { name: "Smartphones", path: "/category/Smartphones" },
    { name: "Laptops", path: "/category/Laptops" },
    { name: "Earphones", path: "/category/Earphones" },
    { name: "Smartwatches", path: "/category/Smartwatches" },
    { name: "Accessories & Gadgets", path: "/category/Accessories & Gadgets" },
    { name: "see all..", path: "/main/Electronics" },
  ],

  MensWear: [
    { name: "Traditional", path: "/category/Traditional" },
    { name: "Western", path: "/category/Western" },
    { name: "Casual & Formal", path: "/category/Casual & Formal" },
    { name: "Jackets", path: "/category/Jackets" },
    { name: "Shoes", path: "/category/Shoes" },
    { name: "See all..", path: "/main/MensWear" },
  ],
};

/* ICONS */
const mainCategoryIcons: Record<string, React.ReactNode> = {
  Electronics: <Smartphone className="w-4 h-4 text-blue-600" />,
  MensWear: <Shirt className="w-4 h-4 text-red-600" />,
};

/* ------------------------------------------
   Add onClose prop here
------------------------------------------- */
const CategoryTree: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [openMain, setOpenMain] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const rawPath = decodeURIComponent(location.pathname || "");
  const currentPath = rawPath.replace(/\/$/, "");

  return (
    <div>
      <h3 className="text-gray-800 font-bold text-sm mb-4 uppercase tracking-wide flex items-center gap-2">
        <ShoppingBag className="w-4 h-4" />
        Shop Categories
      </h3>

      {Object.entries(categoryTree).map(([mainCat, subCats]) => {
        const isMainActive = subCats.some(
          (s) => currentPath === s.path.replace(/\/$/, "")
        );

        return (
          <div key={mainCat} className="mb-2">
            {/* MAIN CATEGORY BUTTON */}
            <button
              onClick={() =>
                setOpenMain({ ...openMain, [mainCat]: !openMain[mainCat] })
              }
              className={`flex justify-between items-center w-full text-left px-1 py-1 font-semibold transition-all
                ${isMainActive ? "text-indigo-600" : "text-gray-700"}`}
            >
              <span className="flex items-center gap-2">
                {mainCategoryIcons[mainCat]}
                {mainCat}
              </span>

              {openMain[mainCat] ? (
                <ChevronDown className="w-5 h-5 mt-1" />
              ) : (
                <ChevronRight className="w-4 h-4 mt-1" />
              )}
            </button>

            {/* SUB CATEGORY DROPDOWN */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openMain[mainCat] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="pl-2 mt-2 space-y-1 text-sm">
                {subCats.map((sub) => {
                  const active = currentPath === sub.path.replace(/\/$/, "");

                  return (
                    <li key={sub.name}>
                      <Link
                        to={sub.path}
                        onClick={onClose} // ⭐ CLOSE SIDEBAR AUTOMATICALLY
                        className={`block px-2 py-1 rounded-md transition-all
                          ${
                            active
                              ? "bg-cyan-600 text-white font-semibold"
                              : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                          }`}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryTree;
