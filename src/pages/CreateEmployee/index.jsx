import React, { useState } from 'react';
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
  setDepartment,
  createEmployee 
} from '../../state/employeeSlice';
import DateField from '../../components/molecules/DateField';
import TextField from '../../components/atoms/TextField';
import SelectField from '../../components/atoms/SelectField'; 
import AddressFieldset from '../../components/organisms/AddressFieldset';
import SaveButton from '../../components/atoms/SaveButton';
import ModalCraft from '../../components/atoms/ConfirmationModal';
import ModalContent from '../../components/molecules/ModalContent';
import './CreateEmployee.css';

const CreateEmployee = () => {
  const [modalOpen, setModalOpen] = useState(false); 
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
    departmentOptions, 
  } = useSelector(state => state.employee);

  const handleSubmit = (e) => {
    e.preventDefault();

  if (
    firstName &&
    lastName &&
    birthDate &&
    startDate &&
    street &&
    city &&
    state &&
    zipCode &&
    department
  ) {
    setModalOpen(true);
  } else {
    alert('Tous les champs doivent être remplis.');
  }
};

  
  
const handleConfirm = () => {
  dispatch(createEmployee());
  setModalOpen(false); 
};

const handleCancel = () => {
  setModalOpen(false); 
};

const handleTextChange = (setter) => (e) => {
  dispatch(setter(e.target.value));
};

const handleDateChange = (setter) => (date) => {
    const isoString = date.toISOString();
    dispatch(setter(isoString));
  };
  

  const handleAddressChange = (field) => (e) => {
    let value;
    if (e && e.target) {
      value = e.target.value;
    } else {
      value = e;
    }
  
    switch (field) {
      case 'street':
        dispatch(setStreet(value));
        break;
      case 'city':
        dispatch(setCity(value));
        break;
      case 'zipCode':
        dispatch(setZipCode(value));
        break;
      case 'state':
        dispatch(setState(value));
        break;
      default:
        break;
    }
  };
  

  const handleSelectChange = (setter) => (option) => {
    if (option) {
      dispatch(setter(option.value));
    } else {
      dispatch(setter(''));
    }
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
        <SaveButton label="Save" onClick={handleSubmit} />
      </form>
      <ModalCraft isOpen={modalOpen} onClose={handleCancel}>
        <ModalContent 
          data={{ firstName, lastName, birthDate, startDate, street, city, state, zipCode, department }}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </ModalCraft>
    </div>
  );
};

export default CreateEmployee;