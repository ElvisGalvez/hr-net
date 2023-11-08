import { createSlice } from '@reduxjs/toolkit';
import states from '../data/states.json';
import departments from '../data/departments.json';

const savedEmployees = localStorage.getItem('employees');
const parsedEmployees = savedEmployees ? JSON.parse(savedEmployees) : [];

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
  employees: parsedEmployees,
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
  isDeleteModalOpen: false,
  employeeToDelete: null,
  pageSize: 10,
  searchValue: '',
  filteredEmployees: [],
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
  deleteEmployee: (state, action) => {
    const idToDelete = action.payload.id;
    state.employees = state.employees.filter(emp => emp.id !== idToDelete);
    state.filteredEmployees = state.filteredEmployees.filter(emp => emp.id !== idToDelete);
  },
    openDeleteModal: (state, action) => {
      state.employeeToDelete = action.payload;
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.employeeToDelete = null;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
      state.filteredEmployees = action.payload
        ? state.employees.filter(employee =>
            [employee.firstName, employee.lastName]
              .filter(Boolean) 
              .join(" ") 
              .toLowerCase() 
              .includes(action.payload.toLowerCase()) 
          )
        : state.employees; 
    },
    
    setFilteredEmployees: (state, action) => {
      state.filteredEmployees = action.payload;
    },
    resetFormData: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.birthDate = null;
      state.startDate = null;
      state.street = '';
      state.city = '';
      state.zipCode = '';
      state.state = '';
      state.department = '';
      state.formError = '';
      state.modalOpen = false;
      state.birthDateError = '';
      state.firstNameError = '';
      state.lastNameError = '';
      state.zipCodeError = '';
      state.cityError = '';
    },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadFromLocalStorage, (state, action) => {
          state.employees = action.payload;
          state.filteredEmployees = !state.searchValue
            ? action.payload
            : action.payload.filter(employee =>
                Object.values(employee).join(" ").toLowerCase().includes(state.searchValue.toLowerCase())
              );
        });
    }    
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
  deleteEmployee,
  resetFormData,
  openDeleteModal,
  closeDeleteModal,
  setPageSize,
  setSearchValue,
  setFilteredEmployees,
} = employeeSlice.actions;

export default employeeSlice.reducer;
