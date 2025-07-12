import { AUTH_CONFIG, AUTH_VALIDATION, AUTH_MESSAGES } from './constants';
import type { AuthUser, LoginData, SignupData, AuthResult } from './types';

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  return AUTH_VALIDATION.emailRegex.test(email);
};

/**
 * Validates password strength
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= AUTH_VALIDATION.minPasswordLength;
};

/**
 * Generates a demo user ID
 */
export const generateUserId = (): string => {
  return 'demo-user-' + Date.now();
};

/**
 * Generates a demo JWT token
 */
export const generateToken = (): string => {
  return 'demo-jwt-token-' + Date.now();
};

/**
 * Simulates login API call
 */
export const simulateLogin = async (data: LoginData): Promise<AuthResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, AUTH_CONFIG.loginDelay));
  
  // Simulate successful login
  return {
    success: true,
    user: {
      id: generateUserId(),
      email: data.email,
      username: 'Demo User'
    },
    token: generateToken()
  };
};

/**
 * Simulates signup API call
 */
export const simulateSignup = async (data: SignupData): Promise<AuthResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, AUTH_CONFIG.signupDelay));
  
  // Simulate successful registration
  return {
    success: true,
    user: {
      id: generateUserId(),
      email: data.email,
      username: data.username,
      role: data.role
    },
    token: generateToken()
  };
};

/**
 * Stores auth data in localStorage
 */
export const storeAuthData = (result: AuthResult): void => {
  localStorage.setItem(AUTH_CONFIG.tokenKey, result.token);
  localStorage.setItem(AUTH_CONFIG.userDataKey, JSON.stringify(result.user));
};

/**
 * Retrieves auth data from localStorage
 */
export const getAuthData = (): { token: string | null; user: AuthUser | null } => {
  const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
  const userData = localStorage.getItem(AUTH_CONFIG.userDataKey);
  
  return {
    token,
    user: userData ? JSON.parse(userData) : null
  };
};

/**
 * Clears auth data from localStorage
 */
export const clearAuthData = (): void => {
  localStorage.removeItem(AUTH_CONFIG.tokenKey);
  localStorage.removeItem(AUTH_CONFIG.userDataKey);
};

/**
 * Validates login form data
 */
export const validateLoginForm = (data: LoginData): string[] => {
  const errors: string[] = [];
  
  if (!data.email) {
    errors.push(AUTH_MESSAGES.requiredField + ' (Email)');
  } else if (!validateEmail(data.email)) {
    errors.push(AUTH_MESSAGES.invalidEmail);
  }
  
  if (!data.password) {
    errors.push(AUTH_MESSAGES.requiredField + ' (Password)');
  } else if (!validatePassword(data.password)) {
    errors.push(AUTH_MESSAGES.passwordTooShort);
  }
  
  return errors;
};

/**
 * Validates signup form data
 */
export const validateSignupForm = (data: SignupData): string[] => {
  const errors: string[] = [];
  
  if (!data.email) {
    errors.push(AUTH_MESSAGES.requiredField + ' (Email)');
  } else if (!validateEmail(data.email)) {
    errors.push(AUTH_MESSAGES.invalidEmail);
  }
  
  if (!data.username) {
    errors.push(AUTH_MESSAGES.requiredField + ' (Username)');
  }
  
  if (!data.password) {
    errors.push(AUTH_MESSAGES.requiredField + ' (Password)');
  } else if (!validatePassword(data.password)) {
    errors.push(AUTH_MESSAGES.passwordTooShort);
  }
  
  if (!data.role) {
    errors.push(AUTH_MESSAGES.requiredField + ' (Role)');
  }
  
  return errors;
};
