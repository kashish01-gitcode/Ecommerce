import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const payload = JSON.parse(
          atob(token.split(".")[1])
        );

        const userId = payload.id;

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const response = await fetch(
          `${backendUrl}/api/order/userorders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );

        const data = await response.json();

        if (data.success) {
          setOrders(data.orders.reverse());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {loading ? (
        <div className="text-center py-10">
          Loading Orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-50 border rounded-xl p-10 text-center">
          <p className="text-gray-500 text-lg">
            No orders found 😔
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all p-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">
                <div>
                  <p className="font-semibold text-lg">
                    Order #{order._id.slice(-6)}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-5 pt-4 flex justify-between items-center">
                <span className="font-semibold">
                  Total Amount
                </span>

                <span className="text-2xl font-bold">
                  ₹{order.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;