// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Login } from "./pages/login/login";
import { Signup } from "./pages/signup/signup";
import { Dashboard } from "./pages/dashboard/dashboard";
import { SendFund } from "./pages/sendFun/sendFund";
import { Sidebar } from "./components/SideBar";
import OtpVerification from "./pages/otp/otp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

// Layout component for authenticated routes
const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Check if user is authenticated

  return (
    <div className="flex min-h-screen">
      {isAuthenticated && <Sidebar />} {/* Render Sidebar if authenticated */}
      <div className={`flex-1 ${isAuthenticated ? "ml-64" : ""}`}>
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <ToastContainer />

      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp" element={<OtpVerification />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/send-fund"
              element={
                <ProtectedRoute>
                  <Layout>
                    <SendFund />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
