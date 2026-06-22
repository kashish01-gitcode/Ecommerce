import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const role = JSON.parse(atob(token.split(".")[1])).role;
    if (role !== "admin") return navigate("/");

    fetch(`${backendUrl}/api/admin/stats`, {
      headers: { token },
    })
      .then((r) => r.json())
      .then((data) => data.success && setStats(data.stats));
  }, []);

  const cards = stats
    ? [
        { label: "Total Users", value: stats.totalUsers, color: "bg-blue-500" },
        { label: "Total Orders", value: stats.totalOrders, color: "bg-green-500" },
        { label: "Total Revenue", value: `₹${stats.totalRevenue}`, color: "bg-yellow-500" },
        { label: "Total Products", value: stats.totalProducts, color: "bg-purple-500" },
      ]
    : [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      {!stats ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div key={card.label} className={`${card.color} text-white rounded-xl p-6 shadow`}>
              <p className="text-sm opacity-80">{card.label}</p>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Manage Orders", path: "/admin/orders", color: "border-green-400" },
          { label: "Manage Products", path: "/admin/products", color: "border-purple-400" },
          { label: "Manage Users", path: "/admin/users", color: "border-blue-400" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`border-l-4 ${item.color} bg-white shadow rounded-xl p-5 text-left hover:shadow-md transition`}
          >
            <p className="font-semibold text-gray-700">{item.label}</p>
            <p className="text-sm text-gray-400 mt-1">Click to manage →</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;