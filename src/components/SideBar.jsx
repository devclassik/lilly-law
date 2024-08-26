import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMoneyBillAlt,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../assets/jpg/logoMain.jpg";
import { useAuth } from "../contexts/AuthContext";
import { navItems } from "./nav-item"; // Ensure navItems matches the icons you're using
import {
  RiDashboardLine,
  RiSendPlaneLine,
  RiSettings3Line,
  RiLogoutCircleLine,
} from "react-icons/ri"; // Import specific icons

export const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const icons = {
    dashboard: <RiDashboardLine className="mr-3" />,
    sendFund: <RiSendPlaneLine className="mr-3" />,
    settings: <RiSettings3Line className="mr-3" />,
    logout: <RiLogoutCircleLine className="mr-3" />,
  };

  return (
    <div className="w-[20%] bg-gray-800 text-white h-screen p-4 flex flex-col rounded-r-lg">
      <div className="flex items-center mb-6">
        <img src={Logo} alt="Logo" className="w-12 h-12" />
        <span className="text-2xl font-bold ml-4 hidden md:block">
          Athony Chamber
        </span>
      </div>
      <ul className="space-y-2 flex-1">
        {navItems.map((navItem, index) => (
          <li key={index}>
            <Link
              to={navItem.path}
              className={`flex items-center py-2 px-4 rounded ${
                location.pathname === navItem.path
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              {icons[navItem.icon]}
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <button
          onClick={logout}
          className={`flex items-center py-2 px-4 rounded hover:bg-gray-700`}
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};
