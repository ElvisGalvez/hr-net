import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee, resetFormData, setModalType } from '../../state/employeeSlice';
import EmployeeForm from '../../components/organisms/EmployeeForm';

const CreateEmployee = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFormData());
    dispatch(setModalType('create')); 
  }, [dispatch]);

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