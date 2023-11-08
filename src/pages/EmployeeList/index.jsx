import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadFromLocalStorage,
    updateEmployee,
    deleteEmployee
} from '../../state/employeeSlice';
import EmployeeTable from '../../components/organisms/EmployeeTable';
import EmployeeForm from '../../components/organisms/EmployeeForm';
import ModalCraft from '../../components/atoms/ConfirmationModal';
import SaveAndCancelButton from '../../components/atoms/SaveAndCancelButton';
import OptionsBar from '../../components/organisms/OptionBar';
import './EmployeeList.css';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const { employees, departmentOptions } = useSelector((state) => state.employee);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [searchValue, setSearchValue] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState(employees);

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

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [dispatch]);

    useEffect(() => {
        if (searchValue) {
            setFilteredEmployees(
                employees.filter((employee) =>
                    Object.values(employee)
                        .join(" ")
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                )
            );
        } else {
            setFilteredEmployees(employees);
        }
    }, [searchValue, employees]);

    const openEditModal = (employee) => {
        setEmployeeToEdit(employee);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setEmployeeToEdit(null);
    };

    const handleUpdateEmployee = (updatedEmployee) => {
        dispatch(updateEmployee({ ...updatedEmployee, id: employeeToEdit.id }));
        closeEditModal();
    };

    const openDeleteModal = (employee) => {
        setEmployeeToDelete(employee);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setEmployeeToDelete(null);
    };

    const handleDeleteEmployee = () => {
        dispatch(deleteEmployee({ id: employeeToDelete.id }));
        closeDeleteModal();
    };

    return (
        <div className="container">
            <OptionsBar
                pageSize={pageSize}
                setPageSize={setPageSize}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <EmployeeTable
                data={filteredEmployees.slice(0, pageSize)}
                pageSize={pageSize}
                openEditModal={openEditModal}
                openDeleteModal={openDeleteModal}
            />
            {isEditModalOpen && (
                <ModalCraft isOpen={isEditModalOpen} onClose={closeEditModal}>
                    <EmployeeForm
                        title="Edit Employee"
                        employeeToEdit={employeeToEdit}
                        onSubmit={handleUpdateEmployee}
                        departmentOptions={departmentOptions}
                        showCancelButton={true}
                        onClose={closeEditModal}
                    />
                </ModalCraft>
            )}
            {isDeleteModalOpen && (
                <ModalCraft isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
                    <div>
                        <p>Are you sure you want to delete this employee?</p>
                        <SaveAndCancelButton
                            onSave={handleDeleteEmployee}
                            onCancel={closeDeleteModal}
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
