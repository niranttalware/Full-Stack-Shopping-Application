import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { fetchCategoryTree } from "../../api/categories";

const AddProductAdmin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showPreview, setShowPreview] = useState(false);
  const [categoryTree, setCategoryTree] = useState<any>({});

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategoryTree();
      setCategoryTree(data);
    };
    loadCategories();
  }, []);

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    main_category: "",
    category: "",
    image: "",
    rating_rate: "",
    rating_count: "",
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // Auto-fill main category when category changes
    if (name === "category") {
      let detectedMain = "";

      for (const mainCat of Object.keys(categoryTree)) {
        if (categoryTree[mainCat][value]) detectedMain = mainCat;
      }

      const getNextProductNumber = (mainCategory: string, category: string) => {
        const items = categoryTree[mainCategory]?.[category] || [];

        let maxNum = 0;

        items.forEach((item: any) => {
          const id = item.id; // example: ELE-LAP-008
          const parts = id.split("-");
          const num = Number(parts[2]); // "008" → 8
          if (num > maxNum) maxNum = num;
        });

        return maxNum + 1; // next number safely
      };

      let autoId = form.id;

      if (detectedMain && value) {
        const nextNumber = getNextProductNumber(detectedMain, value);

        autoId = generateShortId(detectedMain, value, nextNumber - 1);
      }

      setForm({
        ...form,
        category: value,
        main_category: detectedMain,
        id: autoId,
      });

      return;
    }

    // Auto-generate ID when main_category is manually selected
    if (name === "main_category") {
      setForm({ ...form, main_category: value, category: "", id: "" });
      return;
    }

    // For all other fields
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.id.trim()) newErrors.id = "Product ID is required";
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "Enter valid price";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.image.trim()) newErrors.image = "Image URL is required";
    if (!form.rating_rate) newErrors.rating_rate = "Rating is required";
    if (!form.rating_count) newErrors.rating_count = "Rating count required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const body = {
      id: form.id,
      title: form.title,
      description: form.description,
      price: Number(form.price),
      main_category: form.main_category,
      category: form.category,
      image: form.image,
      rating: {
        rate: Number(form.rating_rate),
        count: Number(form.rating_count),
      },
    };

    const res = await fetch("${import.meta.env.VITE_API_URL}/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success("Product added successfully!");
      navigate("/admin/products");
    }
  };

  const CODE_MAP: Record<string, string> = {
    Smartphones: "SMP",
    Laptops: "LAP",
    Earphones: "EAR",
    Smartwatches: "SMW",
    Accessories: "ACC",
    Traditional: "TRD",
    Western: "WES",
    Casual: "CAS",
    Jackets: "JKT",
    Shoes: "SHO",
  };
  const generateShortId = (
    mainCategory: string,
    category: string,
    existingCount: number,
  ) => {
    const code = (text: string) => text.trim().toUpperCase().slice(0, 3);

    const mainCode = code(mainCategory);
    const catCode = CODE_MAP[category] || code(category);

    const counter = String(existingCount + 1).padStart(3, "0");

    return `${mainCode}-${catCode}-${counter}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* ID */}
        <div>
          <label className="block mb-1 font-semibold">Product ID</label>
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="phone1, lapi3…"
            className="border p-2 w-full"
          />
          {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            className="border p-2 w-full"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        {/* MAIN CATEGORY DROPDOWN */}
        <div>
          <label className="block mb-1 font-semibold">Main Category</label>

          <select
            name="main_category"
            value={form.main_category}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select Main Category</option>

            {Object.keys(categoryTree).map((mainCat) => (
              <option key={mainCat} value={mainCat}>
                {mainCat}
              </option>
            ))}
          </select>

          {errors.main_category && (
            <p className="text-red-500 text-sm">{errors.main_category}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold">Category</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 w-full"
            disabled={!form.main_category}
          >
            <option value="">Select Category</option>

            {form.main_category &&
              Object.keys(categoryTree[form.main_category] || {}).map(
                (subCat) => (
                  <option key={subCat} value={subCat}>
                    {subCat}
                  </option>
                ),
              )}
          </select>

          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* Image URL + Eye Icon */}
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>

          <div className="relative">
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="border p-2 w-full pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="absolute right-2 top-2 text-gray-600"
            >
              {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}

          {showPreview && form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-32 h-32 mt-2 border"
            />
          )}
        </div>

        {/* Rating Rate */}
        <div>
          <label className="block mb-1 font-semibold">Rating (Rate)</label>
          <input
            name="rating_rate"
            value={form.rating_rate}
            onChange={handleChange}
            type="number"
            step="0.1"
            className="border p-2 w-full"
          />
          {errors.rating_rate && (
            <p className="text-red-500 text-sm">{errors.rating_rate}</p>
          )}
        </div>

        {/* Rating Count */}
        <div>
          <label className="block mb-1 font-semibold">Rating Count</label>
          <input
            name="rating_count"
            value={form.rating_count}
            onChange={handleChange}
            type="number"
            className="border p-2 w-full"
          />
          {errors.rating_count && (
            <p className="text-red-500 text-sm">{errors.rating_count}</p>
          )}
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductAdmin;
