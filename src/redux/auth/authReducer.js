import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from './authActions';

const accessToken = createReducer(null, {
  [authActions.loginSuccess]: (state, { payload }) => payload.auth.accessToken,
  [authActions.logoutSuccess]: () => null,
  [authActions.refreshSuccess]: (state, { payload }) => payload.newAccessToken, //.auth.newAccessToken
  [authActions.clearError]: () => null,
});

const refreshToken = createReducer(null, {
  [authActions.loginSuccess]: (state, { payload }) => payload.auth.refreshToken,
  [authActions.refreshSuccess]: (state, { payload }) => payload.newRefreshToken,
  [authActions.logoutSuccess]: () => null,
  [authActions.clearError]: () => null,
});

const sid = createReducer(null, {
  [authActions.loginSuccess]: (state, { payload }) => payload.auth.sid,
  [authActions.refreshSuccess]: (state, { payload }) => payload.sid,
  [authActions.logoutSuccess]: () => null,
  [authActions.clearError]: () => null,
});

const authReducer = combineReducers({
  accessToken,
  refreshToken,
  sid,
});

export default authReducer;
