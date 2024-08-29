import React from "react";
import Dropdown from "./down";

// Define a reusable Panel component
export const Panel = ({ title, amount, percentage, icon, color }) => (
  <div className={`panel bg-white ${color} rounded-lg py-2 px-4 text-black/60`}>
    <div className="flex justify-between">
      <div className="text-md font-semibold">{title}</div>
      <div className="dropdown rounded">
        <Dropdown
          offset={[0, 5]}
          placement="bottom-start"
          btnClassName="hover:opacity-80"
          
        >
        </Dropdown>
      </div>
    </div>
    <div className="flex items-center mt-5">
      <div className="text-3xl font-bold text-black/80">{amount}</div>
      <div className="badge text-black/60">{percentage}</div>
    </div>
    <div className="flex items-center font-semibold mt-5">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ltr:mr-2 rtl:ml-2"
      >
      </svg>
      {icon}
    </div>
  </div>
);