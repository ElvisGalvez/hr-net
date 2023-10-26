import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFromLocalStorage } from '../../state/employeeSlice';
import EmployeeTable from '../../components/organisms/EmployeeTable';
import './EmployeeList.css';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employee.employees);

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

    return (
        <div className="container">
            <EmployeeTable data={employees} />
        </div>
    );
};

export default EmployeeList;
