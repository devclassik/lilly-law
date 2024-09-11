import React, { useEffect, useState } from "react";
import { Panel } from "../../components/panel";
import { useUser } from "./hooks/useUser";
import { showErrorToast } from "../../utils/toastUtils";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { RiUser3Line, RiBankCard2Line } from "react-icons/ri";

const Deposit = () => {
  const { token } = useAuth();
  const { getAllData } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState([]);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

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

    if (getAllData("ud")?.user_first_name && token) {
      makePayment();
    } else {
      setLoading(false);
    }
  }, [token]); // You can try adding getAllData("ud") as a dependency as well.

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <Panel
        title={`${getAllData("ud")?.user_first_name} ${
          getAllData("ud")?.user_last_name
        }`}
        amount="Deposit"
        icon={<RiUser3Line color="red" />}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 mb-6 text-white">
      <Panel
        title="ACCESS BANK"
        subtitleB="Dollar Account"
        subtitle="VICTOR CHINWUBA CHATTERED ATTORNEYS"
        amount="0806237741"
        icon={<RiBankCard2Line color="red" />}
      />
      <Panel
        title="ACCESS BANK PLC"
        subtitle="VICTOR CHINWUBA CHATTERED ATTORNEYS"
        subtitleB="Dollar Account"
        amount="36145842"
        icon={<RiBankCard2Line color="red" />}
      />
      {/* <Panel
        title="ACCESS BANK PLC"
        subtitle="VICTOR CHINWUBA CHATTERED ATTORNEYS"
        amount="36145842"
        icon={<RiBankCard2Line color="red" />}
      /> */}
      </div>
    </div>
  );
};

export default Deposit;
