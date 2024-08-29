import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { showInfoToast } from '../../utils/toastUtils';

export const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (newDate) => {
    setDate(newDate);
    showInfoToast(`Date selected: ${newDate.toDateString()}`);
  };

  return (
    <div className="calendar-container">
      <Calendar 
        onChange={onDateChange} 
        value={date} 
        className={`!w-full`}
      />
    </div>
  );
};

