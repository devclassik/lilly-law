import React, { useEffect, useState } from "react";
// import { useUser } from "./hooks/useUser";
// import { Panel } from "../../components/panel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../../../contexts/AuthContext";
import { showErrorToast } from "../../../utils/toastUtils";
import { Panel } from "../../../components/panel";
// import { useAuth } from "../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { showErrorToast } from "../../utils/toastUtils";

// Example client data structure for testing purposes
const mockClientData = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
  { id: 3, name: "Michael Johnson", email: "michael.johnson@example.com", status: "Pending" },
  { id: 4, name: "Emily Davis", email: "emily.davis@example.com", status: "Active" },
];

export const Clients = () => {
  const { getAllData } = useUser();
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const userId = getAllData("ud")?.user_first_name;

  useEffect(() => {
    const fetchClientData = async () => {
      if (!token) {
        showErrorToast("No authentication token found.");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.post(
          `${baseURL}/list_all_users/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClientData(response.data.all_user || mockClientData); // Update data key based on your API response        
      } catch (err) {
        console.error("Failed to fetch client data:", err);
        setError("Failed to fetch client data, session expired.");
        showErrorToast("Failed to fetch client data, session expired.");
        // navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchClientData();
    } else {
      setLoading(false);
    }
  }, [userId, baseURL, navigate, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 space-y-4">
      <Panel
        title={`${getAllData("ud")?.user_first_name} ${getAllData("ud")?.user_last_name}`}
        amount="Clients"
        color="from-blue-500 to-blue-400" // Update the color if needed
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {clientData.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{client.first_name} {client.last_name}</td>
                <td className="px-4 py-2 border-b">{client.phone_number}</td>
                <td className="px-4 py-2 border-b">{client.email }</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`inline-block px-2 py-1 rounded text-white w-24 text-center ${
                      client.is_active === "true"
                        ? "bg-green-500"
                        : client.is_active === "false"
                        ? "bg-gray-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {client.status}
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
