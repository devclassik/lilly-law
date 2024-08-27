// src/pages/dashboard/dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SendFund } from '../sendFun/sendFund';
import { Overview } from './overview';
import { Profile } from './profile';

export const Dashboard = () => {
  return (
    <div className="flex-1">
      <div className="bg-primary-bgYellow p-4 rounded-lg shadow-lg min-h-screen">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="profile" element={<Profile />} />
          <Route path="send-fund" element={<SendFund />} />
        </Routes>
      </div>
    </div>
  );
};
