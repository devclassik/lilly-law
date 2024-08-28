import React, { useEffect, useState } from "react";
import { useUser } from "./hooks/useUser";
import { Panel } from "../../components/panel";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/toastUtils";

const mockData = [
  { id: 1, date: "2024-08-01", amount: "$100.00", status: "Completed" },
  { id: 2, date: "2024-08-05", amount: "$50.00", status: "Pending" },
  { id: 3, date: "2024-08-10", amount: "$75.00", status: "Completed" },
  { id: 4, date: "2024-08-15", amount: "$200.00", status: "Failed" },
];

const PaymentHistory = () => {
    const { getAllData } = useUser();
    const [paymentData, setPaymentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_BASE_URL;

  
    const userId = getAllData("ud")?.user_first_name;
  
    useEffect(() => {
      const fetchPaymentHistory = async () => {
        if (!token) {
            showErrorToast("No authentication token found.");
            navigate("/login");
            return;
          }
        try {
          const response = await axios.post(`${baseURL}/deposit_history/`,{},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
        );        
          setPaymentData(response.data.user_deposit_history);
        } catch (err) {
          showErrorToast("Failed to fetch payment history, session expired");
          navigate('/login');
        } finally {
          setLoading(false);
        }
      };
  
      if (userId) {
        fetchPaymentHistory();
      }
    }, [userId]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="p-4 space-y-4">
      <Panel
        title={`${getAllData("ud")?.user_first_name} ${getAllData("ud")?.user_last_name}`}
        amount="Payment History"
        color="from-cyan-500 to-cyan-400"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{payment.date}</td>
                <td className="px-4 py-2 border-b">{payment.amount}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`inline-block px-2 py-1 rounded text-white ${
                      payment.status === "Completed"
                        ? "bg-green-500"
                        : payment.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
