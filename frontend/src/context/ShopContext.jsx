import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // keep localStorage in sync whenever token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const registerUser = async ({ name, email, password }) => {
    try {
      const response = await fetch(`${backendUrl}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        toast.success("Account created!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, try again");
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const response = await fetch(`${backendUrl}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, try again");
    }
  };

  const logout = () => {
    setToken("");
    toast.info("Logged out");
    navigate("/login");
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const getCartCount = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item];
    }
    return total;
  };

  const deleteFromCart = (itemId) => {
  setCartItems((prev) => ({
    ...prev,
    [itemId]: 0,
  }));
};

  const getCartAmount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      const product = products.find(
        (p) => p._id === itemId
      );

      if (product) {
        total += product.price * cartItems[itemId];
      }
    }

    return total;
  };

  const value = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    getCartAmount,
    deleteFromCart,
    token,
    setToken,
    registerUser,
    loginUser,
    logout,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;