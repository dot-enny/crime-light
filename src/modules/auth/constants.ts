// Auth module constants
export const AUTH_CONFIG = {
  // Simulation delays
  loginDelay: 1000,
  signupDelay: 1200,
  
  // Routes
  loginRoute: '/auth/sign-in',
  signupRoute: '/auth/sign-up',
  dashboardRoute: '/dashboard',
  
  // Local storage keys
  tokenKey: 'authToken',
  userDataKey: 'userData',
} as const;

export const AUTH_VALIDATION = {
  minPasswordLength: 6,
  maxPasswordLength: 128,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export const AUTH_MESSAGES = {
  loginSuccess: 'Login successful',
  signupSuccess: 'Registration successful',
  loginError: 'Login failed',
  signupError: 'Registration failed',
  invalidEmail: 'Please enter a valid email address',
  passwordTooShort: `Password must be at least ${AUTH_VALIDATION.minPasswordLength} characters`,
  requiredField: 'This field is required',
} as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export const CARD_STYLES = {
  base: "frosted-glass bg-transparent border-none sm:bg-neutral-900 text-white sm:border-neutral-800",
  container: "flex flex-col gap-6 sm:min-w-sm",
} as const;
