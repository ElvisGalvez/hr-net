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
  formError: '',
  modalOpen: false,
  birthDateError: '',
  firstNameError: '',
  lastNameError: '',
  zipCodeError: '',
  cityError: '',
  isEditModalOpen: false,
  employeeToEdit: null,
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
      const newEmployee = {
        ...action.payload,
        id: new Date().getTime(),
      };
      state.employees.push(newEmployee);
    },

    loadFromLocalStorage: (state, action) => {
      state.employees = action.payload;
    },
    setFormError: (state, action) => {
      state.formError = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    setBirthDateError: (state, action) => {
      state.birthDateError = action.payload;
    },
    setFirstNameError: (state, action) => {
      state.firstNameError = action.payload;
    },
    setLastNameError: (state, action) => {
      state.lastNameError = action.payload;
    },
    setZipCodeError: (state, action) => {
      state.zipCodeError = action.payload;
    },
    setCityError: (state, action) => {
      state.cityError = action.payload;
    },
    updateEmployee: (state, action) => {
      const employeeToUpdate = action.payload;
      const index = state.employees.findIndex(emp => emp.id === employeeToUpdate.id);
      if (index !== -1) {
        state.employees[index] = { ...state.employees[index], ...employeeToUpdate };
      }
    },
    openEditModal: (state, action) => {
      state.employeeToEdit = action.payload;
      state.isEditModalOpen = true;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      state.employeeToEdit = null;
    },
  },
});

export const {
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
  toggleSideMenu,
  setSideMenuExpanded,
  createEmployee,
  loadFromLocalStorage,
  updateEmployee,
  openEditModal,
  closeEditModal,
} = employeeSlice.actions;

export default employeeSlice.reducer;
