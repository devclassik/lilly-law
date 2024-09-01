import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Sidebar } from './SideBar';
import { LoadingSpinner } from "./loadingScreen";
import {  RiCloseLine, RiMenuLine } from "react-icons/ri";

export const Layout = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [showLoader, setShowLoader] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (showLoader || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex min-h-screen">
      {isAuthenticated && !loading && (
        <>
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-teal-800 z-20 transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
          >
            <Sidebar />
          </div>

          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
        </>
      )}

      <div className={`flex-1 ${isAuthenticated ? "md:ml-64" : ""} overflow-y-auto p-2`}>
        {children}
      </div>

      {/* Floating Action Button for mobile */}
      {isAuthenticated && (
        <button
          onClick={toggleSidebar}
          className="fixed top-2 right-2 md:hidden bg-primary text-teal-900 p-4 rounded-full shadow-lg z-30"
        >
          <span className="sr-only">Toggle Sidebar</span>
          <div className="w-6 h-6">
            {isSidebarOpen ? <RiCloseLine size={30} /> : <RiMenuLine size={30} />}
          </div>
        </button>
      )}
    </div>
  );
};
