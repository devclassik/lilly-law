import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Login } from "./pages/login/login";
import { Signup } from "./pages/signup/signup";
import { Dashboard } from "./pages/dashboard/dashboard";
import OtpVerification from "./pages/otp/otp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Layout} from "./components/layout";


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
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
