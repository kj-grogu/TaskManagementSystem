import React, { useState } from 'react';

const MyDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <input
      type="date"
      value={selectedDate}
      onChange={handleDateChange}
    />
  );
};

export default MyDatePicker;
