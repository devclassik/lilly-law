import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import accountBalanceIcon from "@iconify-icons/mdi/currency-usd";
import historyIcon from "@iconify-icons/mdi/history";
import transactionsIcon from "@iconify-icons/mdi/cash-multiple";
import settingsIcon from "@iconify-icons/mdi/cog";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { showErrorToast } from "../../utils/toastUtils";
import { Link, useNavigate } from "react-router-dom";
import {Panel} from '../../components/panel'

export const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token, refreshToken, logout } = useAuth();
  const navigate = useNavigate();

  const isRtl =

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        showErrorToast("No authentication token found.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/user_details/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data.user_data.is_email_verify === false);

        if (response.data.user_data.is_email_verify === false) {
          showErrorToast("Email not verified");
          navigate("/otp");
          return;
        }

        setData(response.data.user_data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Unauthorized, token might be expired
          showErrorToast("Session expired. Please log in again.");
          logout();
          navigate("/login");
        } else {
          showErrorToast("Failed to load data. Please try again.");
        }
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, refreshToken, navigate, logout]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }
  const amount = `$${data?.user_account_balance || '0.00'}`;


  return (
    <div >
    <ul className="flex space-x-2 rtl:space-x-reverse">
      <li>
        <Link to="#" className="text-primary hover:underline">Welcome </Link>
      </li>
      <li className=" ltr:before:mr-2 rtl:before:ml-2">
        <span> {data.user_first_name}</span>
      </li>
    </ul>

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
      <Panel
        title="Users Visit"
        amount={amount}
        icon="Last Week 44,700"
        color="from-cyan-500 to-cyan-400"
      />

      <Panel
        title="Sessions"
        amount="74,137"
        icon="Last Week 84,709"
        color="from-violet-500 to-violet-400"
      />

      <Panel
        title="Time On-Site"
        amount="38,085"
        icon="Last Week 37,894"
        color="from-blue-500 to-blue-400"
      />

      <Panel
        title="Bounce Rate"
        amount="49.10%"
        icon="Last Week 50.01%"
        color="from-fuchsia-500 to-fuchsia-400"
      />
    </div>
  </div>
);
};
