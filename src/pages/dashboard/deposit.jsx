import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Panel } from "../../components/panel";
import { useUser } from "./hooks/useUser";
import { showErrorToast } from "../../utils/toastUtils";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Deposit = () => {
    const { token } = useAuth();
  const { getAllData } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [paymentData, setPaymentData] = useState([]);


  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const userId = getAllData("ud")?.user_first_name;
  
  useEffect(() => {
    const makePayment = async () => {
      if (!token) {
          showErrorToast("No authentication token found.");
          navigate("/login");
          return;
        }
      try {
        const response = await axios.post(`${baseURL}/deposit_accounts/`,{},
          {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
      );
      console.log('res', response.data.account_to_deposit);
              
        setPaymentData(response.data.account_to_deposit);
      } catch (err) {
        showErrorToast("Failed to fetch payment history, session expired");
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      makePayment();
    }
  }, [userId]);

  return (
    <div className="p-4 space-y-4">
      <Panel
        title={`${getAllData("ud")?.user_first_name} ${
          getAllData("ud")?.user_last_name
        }`}
        amount="Deposit"
        color="from-cyan-500 to-cyan-400"
      />
      <Panel
        title="Agip Bank"
        amount="09876543"
        color="from-violet-500 to-violet-400"
      />

      {/* <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Deposit Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              formik.errors.amount && formik.touched.amount
                ? "border-red-500"
                : ""
            }`}
            placeholder="Enter amount"
          />
          {formik.errors.amount && formik.touched.amount && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.amount}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-300"
        >
          {formik.isSubmitting ? "Submitting..." : "Deposit"}
        </button>
      </form> */}
    </div>
  );
};

export default Deposit;
