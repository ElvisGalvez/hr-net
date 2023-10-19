import React from 'react';
import Label from '../../atoms/Label';
import MyDatePicker from '../../atoms/DatePicker';
import PropTypes from 'prop-types';
import './DateField.css';

const DateField = ({ label, id, onChange, value }) => (
  <div className="form-field">
    <div className="form-field-wrapper">
      <Label htmlFor={id}>{label}</Label>
      <div className="datepicker-container">
        <MyDatePicker id={id} onChange={onChange} selectedDate={value} />
      </div>
    </div>
  </div>
);

DateField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
};

export default DateField;
