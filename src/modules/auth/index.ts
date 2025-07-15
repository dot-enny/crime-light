// Auth module public API exports

// Types
export type {
  AuthUser,
  LoginData,
  SignupData,
  AuthResult,
  AuthFormProps,
  PasswordFieldProps,
  AuthCardProps
} from './types';

// Constants
export {
  AUTH_CONFIG,
  AUTH_VALIDATION,
  AUTH_MESSAGES,
  USER_ROLES,
  CARD_STYLES
} from './constants';

// Utilities
export {
  validateEmail,
  validatePassword,
  generateUserId,
  generateToken,
  simulateLogin,
  simulateSignup,
  storeAuthData,
  getAuthData,
  clearAuthData,
  validateLoginForm,
  validateSignupForm
} from './utils';

// Hooks
export {
  usePasswordVisibility,
  useAuthForm,
  useLogin,
  useSignup
} from './hooks';

// Components
export {
  AuthCard,
  PasswordField,
  FormField,
  SubmitButton,
  ErrorDisplay
} from './components';

// Forms
export { LoginForm } from './forms/LoginForm';
export { SignupForm } from './forms/SignupForm';
