import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
          setStatus("error");
          return;
        }

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const response = await fetch(`${backendUrl}/api/payment/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.log("ERROR:", error);
        setStatus("error");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="text-center">
        {status === "verifying" && (
          <p className="text-gray-500 text-lg">Verifying payment...</p>
        )}

        {status === "success" && (
          <>
            <h1 className="text-4xl font-bold text-green-600">
              Payment Successful 🎉
            </h1>
            <p className="mt-4 text-gray-600">
              Thank you for your order. Your payment is confirmed.
            </p>
            <button
              onClick={() => navigate("/orders")}
              className="mt-6 bg-black text-white px-6 py-3 rounded"
            >
              View Orders
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-4xl font-bold text-red-500">
              Something went wrong
            </h1>
            <p className="mt-4 text-gray-600">
              Payment verify nahi hua. Support se contact karo.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;