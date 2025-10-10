import { configureStore } from '@reduxjs/toolkit';

// Reducers
import { authReducer } from './auth/authSlice';
import { menuModeReducer } from './menuMode/menuModeSlice';
import { dashboardsReducer } from './dashboards/dashboardsSlice';

// Configure store with professional settings
export const store = configureStore({
  reducer: {
    auth: authReducer,
    menuMode: menuModeReducer,
    dashboards: dashboardsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
