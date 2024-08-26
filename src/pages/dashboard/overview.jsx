import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import accountBalanceIcon from '@iconify-icons/mdi/currency-usd';
import historyIcon from '@iconify-icons/mdi/history';
import transactionsIcon from '@iconify-icons/mdi/cash-multiple';
import settingsIcon from '@iconify-icons/mdi/cog';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

export const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { token, refreshToken } = useAuth();

  console.log('token', token, 'refresh', refreshToken);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/overview`, {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'x-refresh-token': refreshToken,
          },
        });
        console.log('hello', response);
        
        setData(response.data);
      } catch (error) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, refreshToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Account Balance Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="flex-shrink-0 bg-blue-500 text-white p-4 rounded-full">
          <Icon icon={accountBalanceIcon} className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">Account Balance</h3>
          <p className="text-gray-600 mt-1">${data.accountBalance}</p>
        </div>
      </div>
      
      {/* History Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="flex-shrink-0 bg-green-500 text-white p-4 rounded-full">
          <Icon icon={historyIcon} className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">History</h3>
          <p className="text-gray-600 mt-1">{data.historySummary}</p>
        </div>
      </div>
      
      {/* Transactions Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="flex-shrink-0 bg-red-500 text-white p-4 rounded-full">
          <Icon icon={transactionsIcon} className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">Recent Transactions</h3>
          <p className="text-gray-600 mt-1">{data.recentTransactionsSummary}</p>
        </div>
      </div>
      
      {/* Settings Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="flex-shrink-0 bg-yellow-500 text-white p-4 rounded-full">
          <Icon icon={settingsIcon} className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">Settings</h3>
          <p className="text-gray-600 mt-1">{data.settingsSummary}</p>
        </div>
      </div>
    </div>
  );
};
