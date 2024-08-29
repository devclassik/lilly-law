// import React from "react";
// import Dropdown from "./down";

// export const Panel = ({ title, amount, percentage, icon, color }) => (
//   <div className={`panel bg-white ${color} rounded-lg py-2 px-4 text-black/60`}>
//     <div className="flex justify-between">
//       <div className="text-md font-semibold">{title}</div>
//       <div className="dropdown rounded">
//         <Dropdown
//           offset={[0, 5]}
//           placement="bottom-start"
//           btnClassName="hover:opacity-80"
          
//         >
//         </Dropdown>
//       </div>
//     </div>
//     <div className="flex items-center mt-5">
//       <div className="text-3xl font-bold text-black/80">{amount}</div>
//       <div className="badge text-black/60">{percentage}</div>
//     </div>
//     <div className="flex items-center font-semibold mt-5">
//       <svg
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="ltr:mr-2 rtl:ml-2"
//       >
//       </svg>
//       {icon}
//     </div>
//   </div>
// );

import React from "react";

export const Panel = ({
  title,
  subtitle,
  amount,
  tailwindStyle = "",
  icon,
}) => (
  <div
    className={`panel bg-white rounded-lg py-4 px-6 text-black/60 shadow ${tailwindStyle}`}
  >
    <div className="flex justify-between items-center">
      <div>
        <div className="text-lg font-semibold">{title}</div>
        {subtitle && (
          <div className="text-sm text-black/50 mt-1">{subtitle}</div>
        )}
      </div>
      {icon && (
        <div className="flex items-center justify-center bg-gray-200 rounded-full p-2">
          {icon}
        </div>
      )}
    </div>
    <div className="text-3xl font-bold text-black/80 mt-4">{amount}</div>
  </div>
);
