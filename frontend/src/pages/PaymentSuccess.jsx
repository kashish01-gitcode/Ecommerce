import { useEffect } from "react";

const PaymentSuccess = () => {
  useEffect(() => {
    const saveOrder = async () => {
      try {
        const orderData = JSON.parse(localStorage.getItem("pendingOrder"));

        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const response = await fetch(`${backendUrl}/api/order/place`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: orderData.items,
            amount: orderData.amount,
            userId,
          }),
        });

        const data = await response.json();
        console.log("API Response:", data);

        localStorage.removeItem("pendingOrder");
      } catch (error) {
        console.log("ERROR:", error);
      }
    };

    saveOrder();
  }, []);

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>
        <p className="mt-4">Thank you for your order.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;