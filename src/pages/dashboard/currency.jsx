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

export const Currency = () => {
  const { getAllData, saveToLocalStorage } = useUser();
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

      user_currency: userData?.user_currency || "",
    },
    validationSchema: Yup.object({
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
          showErrorToast('Oops, error occurred, kindly logout and login again');
          navigate('/login');
        }
      } catch (err) {
        showErrorToast('Oops, session expired, kindly logout and login again');
        // navigate('/login');
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
        title="Select currency"
        amount={`${getAllData("ud")?.user_first_name} ${""} 
            ${getAllData("ud")?.user_first_name
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
