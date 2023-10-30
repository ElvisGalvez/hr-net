import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee } from '../../state/employeeSlice';
import EmployeeForm from '../../components/organisms/EmployeeForm';

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const { departmentOptions } = useSelector(state => state.employee);

  const handleConfirm = () => {
    dispatch(createEmployee());
  };

  return (
    <>
      <EmployeeForm 
        title="Create Employee"
        handleConfirm={handleConfirm}
        departmentOptions={departmentOptions}
      />
    </>
  );
};

export default CreateEmployee;
