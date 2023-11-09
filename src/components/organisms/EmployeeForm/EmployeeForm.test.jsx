import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../../../state/employeeSlice';
import EmployeeForm from './index';

describe('EmployeeForm', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        employee: employeeReducer,
      },
    });
  });

  it('should display validation error for first name when invalid data is submitted', async () => {
    render(
      <Provider store={store}>
        <EmployeeForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(screen.getByText(/first name should not contain forbidden characters or numbers/i)).toBeInTheDocument();
    });
  });

  it('should display validation error for last name when invalid data is submitted', async () => {
    render(
      <Provider store={store}>
        <EmployeeForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: '456' } });

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(screen.getByText(/last name should not contain forbidden characters or numbers/i)).toBeInTheDocument();
    });
  });

  it('should display validation error for date of birth when age is below minimum', async () => {
    render(
      <Provider store={store}>
        <EmployeeForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '2010-01-01' } });

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(screen.getByText(/the employee must be of legal age/i)).toBeInTheDocument();
    });
  });

  it('should display validation error for zip code when invalid data is submitted', async () => {
    render(
      <Provider store={store}>
        <EmployeeForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/zip code/i), { target: { value: 'ABCD' } });

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(screen.getByText(/invalid zip code/i)).toBeInTheDocument();
    });
  });

  it('should display validation error for city when invalid data is submitted', async () => {
    render(
      <Provider store={store}>
        <EmployeeForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'City123' } });

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(screen.getByText(/city should not contain forbidden characters or numbers/i)).toBeInTheDocument();
    });
  });

  it('should display validation error for empty fields when form is submitted', async () => {
    render(
      <Provider store={store}>
        <EmployeeForm />
      </Provider>
    );

    fireEvent.click(screen.getByText(/save/i));
  
    await waitFor(() => {
      expect(screen.getByText(/all fields must be filled/i)).toBeInTheDocument();
    });
  });
});
