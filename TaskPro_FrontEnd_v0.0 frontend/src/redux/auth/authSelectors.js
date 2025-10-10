// Auth state selectors
export const selectUser = state => state.auth.user;
export const selectUserName = state => state.auth.user?.name;
export const selectUserEmail = state => state.auth.user?.email;
export const selectUserTheme = state => state.auth.user?.theme || 'light';
export const selectUserAvatar = state => state.auth.user?.avatarURL;

// Authentication status selectors
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsLoading = state => state.auth.isLoading;
export const selectAuthError = state => state.auth.error;

// Token selector
export const selectAuthToken = state => state.auth.token;

// Combined selectors for convenience
export const selectAuthStatus = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
  isRefreshing: state.auth.isRefreshing,
  error: state.auth.error,
});

export const selectUserProfile = state => ({
  name: state.auth.user.name,
  email: state.auth.user.email,
  theme: state.auth.user.theme,
  avatarURL: state.auth.user.avatarURL,
});
