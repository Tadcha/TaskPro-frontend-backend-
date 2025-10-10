import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  changeTheme,
  updateUser,
  refreshCurrentUser,
  needHelp,
  setAxiosAuthToken,
} from './authOperations';

// Common handlers for async thunks
const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || 'An error occurred';
};

// Initial authentication state
const initialState = {
  user: {
    name: null,
    email: null,
    theme: 'light',
    avatarURL: '',
  },
  token: localStorage.getItem('token') || null,
  isLoggedIn: false, // Don't assume user is logged in just because token exists
  isLoading: false,
  isRefreshing: false,
  error: null,
};

// Set axios token if exists in localStorage
const token = localStorage.getItem('token');
if (token) {
  setAxiosAuthToken(token);
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Clear authentication errors
    clearAuthError: state => {
      state.error = null;
    },
    // Set authentication token (for external use)
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // User Registration
      .addCase(register.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(register.fulfilled, (state, action) => {
        // Registration only returns a confirmation message, not user data
        state.isLoading = false;
        state.error = null;
        // Don't set user or login state - user needs to confirm email first
      })

      // User Login
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.rejected, handleRejected)
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
        // Save token to localStorage and set axios header
        localStorage.setItem('token', action.payload.accessToken);
        setAxiosAuthToken(action.payload.accessToken);
      })

      // User Logout
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, state => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
        // Remove token from localStorage and clear axios header
        localStorage.removeItem('token');
        setAxiosAuthToken(null);
      })

      // Theme Change
      .addCase(changeTheme.pending, handlePending)
      .addCase(changeTheme.rejected, handleRejected)
      .addCase(changeTheme.fulfilled, (state, action) => {
        state.user.theme = action.payload.theme;
        state.isLoading = false;
        state.error = null;
      })

      // Token Refresh
      .addCase(refreshCurrentUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
        // Ensure axios header is set
        setAxiosAuthToken(state.token);
      })
      .addCase(refreshCurrentUser.rejected, state => {
        state.isRefreshing = false;
        state.token = null;
        state.isLoggedIn = false;
        state.user = initialState.user;
        // Remove invalid token from localStorage
        localStorage.removeItem('token');
      })

      // User Profile Update
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.rejected, handleRejected)
      .addCase(updateUser.fulfilled, (state, action) => {
        const { name, email, password, avatarURL } = action.payload;
        state.user.name = name;
        state.user.email = email;
        if (password) state.user.password = password;
        if (avatarURL) state.user.avatarURL = avatarURL;
        state.isLoading = false;
        state.error = null;
      })

      // Need Help Feature
      .addCase(needHelp.pending, handlePending)
      .addCase(needHelp.rejected, handleRejected)
      .addCase(needHelp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

// Export actions
export const { clearAuthError, setAuthToken } = authSlice.actions;

// Export reducer
export const authReducer = authSlice.reducer;
