import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiEdit2, FiSave } from "react-icons/fi";
import { Panel } from "../../components/panel";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "./hooks/useUser";
import { Spinner } from "../../components/Spinner";

export const PasswordReset = () => {
  const { getAllData, saveToLocalStorage } = useUser();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const userData = getAllData("ud") || {
    email: "abc@gmail.com",
    first_name: "abc",
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old password is required"),
      password: Yup.string()
        .min(2, "Password must be at least 2 characters")
        .required("Password is required"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required("Repeat Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${baseURL}/update_password/`,
          {
            old_password: values.oldPassword,
            new_password: values.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          showSuccessToast(response.data.message);
          const userResponse = await axios.post(
            `${baseURL}/user_details/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          saveToLocalStorage("ud", userResponse.data.user_data);
        } else {
          showErrorToast("Error occurred, please log out and log in again");
          navigate("/login");
        }
      } catch (err) {
        showErrorToast("Oops, verify the old password is correct");
      } finally {
        setLoading(false);
        setIsEditing(false);
      }
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      formik.handleSubmit();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Panel
        title="Profile Details"
        amount={`${userData.user_first_name} ${userData.user_last_name}`}
        icon={
          <button onClick={toggleEdit} disabled={loading}>
            {isEditing ? (
              <FiSave className="text-green-500" size={20} />
            ) : (
              <FiEdit2 className="text-blue-500" size={20} />
            )}
          </button>
        }
      />
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md"
      >
        {["oldPassword", "password", "repeatPassword"].map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-sm font-medium text-gray-700">
              {field === "oldPassword" ? "Old Password" : field === "password" ? "Password *" : "Repeat Password *"}
            </label>
            <input
              type={field.includes("Password") ? "password" : "password"}
              name={field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {formik.errors[field] && formik.touched[field] && (
              <p className="text-red-500">{formik.errors[field]}</p>
            )}
            
          </div>
        ))}
        <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
              disabled={loading}
            >
              {loading ? <Spinner /> : 'Update'}
            </button>
          </div>
      </form>
    </div>
  );
};
