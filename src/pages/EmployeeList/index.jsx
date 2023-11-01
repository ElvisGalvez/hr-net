import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFromLocalStorage, updateEmployee } from '../../state/employeeSlice';
import EmployeeTable from '../../components/organisms/EmployeeTable';
import EmployeeForm from '../../components/organisms/EmployeeForm';
import ModalCraft from '../../components/atoms/ConfirmationModal';
import './EmployeeList.css';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const { employees, departmentOptions } = useSelector((state) => state.employee);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('employees');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            dispatch(loadFromLocalStorage(parsedData));
        }

        const handleStorageChange = (e) => {
            if (e.key === 'employees') {
                const newEmployees = JSON.parse(e.newValue);
                if (newEmployees) {
                    dispatch(loadFromLocalStorage(newEmployees));
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [dispatch]);

    useEffect(() => {
    }, [employeeToEdit]);
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

    return (
        <div className="container">
            <EmployeeTable data={employees} openEditModal={openEditModal} />
            {isEditModalOpen && (
                <ModalCraft isOpen={isEditModalOpen} onClose={closeEditModal}>
                    <EmployeeForm
                        title="Edit Employee"
                        employeeToEdit={employeeToEdit}
                        onSubmit={handleUpdateEmployee}
                        departmentOptions={departmentOptions}
                    />
                </ModalCraft>
            )}
        </div>
    );
};

export default EmployeeList;
