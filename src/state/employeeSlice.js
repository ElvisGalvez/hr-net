import { createSlice } from '@reduxjs/toolkit';
import states from '../data/states.json';
import departments from '../data/departments.json';

const initialState = {
  firstName: '',
  lastName: '',
  birthDate: null,
  startDate: null,
  street: '',
  city: '',
  state: '',
  zipCode: '',
  department: '',
  stateOptions: states.map(s => ({ value: s.abbreviation, label: s.name })),
  departmentOptions: departments.map(d => ({ value: d.abbreviation, label: d.name })),
  employees: [],
  isSideMenuExpanded: false,
  isModalOpen: false,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setStreet: (state, action) => {
      state.street = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setZipCode: (state, action) => {
      state.zipCode = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
    toggleSideMenu: (state) => {
      state.isSideMenuExpanded = !state.isSideMenuExpanded;
    },
    setSideMenuExpanded: (state, action) => {
      state.isSideMenuExpanded = action.payload;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    createEmployee: (state, action) => {
      console.log("Reducer called for createEmployee");
      const newEmployee = {
        firstName: state.firstName,
        lastName: state.lastName,
        birthDate: state.birthDate,
        startDate: state.startDate,
        street: state.street,
        city: state.city,
        state: state.state,
        zipCode: state.zipCode,
        department: state.department,
      };
      state.employees.push(newEmployee);
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    loadFromLocalStorage: (state, action) => {
      state.employees = action.payload;
    },
  },
});

export const { setFirstName, setLastName, setBirthDate, setStartDate, setStreet, setCity, setZipCode, setState, setDepartment, createEmployee, toggleSideMenu, setSideMenuExpanded, loadFromLocalStorage } = employeeSlice.actions;

export default employeeSlice.reducer;