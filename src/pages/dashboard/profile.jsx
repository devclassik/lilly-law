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
  const { getAllData } = useUser();
  const { token,  } = useAuth();
  const navigate = useNavigate();


  const [isEditing, setIsEditing] = useState(false);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const userData = getAllData("ud") || {
    user_email: "abc@gmail.com",
    user_first_name: "abc",
    user_phone_number: "081234567",
    user_address: "Abuja ",
    user_currency: "USD ",
  };

  const formik = useFormik({
    initialValues: {
      user_email: userData?.user_email,
      user_first_name: userData?.user_first_name,
      user_last_name: userData?.user_last_name,
      user_middle_name: userData?.user_middle_name,
      user_phone_number: userData?.user_phone_number,
      user_dob: userData?.user_dob,
      user_state_of_origin: userData?.user_state_of_origin,
      user_address: userData?.user_address,
      user_currency: userData?.user_currency || "",
    },
    validationSchema: Yup.object({
      user_email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      user_first_name: Yup.string().required("first name is required"),
      user_last_name: Yup.string().required("last name is required"),
      user_phone_number: Yup.string().required("Phone number is required"),
      user_dob: Yup.string().required("date of birth is required"),
      user_state_of_origin: Yup.string().required(
        "state of origin is required"
      ),
      user_address: Yup.string().required("address is required"),
      user_currency: Yup.string().oneOf(
        ["USD", "EUR", "GBP", "NGN"],
        "Invalid currency"
      ),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${baseURL}/set_currency/`,
          {
            currency: values.user_currency,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.staus) {
          showSuccessToast(response.data.message);
        } else {
          showErrorToast('Oops, session expired, kindly logout and login again');
          navigate('/login');
        }
      } catch (err) {
        showErrorToast('Oops, session expired, kindly logout and login again');
        navigate('/login');
      }
      toggleEdit();
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      console.log("Submitting form...");

      console.log("Errors:", formik.errors);

      formik.handleSubmit();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Panel
        title="Profile Details"
        amount={`${formik.values.user_first_name} ${""} ${
          formik.values.user_last_name
        }`}
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
            name="user_first_name"
            value={formik.values.user_email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.user_email && formik.touched.user_email && (
            <p className="text-red-500">{formik.errors.user_email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name *
          </label>
          <input
            type="text"
            name="user_first_name"
            value={formik.values.user_first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.user_first_name && formik.touched.user_first_name && (
            <p className="text-red-500">{formik.errors.user_first_name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name *
          </label>
          <input
            type="text"
            name="user_last_name"
            value={formik.values.user_last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.user_last_name && formik.touched.user_last_name && (
            <p className="text-red-500">{formik.errors.user_last_name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Middle Name
          </label>
          <input
            type="text"
            name="user_middle_name"
            value={formik.values.user_middle_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.user_middle_name &&
            formik.touched.user_middle_name && (
              <p className="text-red-500">{formik.errors.user_middle_name}</p>
            )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            name="user_phone_number"
            value={formik.values.user_phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.user_phone_number &&
            formik.touched.user_phone_number && (
              <p className="text-red-500">{formik.errors.user_phone_number}</p>
            )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="user_dob"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.user_dob}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.user_dob && formik.touched.user_dob && (
            <p className="text-red-500">{formik.errors.user_dob}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            State of origin
          </label>
          <input
            type="text"
            name="email"
            value={formik.values.user_state_of_origin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.user_state_of_origin &&
            formik.touched.user_state_of_origin && (
              <p className="text-red-500">
                {formik.errors.user_state_of_origin}
              </p>
            )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="user_address"
            value={formik.values.user_address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            readOnly={!isEditing}
          />
          {formik.errors.user_address && formik.touched.user_address && (
            <p className="text-red-500">{formik.errors.user_address}</p>
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
      </form>
    </div>
  );
};
