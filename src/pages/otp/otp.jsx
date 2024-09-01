import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { useUser } from "../dashboard/hooks/useUser";

const OtpVerification = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { getAllData, saveToLocalStorage } = useUser();

  const [countdown, setCountdown] = useState(300);
  const [canRequestOtp, setCanRequestOtp] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanRequestOtp(true);
    }
  }, [countdown]);

  const requestOtp = async () => {
    try {
      if (getAllData("up") === undefined) return;

      const trialLogin = await axios.post(`${baseURL}/login/`, {
        email: getAllData("up")?.email,
        password: getAllData("up")?.password,
      });

      
      if (!trialLogin.data.access_data) return;
      const trialAgain = await trialLogin;
      const otp = await axios.post(
        `${baseURL}/request_otp/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${trialAgain.data.access_data.access}`,
          },
        }
      );
      showSuccessToast(otp.data.message);
      setCountdown(300);
      setCanRequestOtp(false);
    } catch (error) {
      showErrorToast("Failed to request OTP. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: getAllData("up")?.email,
      token: "",
    },
    validationSchema: Yup.object({
      token: Yup.string()
        .length(6, "OTP must be exactly 6 digits")
        .required("OTP is required")
        .matches(/^\d+$/, "OTP must be only digits"),
    }),

    onSubmit: async (values, { setSubmitting, setFieldError }) => {      
      try {
        const response = await axios.post(`${baseURL}/validate_email/`, values);
        showSuccessToast("Account verification successful");
        navigate("/login");
        saveToLocalStorage("ld", response.data);
      } catch (err) {
        showErrorToast("Invalid OTP. Please try again.");
        setFieldError("otp", "Invalid OTP. Please try again.");
      }
      setSubmitting(false);
    },
  }
);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-5">
          <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="token" className="block text-gray-700">
                Enter OTP
              </label>
              <input
                id="token"
                name="token"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.token}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.errors.token && formik.touched.token
                    ? "border-red-500 focus:ring-red-600"
                    : "border-gray-300 focus:ring-blue-600"
                }`}
              />
              {formik.errors.token && formik.touched.token && (
                <p className="text-red-500">{formik.errors.token}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center ${
                formik.isValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-300 text-white"
              }`}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner /> : "Verify OTP"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={requestOtp}
              className={`text-blue-600 hover:underline ${
                canRequestOtp
                  ? "cursor-pointer"
                  : "cursor-not-allowed text-gray-400"
              }`}
              disabled={!canRequestOtp}
            >
              {canRequestOtp
                ? "Request New OTP"
                : `Request new OTP in ${Math.floor(countdown / 60)}:${
                    countdown % 60
                  }`}
            </button>
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
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

export default OtpVerification;
