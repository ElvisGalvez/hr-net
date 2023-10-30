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
  setFormError,  
} from '../../../state/employeeSlice';
import DateField from '../../molecules/DateField';
import TextField from '../../atoms/TextField';
import SelectField from '../../atoms/SelectField';
import AddressFieldset from '../../organisms/AddressFieldset';
import SaveButton from '../../atoms/SaveButton';
import ModalCraft from '../../atoms/ConfirmationModal';
import ModalContent from '../../molecules/ModalContent';
import './EmployeeForm.css';

const validateName = (name) => {
  const forbiddenCharacters = [',', ';', ':', '!', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return !forbiddenCharacters.some(char => name.includes(char));
};

const EmployeeForm = ({ title, departmentOptions, handleConfirm }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const formData = useSelector(state => state.employee);
  const formError = useSelector(state => state.employee.formError); 

  const [firstNameError, setFirstNameError] = useState(''); 
  const [lastNameError, setLastNameError] = useState('');  

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, birthDate, startDate, street, city, state, zipCode, department } = formData;
  
    let isValid = true;
  
    if (!validateName(firstName)) {
      setFirstNameError('First name should not contain forbidden characters or numbers.');
      isValid = false;
    } else {
      setFirstNameError('');
    }
  
    if (!validateName(lastName)) {
      setLastNameError('Last name should not contain forbidden characters or numbers.');
      isValid = false;
    } else {
      setLastNameError('');
    }
  
    if (!isValid) {
      return;
    }
  
    if (firstName && lastName && birthDate && startDate && street && city && state && zipCode && department) {
      setModalOpen(true);
      dispatch(setFormError(''));  
    } else {
      dispatch(setFormError('Tous les champs doivent être remplis.'));  
    }
  };
  
  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleChange = (field) => (e) => {
    let value;
    if (e && e.target) {
      value = e.target.value;
    } else if (e && e instanceof Date) {
      value = e.toISOString();
    } else if (e && e.value) {
      value = e.value;
    } else {
      value = e;
    }

    const actionMap = {
      firstName: setFirstName,
      lastName: setLastName,
      birthDate: setBirthDate,
      startDate: setStartDate,
      street: setStreet,
      city: setCity,
      zipCode: setZipCode,
      state: setState,
      department: setDepartment,
    };

    if (actionMap[field]) {
      dispatch(actionMap[field](value));
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{title}</h2>
      <form id="employee-form" onSubmit={handleSubmit}>
        <TextField label="First Name" id="firstName" value={formData.firstName} onChange={handleChange('firstName')} />
        {firstNameError && <p className="field-error">{firstNameError}</p>} 
        <TextField label="Last Name" id="lastName" value={formData.lastName} onChange={handleChange('lastName')} />
        {lastNameError && <p className="field-error">{lastNameError}</p>}  
        <DateField label="Date of Birth" id="birthDate" value={formData.birthDate} onChange={handleChange('birthDate')} />
        <DateField label="Start Date" id="startDate" value={formData.startDate} onChange={handleChange('startDate')} />
        <AddressFieldset street={formData.street} city={formData.city} state={formData.state} zipCode={formData.zipCode} onChange={handleChange} />
        <div className="department-select-container">
          <SelectField 
            label="Department"
            id="department"
            options={departmentOptions}
            value={formData.department}
            onChange={handleChange('department')}
          />
        </div>
        <SaveButton label="Save" onClick={handleSubmit} />
      </form>
      {formError && <p className="form-error">{formError}</p>}
      <ModalCraft isOpen={modalOpen} onClose={handleCancel}>
        <ModalContent 
          data={formData}
          onConfirm={() => { handleConfirm(); setModalOpen(false); }}
          onCancel={handleCancel}
        />
      </ModalCraft>
    </div>
  );
};

export default EmployeeForm;
