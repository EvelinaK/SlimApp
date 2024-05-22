import { createAction } from '@reduxjs/toolkit';

const registerRequest = createAction('auth/regRequest');
const registerSuccess = createAction('auth/regSuccess');
const registerError = createAction('auth/regError');

const loginRequest = createAction('auth/loginRequest');
const loginSuccess = createAction('auth/loginSuccess');
const loginError = createAction('auth/loginError');

const logoutRequest = createAction('auth/logoutRequest');
const logoutSuccess = createAction('auth/logoutSuccess');
const logoutError = createAction('auth/logoutError');

const refreshRequest = createAction('auth/refreshRequest');
const refreshSuccess = createAction('auth/refreshSuccess');
const refreshError = createAction('auth/refreshError');

const clearError = createAction('clearError');

const actions = {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  refreshRequest,
  refreshSuccess,
  clearError,
  refreshError,
};

export default actions;
