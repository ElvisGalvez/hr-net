import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './SelectField.css';

const SelectField = ({ label, id, options, value, onChange }) => {
  return (
    <div className="select-field-container">
      <label htmlFor={id} className="select-label">{label}</label>
      <Select
        id={id}
        options={options}
        value={options.find(option => option.value === value)}
        onChange={onChange}
        className="custom-select"
        classNamePrefix="custom-select"
      />
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default SelectField;
