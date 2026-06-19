import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { getCartCount, token, logout } = useContext(ShopContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/">
          <p>HOME</p>
        </NavLink>

        <NavLink to="/collection">
          <p>COLLECTION</p>
        </NavLink>

        <NavLink to="/about">
          <p>ABOUT</p>
        </NavLink>

        <NavLink to="/contact">
          <p>CONTACT</p>
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="account"
            onClick={() => !token && navigate("/login")}
          />

          {token && showDropdown && (
            <div className="absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-600 rounded shadow-lg border border-gray-100">
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-2xl" />

          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
