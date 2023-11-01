import React from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee } from '../../state/employeeSlice';
import EmployeeForm from '../../components/organisms/EmployeeForm';

const CreateEmployee = () => {
  const dispatch = useDispatch();

  const handleConfirm = (formData) => {
    dispatch(createEmployee(formData));
  };

  return (
    <>
      <EmployeeForm 
        title="Create Employee"
        onSubmit={handleConfirm}  
      />
    </>
  );
};

export default CreateEmployee;
