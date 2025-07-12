import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { simulateLogin, simulateSignup, storeAuthData } from './utils';
import { AUTH_CONFIG } from './constants';
import type { LoginData, SignupData } from './types';

/**
 * Custom hook for password visibility toggle
 */
export const usePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);
  
  return {
    showPassword,
    togglePasswordVisibility
  };
};

/**
 * Custom hook for authentication form state
 */
export const useAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);
  
  const addError = useCallback((error: string) => {
    setErrors(prev => [...prev, error]);
  }, []);
  
  return {
    isLoading,
    setIsLoading,
    errors,
    setErrors,
    clearErrors,
    addError
  };
};

/**
 * Custom hook for login functionality
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading, errors, setErrors, clearErrors } = useAuthForm();
  
  const login = useCallback(async (data: LoginData) => {
    setIsLoading(true);
    clearErrors();
    
    try {
      const result = await simulateLogin(data);
      
      console.log('Login successful (simulated):', result);
      
      // Store auth data
      storeAuthData(result);
      
      // Navigate to dashboard
      navigate(AUTH_CONFIG.dashboardRoute, { state: { from: AUTH_CONFIG.loginRoute } });
      
      return result;
    } catch (error) {
      console.error('Login error:', error);
      setErrors(['Login failed. Please try again.']);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, setIsLoading, clearErrors, setErrors]);
  
  return {
    login,
    isLoading,
    errors
  };
};

/**
 * Custom hook for signup functionality
 */
export const useSignup = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading, errors, setErrors, clearErrors } = useAuthForm();
  
  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    clearErrors();
    
    try {
      const result = await simulateSignup(data);
      
      console.log('Registration successful (simulated):', result);
      
      // Store auth data
      storeAuthData(result);
      
      // Navigate to dashboard
      navigate(AUTH_CONFIG.dashboardRoute, { state: { from: AUTH_CONFIG.signupRoute } });
      
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      setErrors(['Registration failed. Please try again.']);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, setIsLoading, clearErrors, setErrors]);
  
  return {
    signup,
    isLoading,
    errors
  };
};
