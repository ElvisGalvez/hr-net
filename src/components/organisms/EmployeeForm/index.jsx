import React, { useEffect } from 'react';
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
  setModalOpen,
  setBirthDateError,
  setFirstNameError,
  setLastNameError,
  setZipCodeError,
  setCityError,
  resetFormData
} from '../../../state/employeeSlice';
import DateField from '../../molecules/DateField';
import TextField from '../../atoms/TextField';
import SelectField from '../../atoms/SelectField';
import AddressFieldset from '../../organisms/AddressFieldset';
import SaveAndCancelButton from '../../atoms/SaveAndCancelButton';
import ModalCraft from '../../atoms/ConfirmationModal';
import ModalContent from '../../molecules/ModalContent';

import './EmployeeForm.css';

const validateName = (name) => {
  const forbiddenCharacters = [',', ';', ':', '!', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return !forbiddenCharacters.some(char => name.includes(char));
};

const validateAge = (birthDate) => {
  const today = new Date();
  const birthDateObject = new Date(birthDate);
  const age = today.getFullYear() - birthDateObject.getFullYear();
  const monthDifference = today.getMonth() - birthDateObject.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObject.getDate())) {
    return age - 1;
  }
  return age;
};

const validateUSZipCode = (zipCode) => {
  const zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
  return zipCodePattern.test(zipCode);
};

const validateCity = (city) => {
  const forbiddenCharacters = [',', ';', ':', '!', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return !forbiddenCharacters.some(char => city.includes(char));
};

const EmployeeForm = ({ title, onSubmit, employeeToEdit, showCancelButton, onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setModalOpen(false));
  }, [dispatch]);

  useEffect(() => {
    if (employeeToEdit) {
      dispatch(setFirstName(employeeToEdit.firstName));
      dispatch(setLastName(employeeToEdit.lastName));
      dispatch(setBirthDate(employeeToEdit.birthDate));
      dispatch(setStartDate(employeeToEdit.startDate));
      dispatch(setStreet(employeeToEdit.street));
      dispatch(setCity(employeeToEdit.city));
      dispatch(setZipCode(employeeToEdit.zipCode));
      dispatch(setState(employeeToEdit.state));
      dispatch(setDepartment(employeeToEdit.department));
    }
  }, [employeeToEdit, dispatch]);

  const formData = useSelector(state => state.employee);
  const { departmentOptions } = useSelector(state => state.employee);

  const {
    modalOpen,
    birthDateError,
    firstNameError,
    lastNameError,
    zipCodeError,
    cityError,
    formError,
  } = useSelector(state => state.employee);


  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, birthDate, startDate, street, city, state, zipCode, department } = formData;

    let isValid = true;
    let hasEmptyFields = false;

    if (!firstName || !lastName || !birthDate || !startDate || !street || !city || !state || !zipCode || !department) {
      dispatch(setFormError('All fields must be filled'));
      hasEmptyFields = true;
    } else {
      dispatch(setFormError(''));
    }

    if (!validateName(firstName)) {
      dispatch(setFirstNameError('First name should not contain forbidden characters or numbers'));
      isValid = false;
    } else {
      dispatch(setFirstNameError(''));
    }

    if (!validateName(lastName)) {
      dispatch(setLastNameError('Last name should not contain forbidden characters or numbers'));
      isValid = false;
    } else {
      dispatch(setLastNameError(''));
    }

    if (validateAge(birthDate) < 18) {
      dispatch(setBirthDateError('The employee must be of legal age'));
      isValid = false;
    } else {
      dispatch(setBirthDateError(''));
    }

    if (!validateUSZipCode(zipCode)) {
      dispatch(setZipCodeError('Invalid ZIP code'));
      isValid = false;
    } else {
      dispatch(setZipCodeError(''));
    }

    if (!validateCity(city)) {
      dispatch(setCityError('City should not contain forbidden characters or numbers'));
      isValid = false;
    } else {
      dispatch(setCityError(''));
    }

    if (isValid && !hasEmptyFields) {
      dispatch(setModalOpen(true));
    }
  }

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      dispatch(setModalOpen(false));
    }
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

  const handleConfirm = () => {
    onSubmit(formData);
    dispatch(resetFormData());
    dispatch(setModalOpen(false));
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
        {birthDateError && <p className="field-error">{birthDateError}</p>}
        <DateField label="Start Date" id="startDate" value={formData.startDate} onChange={handleChange('startDate')} />
        <AddressFieldset
          street={formData.street}
          city={formData.city}
          state={formData.state}
          zipCode={formData.zipCode}
          onChange={handleChange}
          cityError={cityError}
          zipCodeError={zipCodeError}

        />
        <div className="department-select-container">
          <SelectField
            key={formData.department || 'department-default'}
            label="Department"
            id="department"
            options={departmentOptions}
            value={formData.department}
            onChange={handleChange('department')}
          />
        </div>
        <SaveAndCancelButton
          onSave={handleSubmit}
          onCancel={handleCancel}
          showCancelButton={showCancelButton}
        />
      </form>
      {formError && <p className="form-error">{formError}</p>}
      <ModalCraft isOpen={modalOpen} onClose={handleCancel}>
        <ModalContent
          data={formData}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </ModalCraft>
    </div>
  );
};


export default EmployeeForm;