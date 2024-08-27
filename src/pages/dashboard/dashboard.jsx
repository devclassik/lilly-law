import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../../components/SideBar';
import { SendFund } from '../sendFun/sendFund';
import { Overview } from './overview';
import { Profile } from './profile';

export const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-bgY">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="bg-primary-bgYellow p-4 rounded-lg shadow-lg">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/send-fund" element={<SendFund />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
