import React, { ReactElement, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from './nav-item';


export const NavButton = ({ navItem, Link }) => {
  const { pathname } = useLocation();
  const [checked, setChecked] = useState(false);
  const [nestedChecked, setNestedChecked] = useState([]);

  const handleNestedChecked = (index, value) => {
    const updatedBooleanArray = [...nestedChecked];
    updatedBooleanArray[index] = value;
    setNestedChecked(updatedBooleanArray);
  };

  return (
    <div>
     <ul className="space-y-2 flex-1 bg-red-500">
        <li>hello</li>
      </ul>
    </div>
  );
};
