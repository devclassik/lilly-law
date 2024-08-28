import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Spinner } from "../../components/Spinner";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(2, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await axios.post(`${baseURL}/login/`, {
          email: values.email,
          password: values.password,
        });

        if (response.data.access_data) {
          showSuccessToast("Login successful");
          const { access, refresh } = response.data.access_data;
          console.log( response.data.access_data);
          
            login(access, refresh);
            navigate("/dashboard");
        } else {
          setFieldError(
            "email",
            "Login failed. Please check your credentials."
          );
          setFieldError("password", "");
        }
      } catch (err) {
        showErrorToast("Oops, please check your credentials.");
        setFieldError("email", "Login failed. Please try again.");
        setFieldError("password", "");
      }
      setSubmitting(false);
    },
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center">Attorney Chamber</h2>
          <h4 className="text-lg font-normal mb-6 text-center">Login</h4>
          <form onSubmit={formik.handleSubmit}>
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-center mt-2">
                {formik.errors.email}
              </p>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-500 focus:ring-red-600"
                    : "border-gray-300 focus:ring-blue-600"
                }`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-500 focus:ring-red-600"
                    : "border-gray-300 focus:ring-blue-600"
                }`}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-center mt-2">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-lg flex items-center justify-center ${
                formik.isValid && !formik.isSubmitting
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-300 text-white cursor-not-allowed"
              }`}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner /> : "Login"}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
