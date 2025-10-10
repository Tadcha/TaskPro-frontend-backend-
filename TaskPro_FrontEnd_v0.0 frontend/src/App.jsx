import 'react-toastify/dist/ReactToastify.css';
import { lazy, useEffect, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import Layout from 'components/Layout/Layout';
import Loader from 'components/AuthPage/Loader';

// Redux
import { selectIsRefreshing } from 'redux/auth/authSelectors';
import { refreshCurrentUser } from 'redux/auth/authOperations';

// Lazy-loaded pages for better performance
const HomePage = lazy(() => import('./pages/Home'));
const AuthPage = lazy(() => import('./pages/Auth'));
const WelcomePage = lazy(() => import('./pages/Welcome'));
const ScreenPage = lazy(() => import('./components/ScreensPage/ScreensPage'));

/**
 * Main App component with routing and authentication handling
 * Features:
 * - Lazy loading for better performance
 * - Protected and restricted routes
 * - Automatic user refresh on app start
 * - Loading states management
 */
export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  // Attempt to refresh user session on app initialization only if token exists
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      dispatch(refreshCurrentUser());
    }
  }, [dispatch]); // Include dispatch in dependencies

  return (
    <Suspense fallback={<Loader />}>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public welcome page */}
            <Route
              index
              element={
                <RestrictedRoute
                  redirectTo="/home"
                  component={<WelcomePage />}
                />
              }
            />

            {/* Protected main application */}
            <Route
              path="/home"
              element={<PrivateRoute redirectTo="/" component={<HomePage />} />}
            >
              <Route path=":boardName" element={<ScreenPage />} />
            </Route>

            {/* Authentication routes */}
            <Route
              path="auth"
              element={
                <RestrictedRoute redirectTo="/home" component={<AuthPage />} />
              }
            >
              <Route path="login" element={<LoginForm />} />
              <Route path="register" element={<RegisterForm />} />
            </Route>
          </Route>
        </Routes>
      )}
    </Suspense>
  );
};
