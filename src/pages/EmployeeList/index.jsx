import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadFromLocalStorage,
  updateEmployee,
  deleteEmployee,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
  setPageSize,
  setSearchValue,
  setModalType
} from '../../state/employeeSlice';
import EmployeeTable from '../../components/organisms/EmployeeTable';
import EmployeeForm from '../../components/organisms/EmployeeForm';
import ModalCraft from '../../components/atoms/ConfirmationModal';
import SaveAndCancelButton from '../../components/atoms/SaveAndCancelButton';
import OptionsBar from '../../components/organisms/OptionBar';
import './EmployeeList.css';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const {
    departmentOptions,
    isEditModalOpen,
    employeeToEdit,
    isDeleteModalOpen,
    employeeToDelete,
    pageSize,
    searchValue,
    filteredEmployees
  } = useSelector((state) => state.employee);

  useEffect(() => {
    const storedData = localStorage.getItem('employees');
    if (storedData) {
      dispatch(loadFromLocalStorage(JSON.parse(storedData)));
    }

    const handleStorageChange = (e) => {
      if (e.key === 'employees') {
        dispatch(loadFromLocalStorage(JSON.parse(e.newValue)));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchValue(''));
  }, [dispatch]);

  const handleOpenEditModal = (employee) => {
    dispatch(setModalType('edit'));
    dispatch(openEditModal(employee));
  };
  const handleCloseEditModal = () => dispatch(closeEditModal());
  const handleUpdateEmployee = (updatedEmployee) => {
    dispatch(updateEmployee({ ...updatedEmployee, id: employeeToEdit.id }));
    handleCloseEditModal();
  };
  const handleOpenDeleteModal = (employee) => dispatch(openDeleteModal(employee));
  const handleCloseDeleteModal = () => dispatch(closeDeleteModal());
  const handleDeleteEmployee = () => {
    dispatch(deleteEmployee({ id: employeeToDelete.id }));
    handleCloseDeleteModal();
  };

  const [pageIndex, setPageIndex] = useState(0); 

  return (
    <div className="container">
      <OptionsBar
        pageSize={pageSize}
        setPageSize={(size) => dispatch(setPageSize(size))}
        searchValue={searchValue}
        setSearchValue={(value) => dispatch(setSearchValue(value))}
      />
      <EmployeeTable
        data={filteredEmployees}
        pageSize={pageSize}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex} 
        openEditModal={handleOpenEditModal}
        openDeleteModal={handleOpenDeleteModal}
      />
      {isEditModalOpen && (
        <ModalCraft isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
          <EmployeeForm
            title="Edit Employee"
            employeeToEdit={employeeToEdit}
            onSubmit={handleUpdateEmployee}
            departmentOptions={departmentOptions}
            showCancelButton={true}
            onClose={handleCloseEditModal}
          />
        </ModalCraft>
      )}
      {isDeleteModalOpen && (
        <ModalCraft isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
          <div>
            <p>Are you sure you want to delete this employee?</p>
            <SaveAndCancelButton
              onSave={handleDeleteEmployee}
              onCancel={handleCloseDeleteModal}
              saveLabel="Confirm"
              cancelLabel="Cancel"
              showCancelButton={true}
            />
          </div>
        </ModalCraft>
      )}
    </div>
  );
};

export default EmployeeList;
