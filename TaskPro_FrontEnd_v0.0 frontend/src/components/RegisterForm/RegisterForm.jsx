import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { register } from 'redux/auth/authOperations';

import {
  AuthForm,
  AuthFormWrapper,
  AuthFormPasswordIcon,
  AuthFormField,
  AuthFormSubmitButton,
  ErrorSection,
  // GoogleSignInBtn,
} from './RegisterForm.styled';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Loader from 'components/AuthPage/Loader';
import { useSelector } from 'react-redux';
import { selectIsLoading } from 'redux/auth/authSelectors';
// import GoogleLogo from '../../images/google-color-svgrepo-com.svg';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name must be at most 32 characters')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, at least one lowercase letter, at least one number, and can include special characters like @$!%*?&'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  showPassword: false,
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (values, { resetForm }) => {
    const { name, email, password } = values;
    try {
      const result = await dispatch(
        register({
          name,
          email,
          password,
        })
      );

      if (register.fulfilled.match(result)) {
        setRegistrationSuccess(true);
        resetForm();

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // Show success message
  if (registrationSuccess) {
    return (
      <AuthFormWrapper>
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#28a745',
          }}
        >
          <h2>✅ Registration Successful!</h2>
          <p>
            We've sent a confirmation email to your address.
            <br />
            Please check your email and confirm your registration.
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
            You will be redirected to the login page in a few seconds...
          </p>
        </div>
      </AuthFormWrapper>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <AuthForm>
        <AuthFormWrapper>
          <ErrorSection name="name" component="div" />
          <AuthFormField
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            autoComplete="off"
          />
        </AuthFormWrapper>

        <AuthFormWrapper>
          <ErrorSection name="email" component="div" />
          <AuthFormField
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
          />
        </AuthFormWrapper>

        <AuthFormWrapper>
          <ErrorSection name="password" component="div" />
          <AuthFormField
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Create a password"
            autoComplete="new-password"
          />
          <AuthFormPasswordIcon onClick={handleTogglePassword}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </AuthFormPasswordIcon>
        </AuthFormWrapper>

        <AuthFormWrapper>
          <ErrorSection name="confirmPassword" component="div" />
          <AuthFormField
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            autoComplete="new-password"
          />
          <AuthFormPasswordIcon onClick={handleTogglePassword}>
            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </AuthFormPasswordIcon>
        </AuthFormWrapper>

        <AuthFormSubmitButton type="submit">
          {loading ? <Loader /> : 'Register now'}
        </AuthFormSubmitButton>

        {/* <GoogleSignInBtn onClick={handleGoogleSignIn}>
          <img
            src={GoogleLogo}
            alt="Sign in with Google"
            style={{ width: 30, height: 30 }}
          />
        </GoogleSignInBtn> */}
      </AuthForm>
    </Formik>
  );
};

export default RegisterForm;
