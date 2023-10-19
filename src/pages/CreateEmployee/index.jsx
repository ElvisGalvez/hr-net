import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFirstName,
  setLastName,
  setBirthDate,
  setStartDate,
  setStreet,
  setCity,
  setZipCode,
} from '../../state/employeeSlice';
import DateField from '../../components/molecules/DateField';
import './CreateEmployee.css';


const CreateEmployee = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, birthDate, startDate, street, city, zipCode } = useSelector(state => state.employee);

  const handleTextChange = (setter) => (e) => {
    dispatch(setter(e.target.value));
  };

  const handleDateChange = (setter) => (date) => {
    dispatch(setter(date));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Employee</h2>
      <form id="create-employee">

        <div className="form-field">
          <div className="form-field-wrapper">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleTextChange(setFirstName)}
            />
          </div>
        </div>

        <div className="form-field">
          <div className="form-field-wrapper">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleTextChange(setLastName)}
            />
          </div>
        </div>

        <DateField
          label="Date of Birth"
          id="birthDate"
          value={birthDate}
          onChange={handleDateChange(setBirthDate)}
        />

        <DateField
          label="Start Date"
          id="startDate"
          value={startDate}
          onChange={handleDateChange(setStartDate)}
        />
        <fieldset className="address">
          <legend>Address</legend>

          <div className="form-field">
            <div className="form-field-wrapper">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={handleTextChange(setStreet)}
              />
            </div>
          </div>

          <div className="form-field">
            <div className="form-field-wrapper">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={handleTextChange(setCity)}
              />
            </div>
          </div>

          <div className="form-field">
            <div className="form-field-wrapper">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={handleTextChange(setZipCode)}
              />
            </div>
          </div>

        </fieldset>
      

      </form>
    </div>
  );
};

export default CreateEmployee;