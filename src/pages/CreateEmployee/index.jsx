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
import EmployeeForm from '../../components/organisms/EmployeeForm';
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
    if (firstName && lastName && birthDate && startDate && street && city && state && zipCode && department) {
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

  const handleChange = (field) => (e) => {
    let value;
    if (e && e.target) {
      value = e.target.value;
    } else if (e && e instanceof Date) {
      value = e.toISOString();
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
    <>
      <EmployeeForm 
        title="Create Employee"
        formData={{ firstName, lastName, birthDate, startDate, street, city, state, zipCode, department }}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        departmentOptions={departmentOptions}
      />
      <ModalCraft isOpen={modalOpen} onClose={handleCancel}>
        <ModalContent 
          data={{ firstName, lastName, birthDate, startDate, street, city, state, zipCode, department }}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </ModalCraft>
    </>
  );
};

export default CreateEmployee;
