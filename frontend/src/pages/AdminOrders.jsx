import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch(`${backendUrl}/api/admin/orders`, {
      headers: { token },
    });
    const data = await res.json();
    if (data.success) setOrders(data.orders);
    setLoading(false);
  };

  const updateStatus = async (orderId, status) => {
    await fetch(`${backendUrl}/api/admin/orders/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({ orderId, status }),
    });
    fetchOrders();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">₹{order.amount}</span>
                  <select
                    value={order.paymentStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="border-t pt-3 space-y-1">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-gray-600">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;