import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    firstName: '',
    lastName: '',
    birthDate: null,
    startDate: null,
    street: '',
    city: '',
    zipCode: '',

  },
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

  },
});

export const { setFirstName, setLastName, setBirthDate, setStartDate, setStreet, setCity, setZipCode } = employeeSlice.actions;

export default employeeSlice.reducer;
