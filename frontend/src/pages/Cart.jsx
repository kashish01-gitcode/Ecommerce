import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const {
    products,
    cartItems,
    getCartAmount,
    addToCart,
    removeFromCart,
    deleteFromCart,
  } = useContext(ShopContext);

  const cartProducts = products.filter(
    (product) => cartItems[product._id] > 0
  );

  return (
    <div className="border-t pt-10">

      <h1 className="text-3xl font-medium mb-8">
        Shopping Cart
      </h1>

      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartProducts.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-5"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image[0]}
                  alt=""
                  className="w-24"
                />

                <div>
                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-gray-500">
                    ₹{item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="border px-3 py-1"
                >
                  -
                </button>

                <span>
                  {cartItems[item._id]}
                </span>

                <button
                  onClick={() => addToCart(item._id)}
                  className="border px-3 py-1"
                >
                  +
                </button>

              </div>

              <button
                onClick={() => deleteFromCart(item._id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-10 max-w-md ml-auto border p-6">

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>₹{getCartAmount()}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Shipping</span>
              <span>₹50</span>
            </div>

            <hr />

            <div className="flex justify-between mt-3 font-bold">
              <span>Total</span>
              <span>
                ₹{getCartAmount() + 50}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
                 className="bg-black text-white w-full py-3"
                 >
                 PROCEED TO CHECKOUT
                </button>

          </div>
        </>
      )}

    </div>
  );
};

export default Cart;