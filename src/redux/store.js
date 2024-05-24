import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { loading, error } from '../redux/global/globalReducers';
import authReducer from './auth/authReducer';
import user from './user/userReducer';
import alertReducer from './alert/alertReducer';

const defaultMiddleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER],
  },
});

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken', 'sid'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    loading,
    error,
    user,
    alertReducer,
  },
  middleware: [...defaultMiddleware],
});

export const persistor = persistStore(store);
