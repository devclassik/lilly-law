import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

export const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (newDate) => {
    setDate(newDate);
    alert(`Date selected: ${newDate.toDateString()}`);
  };

  return (
    <div className="calendar-container kalenda">
      <Calendar 
        onChange={onDateChange} 
        value={date} 
        className={`!bg-[#e7e1f5] !rounded-md !w-full`}
      />
    </div>
  );
};

