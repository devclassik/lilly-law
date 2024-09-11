
import React from "react";

export const Panel = ({
  title,
  subtitle,
  subtitleB,
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
          <>
          <div className="text-sm text-black/50 mt-1">{subtitle}</div>
          <div className="text-sm text-black/50 mt-1">{subtitleB}</div>
          </>
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
