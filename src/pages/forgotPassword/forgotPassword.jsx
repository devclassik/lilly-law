import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { useUser } from "../dashboard/hooks/useUser";

const ForgotPassword = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { saveToLocalStorage } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await axios.post(`${baseURL}/forgot_password/`, values);
        
        if (response.data.success) {
          showSuccessToast("Check your email for password reset instructions.");
          saveToLocalStorage("forgot_password", values.email);
          navigate("/login");
        } else {
          setFieldError("email", "An error occurred. Please try again.");
          showErrorToast("An error occurred. Please try again.");
        }
      } catch (err) {
        setFieldError("email", "Invalid email. Please try again.");
        showErrorToast("Invalid email. Please try again.");
      }
      setSubmitting(false);
    },
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-5">
          <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Enter Email
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
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center ${
                formik.isValid
                  ? "bg-blue-600"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner /> : "Reset Password"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600 mt-4">
              Remembered your password?{" "}
              <a href="/login" className="text-blue-600">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

