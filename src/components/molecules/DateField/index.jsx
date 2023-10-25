import React from 'react';
import { isValid, parseISO } from 'date-fns';
import Label from '../../atoms/Label';
import MyDatePicker from '../../atoms/DatePicker';
import PropTypes from 'prop-types';
import './DateField.css';

const DateField = ({ label, id, onChange, value }) => {
  
  const handleDateChange = (date) => {
    if (!date || isValid(date)) {
      onChange(date);
    } else {
      console.error('Date invalide');
    }
  };

  const selectedDate = typeof value === 'string' ? parseISO(value) : value;

  return (
    <div className="form-field">
      <div className="form-field-wrapper">
        <Label htmlFor={id}>{label}</Label>
        <div className="datepicker-container">
          <MyDatePicker id={id} onChange={handleDateChange} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

DateField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
};

export default DateField;
