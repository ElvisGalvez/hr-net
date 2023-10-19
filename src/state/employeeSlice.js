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
  },
});

export const { setFirstName, setLastName, setBirthDate, setStartDate, setStreet, setCity, setZipCode, setState, setDepartment } = employeeSlice.actions;

export default employeeSlice.reducer;
