import React from 'react';

export const ComingSoon = () => {
  return (
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
        <p className="text-lg mb-6">
          We're working hard to bring you something amazing! Stay tuned.
        </p>
        <p className="text-base">
          In the meantime, please kindly forward all your documents to
          <a href="mailto:info@vccchartteredattoneychamber.com" className="text-blue-600 underline ml-2">
            info@vccchartteredattoneychamber.com
          </a>
        </p>
    </div>
  );
};
