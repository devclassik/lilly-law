// src/pages/dashboard/Overview.js
import React from 'react';
import { Icon } from '@iconify/react';
import accountBalanceIcon from '@iconify-icons/mdi/currency-usd';
import historyIcon from '@iconify-icons/mdi/history';
import transactionsIcon from '@iconify-icons/mdi/cash-multiple';
import settingsIcon from '@iconify-icons/mdi/cog';

export const Overview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Account Balance Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="flex-shrink-0 bg-blue-500 text-white p-4 rounded-full">
          <Icon icon={accountBalanceIcon} className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">Account Balance</h3>
          <p className="text-gray-600 mt-1">$12,345.67</p>
        </div>
      </div>
      
      {/* History Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="flex-shrink-0 bg-green-500 text-white p-4 rounded-full">
          <Icon icon={historyIcon} className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">History</h3>
          <p className="text-gray-600 mt-1">Last transactions</p>
        </div>
      </div>
      
      {/* Transactions Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="flex-shrink-0 bg-red-500 text-white p-4 rounded-full">
          <Icon icon={transactionsIcon} className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">Recent Transactions</h3>
          <p className="text-gray-600 mt-1">View recent transactions</p>
        </div>
      </div>
      
      {/* Settings Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="flex-shrink-0 bg-yellow-500 text-white p-4 rounded-full">
          <Icon icon={settingsIcon} className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">Settings</h3>
          <p className="text-gray-600 mt-1">Account settings</p>
        </div>
      </div>
    </div>
  );
};
