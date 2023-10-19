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
  setState,
  setDepartment 
} from '../../state/employeeSlice';
import DateField from '../../components/molecules/DateField';
import TextField from '../../components/atoms/TextField';
import SelectField from '../../components/atoms/SelectField'; 
import AddressFieldset from '../../components/organisms/AddressFieldset';
import './CreateEmployee.css';

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const { 
    firstName, 
    lastName, 
    birthDate, 
    startDate, 
    street, 
    city, 
    state, 
    zipCode,
    department, 
    departmentOptions 
  } = useSelector(state => state.employee);

  const handleTextChange = (setter) => (e) => {
    dispatch(setter(e.target.value));
  };

  const handleDateChange = (setter) => (date) => {
    dispatch(setter(date));
  };

  const handleAddressChange = (field) => (e) => {
    switch (field) {
      case 'street':
        dispatch(setStreet(e.target.value));
        break;
      case 'city':
        dispatch(setCity(e.target.value));
        break;
      case 'zipCode':
        dispatch(setZipCode(e.target.value));
        break;
      case 'state':
        dispatch(setState(e.target.value));
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (setter) => (option) => {
    dispatch(setter(option ? option.value : ''));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Employee</h2>
      <form id="create-employee">
        <TextField label="First Name" id="firstName" value={firstName} onChange={handleTextChange(setFirstName)} />
        <TextField label="Last Name" id="lastName" value={lastName} onChange={handleTextChange(setLastName)} />
        <DateField label="Date of Birth" id="birthDate" value={birthDate} onChange={handleDateChange(setBirthDate)} />
        <DateField label="Start Date" id="startDate" value={startDate} onChange={handleDateChange(setStartDate)} />
        <AddressFieldset street={street} city={city} state={state} zipCode={zipCode} onChange={handleAddressChange} />
        <div className="department-select-container">
        <SelectField 
          label="Department"
          id="department"
          options={departmentOptions}
          value={department}
          onChange={handleSelectChange(setDepartment)}
        />
        </div>
      </form>
    </div>
  );
};

export default CreateEmployee;
