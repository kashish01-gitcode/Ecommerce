import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["Men", "Women", "Kids"];
const SUB_CATEGORIES = ["Topwear", "Bottomwear", "Winterwear"];

const empty = {
  name: "", description: "", price: "", category: "Men",
  subCategory: "Topwear", sizes: "", bestseller: "false",
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${backendUrl}/api/admin/products`, {
      headers: { token },
    });
    const data = await res.json();
    if (data.success) setProducts(data.products);
  };

  const handleSubmit = async () => {
    const url = editId
      ? `${backendUrl}/api/admin/products/edit`
      : `${backendUrl}/api/admin/products/add`;

    const body = editId ? { ...form, productId: editId } : form;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify(body),
    });

    setForm(empty);
    setEditId(null);
    setShowForm(false);
    fetchProducts();
  };

  const handleDelete = async (productId) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`${backendUrl}/api/admin/products/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({ productId }),
    });
    fetchProducts();
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      subCategory: p.subCategory,
      sizes: p.sizes.join(", "),
      bestseller: String(p.bestseller),
    });
    setEditId(p._id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={() => { setShowForm(!showForm); setEditId(null); setForm(empty); }}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white border rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="font-semibold mb-4">{editId ? "Edit Product" : "Add Product"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Name", key: "name" },
              { label: "Price", key: "price", type: "number" },
              { label: "Sizes (comma separated)", key: "sizes" },
              { label: "Description", key: "description" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="text-sm text-gray-600 block mb-1">{label}</label>
                <input
                  type={type || "text"}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="border rounded w-full px-3 py-2 text-sm"
                />
              </div>
            ))}
            <div>
              <label className="text-sm text-gray-600 block mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border rounded w-full px-3 py-2 text-sm"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Sub Category</label>
              <select
                value={form.subCategory}
                onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
                className="border rounded w-full px-3 py-2 text-sm"
              >
                {SUB_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Bestseller</label>
              <select
                value={form.bestseller}
                onChange={(e) => setForm({ ...form, bestseller: e.target.value })}
                className="border rounded w-full px-3 py-2 text-sm"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-black text-white px-6 py-2 rounded"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      )}

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p._id} className="bg-white border rounded-xl p-4 shadow-sm flex justify-between items-center">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-500">
                {p.category} • {p.subCategory} • ₹{p.price}
              </p>
              {p.bestseller && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                  Bestseller
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="border px-3 py-1 rounded text-sm hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;