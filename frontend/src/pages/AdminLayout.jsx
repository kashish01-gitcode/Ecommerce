import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    const role = JSON.parse(atob(token.split(".")[1])).role;
    if (role !== "admin") navigate("/");
  }, []);

  const links = [
    { label: "Dashboard", path: "/admin" },
    { label: "Orders", path: "/admin/orders" },
    { label: "Products", path: "/admin/products" },
    { label: "Users", path: "/admin/users" },
  ];

  return (
    <div className="flex min-h-[80vh] gap-6">
      {/* Sidebar */}
      <div className="w-48 shrink-0">
        <p className="text-xs text-gray-400 uppercase font-semibold mb-3">Admin Panel</p>
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;