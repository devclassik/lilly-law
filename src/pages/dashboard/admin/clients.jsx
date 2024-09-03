import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../../../contexts/AuthContext";
import { showErrorToast } from "../../../utils/toastUtils";
import { Panel } from "../../../components/panel";

export const Clients = () => {
  const { getAllData, saveToLocalStorage } = useUser();
  const [clientData, setClientData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const userId = getAllData("ud")?.user_first_name;
  const itemsPerPage = 10;

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
        setClientData(response.data.all_user);
        saveToLocalStorage("clientData", response.data.all_user);
      } catch (err) {
        console.error("Failed to fetch client data:", err);
        setError("Failed to fetch client data, session expired.");
        showErrorToast("Failed to fetch client data, session expired.");
        navigate("/login");
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

  useEffect(() => {
    const filtered = clientData.filter(client =>
      client?.first_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      client?.last_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      client?.email?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, clientData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (client) => {
    console.log(client);
    
    // Save the selected client data to localStorage or state
    saveToLocalStorage("selectedClient", client);
    navigate(`/dashboard/edit-client/${client.id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 space-y-4">
      <Panel
        title={`${getAllData("ud")?.user_first_name} ${getAllData("ud")?.user_last_name}`}
        amount="Clients"
        color="from-blue-500 to-blue-400"
      />
      <input
        type="text"
        placeholder="Search clients..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {currentData.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{client.first_name} {client.last_name}</td>
                <td className="px-4 py-2 border-b">{client.phone_number}</td>
                <td className="px-4 py-2 border-b">{client.email}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`inline-block px-2 py-1 rounded text-white w-24 text-center ${
                      client.email_verification === "true"
                        ? "bg-green-500"
                        : client.email_verification === "false"
                        ? "bg-gray-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {client.is_active}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEdit(client)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
