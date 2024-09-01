import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { showErrorToast } from "../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import { Panel } from "../../components/panel";
import { useUser } from "./hooks/useUser";
import {
  RiUser2Fill,
  Ri24HoursLine,
  RiTimerFlashLine,
  RiExchangeFundsLine
} from "react-icons/ri";
import { AreaChart } from "../../components/areaChart";
import { CalendarComponent } from "../../components/calendar/calendar";

export const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token, refreshToken, logout } = useAuth();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const { getAllData, setUserData, saveToLocalStorage } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        showErrorToast("No authentication token found.");
        navigate("/login");
        return;
      }

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

        if (response.data.user_data.is_email_verify === false) {
          showErrorToast("Email not verified");
          navigate("/otp");
          return;
        }

        setUserData(response.data.user_data);
        setData(response.data.user_data);
        saveToLocalStorage("ud", response.data.user_data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
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
  }, [
    token,
    refreshToken,

  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }
  const amount = `$${getAllData("ud")?.user_account_balance || "0.00"}`;

  const chartData = [
    { name: "Jan", uv: 4000 },
    { name: "Feb", uv: 3000 },
    { name: "Mar", uv: 2000 },
    { name: "Apr", uv: 2780 },
    { name: "May", uv: 1890 },
    { name: "Jun", uv: 2390 },
    { name: "Jul", uv: 3490 },
  ];
  

  return (
    <div>
      <div className="py-2">
        <Panel
          title="Welcome !"
          subtitle="Manage your profile"
          amount={getAllData("ud")?.user_first_name}
          icon={<RiUser2Fill color="green" />}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
        <Panel
          title="Account Balance"
          subtitle="Last Week"
          amount={amount}
          icon={<FaDollarSign color="red" />}
        />

        <Panel
          title="Sessions"
          amount="74,137"
          icon={<Ri24HoursLine color="red" />}
          color="from-violet-500 to-violet-400"
        />

        <Panel
          title="Time "
          amount="38,085"
          icon={<RiTimerFlashLine color="red" />}
          color="from-blue-500 to-blue-400"
        />

        <Panel
          title="Rate"
          amount="49.10%"
          icon={<RiExchangeFundsLine color="green" />}
          // tailwindStyle="bg-gradient-to-r from-cyan-500 to-cyan-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 mb-6 text-white">
        {/* Calendar */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <AreaChart />
        </div>

        {/* Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <CalendarComponent />
        </div>
      </div>
    </div>
  );
};
