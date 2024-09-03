import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiEdit2, FiSave } from "react-icons/fi";
import { Panel } from "../../components/panel";
import { useUser } from "./hooks/useUser";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { getAllData, saveToLocalStorage } = useUser();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const userData = getAllData("ud") || {
    email: "abc@gmail.com",
    first_name: "abc",
    phone_number: "081234567",
    address: "Abuja ",
    currency: "USD ",
  };

  const formik = useFormik({
    initialValues: {
      email: userData?.user_email,
      first_name: userData?.user_first_name,
      last_name: userData?.user_last_name,
      middle_name: userData?.user_middle_name,
      phone_number: userData?.user_phone_number,
      date_of_birth: userData?.user_dob,
      state_of_origin: userData?.user_state_of_origin,
      address: userData?.user_address,
      Office_address: userData?.office_address,
      password: userData?.user_password,
      user_currency: userData?.user_currency || "",
      // password: userData?.user_currency || "",
    },
    // validationSchema: Yup.object({
    // //   email: Yup.string()
    // //     .email("Invalid email address")
    // //     .required("Email is required"),
    // //   first_name: Yup.string().required("first name is required"),
    // //   last_name: Yup.string().required("last name is required"),
    // //   phone_number: Yup.string().required("Phone number is required"),
    // //   date_of_birth: Yup.string().required("date of birth is required"),
    // //   state_of_origin: Yup.string().required(
    // //     "state of origin is required"
    // //   ),
    // //   office_address: Yup.string().required("address is required"),
    // //   address: Yup.string().required("address is required"),
    // //   user_currency: Yup.string().oneOf(
    // //     ["USD", "EUR", "GBP", "NGN"],
    // //     "Invalid currency"
    // //   ),
    // // }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${baseURL}/update_user/`,
          {
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name,
            middle_name: values.middle_name,
            address: values.address,
            phone_number: values.phone_number,
            date_of_birth: values.date_of_birth,
            office_address: values.office_address,
            state_of_origin: values.state_of_origin,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          showSuccessToast(response?.data?.message);
          try {
            const response = await axios.post(
              `${baseURL}/user_details/`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const userData = response.data.user_data;            
            saveToLocalStorage("ud", userData);
          } catch (error) {
            if (error.response && error.response.status === 401) {
              showErrorToast("Session expired. Please log in again.");
              navigate("/login");
            } else {
              showErrorToast("Failed to load data. Please try again.");
            }
          }
        } else {
          showErrorToast("Oops, error occurred, kindly logout and login again");
          navigate("/login");
        }
      } catch (err) {
        showErrorToast("Oops, session expired, kindly logout and login again");
        // navigate('/login');
      }
      toggleEdit();
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      console.log("Errors:", formik.errors);

      formik.handleSubmit();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Panel
        title="Profile Details"
        amount={`${formik.values.first_name} ${""} ${formik.values.last_name}`}
        icon={
          isEditing ? (
            <button onClick={toggleEdit}>
              <FiSave className="text-green-500" size={20} />
            </button>
          ) : (
            <button onClick={toggleEdit}>
              <FiEdit2 className="text-blue-500" size={20} />
            </button>
          )
        }
        color="from-cyan-500 to-cyan-400"
      />
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name *
          </label>
          <input
            type="text"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.first_name && formik.touched.first_name && (
            <p className="text-red-500">{formik.errors.first_name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name *
          </label>
          <input
            type="text"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.last_name && formik.touched.last_name && (
            <p className="text-red-500">{formik.errors.ast_name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Middle Name
          </label>
          <input
            type="text"
            name="middle_name"
            value={formik.values.user_middle_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.user_middle_name && formik.touched.middle_name && (
            <p className="text-red-500">{formik.errors.middle_name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.phone_number && formik.touched.user_phone_number && (
            <p className="text-red-500">{formik.errors.phone_number}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="date_of_birth"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.date_of_birth}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.date_of_birth && formik.touched.date_of_birth && (
            <p className="text-red-500">{formik.errors.date_of_birth}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            State of origin
          </label>
          <input
            type="text"
            name="state_of_origin"
            value={formik.values.state_of_origin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.state_of_origin && formik.touched.state_of_origin && (
            <p className="text-red-500">{formik.errors.state_of_origin}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.address && formik.touched.address && (
            <p className="text-red-500">{formik.errors.address}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Office Address
          </label>
          <input
            type="text"
            name="office_address"
            value={formik.values.office_address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.office_address && formik.touched.office_address && (
            <p className="text-red-500">{formik.errors.office_address}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Currency
          </label>
          <select
            name="user_currency"
            value={formik.values.user_currency || ""}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            disabled={!isEditing}
          >
            <option value="">Select currency</option> {/* Default option */}
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="NGN">NGN</option>
          </select>
          {formik.errors.currency && formik.touched.currency && (
            <p className="text-red-500">{formik.errors.currency}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password *
          </label>
          <input
            type="text"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}
        </div>
      </form>
    </div>
  );
};
