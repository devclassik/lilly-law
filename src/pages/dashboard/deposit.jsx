import React, { useEffect, useState } from "react";
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
        const response = await axios.post(
          `${baseURL}/deposit_accounts/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data?.account_to_deposit) {
          setPaymentData(response.data.account_to_deposit);
        } else {
          showErrorToast("No payment data available.");
        }
      } catch (err) {
        console.error("Failed to fetch payment data:", err);
        showErrorToast("Failed to fetch payment history, session expired.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      makePayment();
    } else {
      setLoading(false);
    }
  }, [userId, baseURL, token, navigate]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading component
  }

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
    </div>
  );
};

export default Deposit;
