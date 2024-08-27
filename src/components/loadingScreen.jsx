// src/components/Spinner.js
import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin border-4 border-t-4 border-green-700 border-t-primary rounded-full w-16 h-16"></div>
    </div>
  );
};

