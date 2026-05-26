import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";

/* TYPE GUARD → ensures safe grouping */
const isMainCategory = (cat: any): cat is "Electronics" | "MensWear" => {
  return cat === "Electronics" || cat === "MensWear";
};

const ProductsAdmin = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [openMain, setOpenMain] = useState<Record<string, boolean>>({});
  const [openSub, setOpenSub] = useState<Record<string, boolean>>({});

  // Fetch products
  const getProducts = async () => {
    const res = await fetch("${process.env.REACT_APP_API_URL}/api/products");
    const data = await res.json();

    const extracted: any[] = [];

    // Extract products while preserving main_category + category
    Object.entries(data).forEach(([mainCat, subCats]: any) => {
      Object.entries(subCats).forEach(([category, items]: any) => {
        items.forEach((item: any) => {
          extracted.push({
            ...item,
            main_category: mainCat,
            category: category,
          });
        });
      });
    });

    setProducts(extracted);
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const deleteProduct = async () => {
    if (deleteId === null) return;

    const token = localStorage.getItem("token");

    await fetch(`${process.env.REACT_APP_API_URL}/api/products/${deleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Product deleted successfully!");
    setShowDeleteModal(false);
    setDeleteId(null);
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  /* SAFE GROUPING */
  const grouped: Record<"Electronics" | "MensWear", Record<string, any[]>> = {
    Electronics: {},
    MensWear: {},
  };

  products.forEach((p) => {
    const main = p.main_category?.trim();

    if (isMainCategory(main)) {
      if (!grouped[main][p.category]) grouped[main][p.category] = [];
      grouped[main][p.category].push(p);
    }
  });

  const MAIN_CATS: ("Electronics" | "MensWear")[] = ["Electronics", "MensWear"];

  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Link to="add" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          + Add Product
        </Link>
      </div>

      {/* MAIN CATEGORY BLOCKS */}
      {MAIN_CATS.map((mainCat) => {
        const subCats = grouped[mainCat];

        return (
          <div
            key={mainCat}
            className="mb-4 bg-white p-4 rounded-xl shadow border"
          >
            {/* MAIN COLLAPSE */}
            <button
              onClick={() =>
                setOpenMain({ ...openMain, [mainCat]: !openMain[mainCat] })
              }
              className="flex justify-between w-full text-left"
            >
              <h2 className="text-xl font-bold text-gray-800">{mainCat}</h2>

              {openMain[mainCat] ? (
                <ChevronDown size={22} />
              ) : (
                <ChevronRight size={22} />
              )}
            </button>

            {/* SUB-CATEGORIES */}
            {openMain[mainCat] && (
              <div className="mt-3">
                {Object.entries(subCats).map(
                  ([subCat, items]: [string, any[]]) => (
                    <div
                      key={subCat}
                      className="mb-4 border rounded-lg overflow-hidden bg-gray-50"
                    >
                      {/* SUB CATEGORY COLLAPSE */}
                      <button
                        onClick={() =>
                          setOpenSub({
                            ...openSub,
                            [mainCat + subCat]: !openSub[mainCat + subCat],
                          })
                        }
                        className="w-full flex justify-between bg-gray-200 p-3"
                      >
                        <h3 className="text-lg font-semibold">{subCat}</h3>

                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">
                            {items.length} items
                          </span>
                          {openSub[mainCat + subCat] ? (
                            <ChevronDown size={20} />
                          ) : (
                            <ChevronRight size={20} />
                          )}
                        </div>
                      </button>

                      {/* PRODUCT TABLE */}
                      {openSub[mainCat + subCat] && (
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-white">
                              <th className="p-3">ID</th>
                              <th className="p-3">Title</th>
                              <th className="p-3">Price</th>
                              <th className="p-3">Actions</th>
                            </tr>
                          </thead>

                          <tbody>
                            {items.map((p) => (
                              <tr key={p.id} className="border-b text-center">
                                <td className="p-3">{p.id}</td>
                                <td className="p-3">{p.title}</td>
                                <td className="p-3">{p.price}</td>

                                <td className="p-3 flex gap-3 justify-center">
                                  <Link
                                    to={`edit/${p.id}`}
                                    className="text-blue-500 font-bold"
                                  >
                                    Edit
                                  </Link>

                                  <button
                                    onClick={() => confirmDelete(p.id)}
                                    className="text-red-500 font-bold"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl w-[30%] shadow-xl">
            <h2 className="text-xl font-bold flex items-center gap-2 justify-center">
              <AlertTriangle className="text-red-600" /> Confirm Delete
            </h2>
            <p className="text-gray-600 mt-3 mb-5">
              Are you sure you want to delete this product?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={deleteProduct}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsAdmin;
