import React from 'react';
import PropTypes from 'prop-types';
import './TextField.css';

const TextField = ({ label, id, value, onChange }) => (
  <div className="form-field">
    <div className="form-field-wrapper">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} value={value} onChange={onChange} />
    </div>
  </div>
);

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextField;