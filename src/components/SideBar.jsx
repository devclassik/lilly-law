import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RiDashboardLine,
  RiSendPlaneLine,
  RiSettings3Line,
  RiLogoutCircleLine,
  RiBankFill,
  RiHistoryFill,
  RiUser2Fill,
  RiUploadCloudFill,
  RiExchangeDollarLine,
  RiLockPasswordFill,
  RiWallet3Fill
} from "react-icons/ri";
import Logo from "../assets/jpg/logoMain.jpg";
import { useAuth } from "../contexts/AuthContext";
import { navItems } from "./nav-item";

export const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const icons = {
    dashboard: <RiDashboardLine className="mr-3" />,
    deposit: <RiBankFill className="mr-3" />,
    history: <RiHistoryFill className="mr-3" />,
    profile: <RiUser2Fill className="mr-3" />,
    currency: <RiExchangeDollarLine className="mr-3" />,
    upload: <RiUploadCloudFill className="mr-3" />,
    sendFund: <RiSendPlaneLine className="mr-3" />,
    settings: <RiSettings3Line className="mr-3" />,
    password: <RiLockPasswordFill className="mr-3" />,
    wallet: <RiWallet3Fill className="mr-3" />,
    logout: <RiLogoutCircleLine className="mr-3" />,
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-800 text-white rounded-r-lg">
      <div className="flex items-center mb-6">
        <img src={Logo} alt="Logo" className="w-12 h-12" />
        <span className="text-2xl font-bold ml-4">Attorney Chamber</span>
      </div>
      <ul className="space-y-2 flex-1">
        {navItems.map((navItem, index) => (
          <li key={index}>
            <Link
              to={navItem.path}
              className={`flex items-center py-2 px-4 rounded ${
                isActive(navItem.path) ? "bg-gray-700 text-white" : "hover:bg-gray-700"
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
          className="flex items-center py-2 px-4 rounded hover:bg-gray-700 w-full"
        >
          <RiLogoutCircleLine className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};
