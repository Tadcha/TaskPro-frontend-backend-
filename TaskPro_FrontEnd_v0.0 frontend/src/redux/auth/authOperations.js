import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to set auth token
export const setAxiosAuthToken = token => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

// User Registration
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await instance.post('/api/users/register', credentials);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// User Login
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await instance.post('/api/users/login', credentials);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// User Logout
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await instance.post('/api/users/logout');
    return {};
  } catch (error) {
    const message = error.response?.data?.message || 'Logout failed';
    return thunkAPI.rejectWithValue(message);
  }
});

// Refresh Current User
export const refreshCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const { data } = await instance.get('/api/users/current');
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to refresh user data';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update User Profile
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, thunkAPI) => {
    try {
      // Check if userData contains a file (for avatar upload)
      const isFormData = userData instanceof FormData;

      const config = isFormData
        ? {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        : {};

      const { data } = await instance.put(
        '/api/users/profile',
        userData,
        config
      );
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Change Theme
export const changeTheme = createAsyncThunk(
  'auth/changeTheme',
  async (themeData, thunkAPI) => {
    try {
      const { data } = await instance.patch('/api/users/theme', themeData);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Theme change failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Need Help
export const needHelp = createAsyncThunk(
  'auth/needHelp',
  async (helpData, thunkAPI) => {
    try {
      const { data } = await instance.post('/api/users/help', helpData);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to send help request';
      return thunkAPI.rejectWithValue(message);
    }
  }
);
