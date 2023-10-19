import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.css';  
import PropTypes from 'prop-types';

const MyDatePicker = ({ id, onChange, selectedDate }) => (
  <DatePicker id={id} selected={selectedDate} onChange={onChange} popperPlacement="left-start" />
);

MyDatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
};

export default MyDatePicker;  
