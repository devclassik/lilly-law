import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Spinner } from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

export const Signup = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      address: "",
      phone_number: "",
      date_of_birth: "",
      office_address: "",
      state_of_origin: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      middle_name: Yup.string(),
      address: Yup.string().required("Address is required"),
      phone_number: Yup.number().required("Phone number is required"),
      date_of_birth: Yup.date().required("Date of birth is required"),
      office_address: Yup.string().required("Office address is required"),
      state_of_origin: Yup.string().required("State of origin is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        localStorage.setItem("email", values.email);
        const response = await axios.post(`${baseURL}/register/`, values);
        showSuccessToast("Proceed to verify account");
          navigate("/otp");
      } catch (err) {
        showErrorToast("Ops!, phone humber already exist");
        setFieldError("email", "Signup failed. Please try again.");
      }
      setSubmitting(false);
    },
  });

  const handleEmailBlur = async (event) => {
    const email = event.target.value;
    if (email) {
      try {
        const response = await axios.post(`${baseURL}/check_email/`, { email });

        if (response.data.message === "Email does not exists on record") {
        }
      } catch (error) {
        showErrorToast("This email is already registered");
        formik.setFieldError("email", "This email is already registered");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={(event) => {
                    formik.handleBlur(event);
                    handleEmailBlur(event);
                  }}
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
              <div>
                <label htmlFor="first_name" className="block text-gray-700">
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formik.errors.first_name && formik.touched.first_name
                      ? "border-red-500 focus:ring-red-600"
                      : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {formik.errors.first_name && formik.touched.first_name && (
                  <p className="text-red-500">{formik.errors.first_name}</p>
                )}
              </div>
              <div>
                <label htmlFor="last_name" className="block text-gray-700">
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formik.errors.last_name && formik.touched.last_name
                      ? "border-red-500 focus:ring-red-600"
                      : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {formik.errors.last_name && formik.touched.last_name && (
                  <p className="text-red-500">{formik.errors.last_name}</p>
                )}
              </div>
              <div>
                <label htmlFor="middle_name" className="block text-gray-700">
                  Middle Name
                </label>
                <input
                  id="middle_name"
                  name="middle_name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.middle_name}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-600"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-gray-700">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formik.errors.address && formik.touched.address
                      ? "border-red-500 focus:ring-red-600"
                      : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {formik.errors.address && formik.touched.address && (
                  <p className="text-red-500">{formik.errors.address}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone_number" className="block text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone_number}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formik.errors.phone_number && formik.touched.phone_number
                      ? "border-red-500 focus:ring-red-600"
                      : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {formik.errors.phone_number && formik.touched.phone_number && (
                  <p className="text-red-500">{formik.errors.phone_number}</p>
                )}
              </div>
              <div>
                <label htmlFor="date_of_birth" className="block text-gray-700">
                  Date of Birth
                </label>
                <input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date_of_birth}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formik.errors.date_of_birth && formik.touched.date_of_birth
                      ? "border-red-500 focus:ring-red-600"
                      : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {formik.errors.date_of_birth &&
                  formik.touched.date_of_birth && (
                    <p className="text-red-500">
                      {formik.errors.date_of_birth}
                    </p>
                  )}
              </div>
              <div>
                <label htmlFor="office_address" className="block text-gray-700">
                  Office Address
                </label>
                <input
                  id="office_address"
                  name="office_address"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.office_address}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formik.errors.office_address &&
                    formik.touched.office_address
                      ? "border-red-500 focus:ring-red-600"
                      : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {formik.errors.office_address &&
                  formik.touched.office_address && (
                    <p className="text-red-500">
                      {formik.errors.office_address}
                    </p>
                  )}
              </div>
              <div>
                <label
                  htmlFor="state_of_origin"
                  className="block text-gray-700"
                >
                  State of Origin
                </label>
                <input
                  id="state_of_origin"
                  name="state_of_origin"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state_of_origin}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formik.errors.state_of_origin &&
                    formik.touched.state_of_origin
                      ? "border-red-500 focus:ring-red-600"
                      : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                {formik.errors.state_of_origin &&
                  formik.touched.state_of_origin && (
                    <p className="text-red-500">
                      {formik.errors.state_of_origin}
                    </p>
                  )}
              </div>
              <div>
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
                  <p className="text-red-500">{formik.errors.password}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className={`w-full text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center ${
                formik.isValid ? "bg-blue-600" : "bg-blue-300"
              }`}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner /> : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
