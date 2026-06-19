import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Checkout = () => {
  const { products, cartItems, getCartAmount } =
    useContext(ShopContext);

  const cartProducts = products.filter(
    (product) => cartItems[product._id] > 0
  );

  const shipping = 50;
  const total = getCartAmount() + shipping;

  const handlePayment = async () => {
    try {
      const stripeItems = cartProducts.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
      }));

      // Order data temporary save
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          items: stripeItems,
          amount: total,
        })
      );

      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const response = await fetch(
        `${backendUrl}/api/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems: stripeItems,
          }),
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe session create nahi hua");
      }
    } catch (error) {
      console.log(error);
      alert("Payment Error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">
        Order Summary
      </h1>

      {cartProducts.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartProducts.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b py-3"
            >
              <span>
                {item.name} x {cartItems[item._id]}
              </span>

              <span>
                ₹{item.price * cartItems[item._id]}
              </span>
            </div>
          ))}

          <div className="mt-6 space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{getCartAmount()}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="bg-black text-white w-full py-3 mt-8 rounded"
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;