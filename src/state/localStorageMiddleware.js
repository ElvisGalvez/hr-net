export const localStorageMiddleware = store => next => action => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('employees', JSON.stringify(state.employee.employees));
    return result;
  };
  