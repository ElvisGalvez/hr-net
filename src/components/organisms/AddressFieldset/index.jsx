import React from 'react';
import TextField from '../../atoms/TextField';
import SelectField from '../../atoms/SelectField';
import PropTypes from 'prop-types';
import states from '../../../data/states.json';
import './AddressFieldset.css';

const AddressFieldset = ({ street, city, state, zipCode, onChange }) => (
  <fieldset className="address">
    <legend>Address</legend>
    <TextField label="Street" id="street" value={street} onChange={onChange('street')} />
    <TextField label="City" id="city" value={city} onChange={onChange('city')} />
    
    <SelectField
      label="State"
      id="state"
      options={states.map((s) => ({ value: s.abbreviation, label: s.name }))}
      value={state}
      onChange={onChange('state')}
    />
    
    <TextField label="Zip Code" id="zipCode" value={zipCode} onChange={onChange('zipCode')} />
  </fieldset>
);

AddressFieldset.propTypes = {
  street: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default AddressFieldset;
