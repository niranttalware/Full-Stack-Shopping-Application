import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const EditProductAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    const loadProduct = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/products/${id}`,
      );
      const data = await res.json();

      setForm({
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        image: data.image,
        rating_rate: data.rating.rate,
        rating_count: data.rating.count,
      });
    };

    loadProduct();
  }, [id]);

  if (!form) return <p>Loading...</p>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.title.trim()) newErrors.title = "Title required";
    if (!form.description.trim())
      newErrors.description = "Description required";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "Enter valid price";
    if (!form.category.trim()) newErrors.category = "Category required";
    if (!form.image.trim()) newErrors.image = "Image URL required";
    if (!form.rating_rate) newErrors.rating_rate = "Rating required";
    if (!form.rating_count) newErrors.rating_count = "Count required";

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
      category: form.category,
      image: form.image,
      rating: {
        rate: Number(form.rating_rate),
        count: Number(form.rating_count),
      },
    };

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );

    if (res.ok) {
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* ID */}
        <div>
          <label className="block mb-1 font-semibold">Product ID</label>
          <input
            name="id"
            value={form.id}
            disabled
            className="border p-2 w-full bg-gray-200 cursor-not-allowed"
          />
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

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* Image URL + Eye icon */}
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

          {showPreview && (
            <img
              src={form.image}
              alt="preview"
              className="w-32 h-32 mt-2 border"
            />
          )}
        </div>

        {/* Ratings */}
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
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProductAdmin;
