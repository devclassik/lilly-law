import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SendFund } from '../sendFun/sendFund';
import { Overview } from './overview';
import { Profile } from './profile';
import { ComingSoon } from './comingSoon';
import PaymentHistory from './paymentHistory';
import Deposit from './deposit';
import { Currency } from './currency';
import { PasswordReset } from './password';

export const Dashboard = () => {
  return (
    <div className="flex-1">
      <div className="bg-primary-bgYellow p-4 rounded-lg shadow-lg min-h-screen">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/set-currency" element={<Currency />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/settings" element={<ComingSoon />} />
          <Route path="/upload-document" element={<ComingSoon />} />
          <Route path="send-fund" element={<SendFund />} />
        </Routes>
      </div>
    </div>
  );
};
