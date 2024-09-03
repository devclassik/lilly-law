import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Panel } from "../../../components/panel";
import { FiEdit2, FiSave } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { Spinner } from "../../../components/Spinner";

export const EditClient = () => {
  const { getAllData } = useUser();
  const { token } = useAuth();
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const selectedClient = getAllData("selectedClient");
    if (selectedClient && selectedClient.id === parseInt(id)) {
      setClient(selectedClient);
    } else {
      // Fetch client data if not available in localStorage (optional)
    }
  }, [id]);

  const handleSave = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseURL}/update_client/`, client,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        showSuccessToast(response?.data?.message);
        navigate("/dashboard/client");
      } else {
        showErrorToast("Oops, error occurred, kindly logout and login again");
        // navigate("/login");
      }
    } catch (error) {
      showErrorToast("Oops, session expired, kindly logout and login again");
      navigate("/login");
    }
    setLoading(false);
  };

  if (!client) return <p>Loading client data...</p>;

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      console.log("Errors:");

      handleSave();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Panel
        title="Edit Profile Details"
        amount={`${client.first_name} ${client.last_name}`}
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
      <form className="bg-white p-4 rounded-lg shadow-md" onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name *
          </label>
          <input
            type="text"
            name="first_name"
            value={client.first_name}
            onChange={(e) =>
              setClient({ ...client, first_name: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name *
          </label>
          <input
            type="text"
            name="last_name"
            value={client.last_name}
            onChange={(e) =>
              setClient({ ...client, last_name: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Middle Name
          </label>
          <input
            type="text"
            name="middle_name"
            value={client.middle_name}
            onChange={(e) =>
              setClient({ ...client, middle_name: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            value={client.phone_number}
            onChange={(e) =>
              setClient({ ...client, phone_number: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="text"
            name="date_of_birth"
            value={client.date_of_birth}
            onChange={(e) =>
              setClient({ ...client, date_of_birth: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            State of origin
          </label>
          <input
            type="text"
            name="state_of_origin"
            value={client.state_of_origin}
            onChange={(e) =>
              setClient({ ...client, state_of_origin: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address{" "}
          </label>
          <input
            type="text"
            name="address"
            value={client.address}
            onChange={(e) => setClient({ ...client, address: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Office Address
          </label>
          <input
            type="text"
            name="office_address"
            value={client.office_address}
            onChange={(e) =>
              setClient({ ...client, office_address: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Currency
          </label>
          <select
            name="user_currency"
            value={client.user_currency || ""}
            onChange={(e) =>
              setClient({ ...client, user_currency: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="NGN">NGN</option>
          </select>
        </div>
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
          Password *
          </label>
          <input
            type="text"
            name="password"
            value={client.password}
            onChange={(e) =>
              setClient({ ...client, password: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div> */}

        {/* <div>
          <label>Email</label>
          <input
            type="email"
            value={client.email}
            className="border p-2"
            // Handle changes and updates
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            value={client.phone_number}
            className="border p-2"
            // Handle changes and updates
          />
        </div> */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? <Spinner /> : "Update"}{" "}
        </button>
      </form>
    </div>
  );
};
