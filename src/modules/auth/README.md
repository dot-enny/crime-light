# Auth Module

This module provides a complete authentication system with reusable components, hooks, and utilities following a modular architecture pattern.

## Structure

```
src/modules/auth/
├── index.ts           # Public API exports
├── types.ts           # TypeScript interfaces and types
├── constants.ts       # Configuration and constants
├── utils.ts           # Pure utility functions
├── hooks.ts           # Custom React hooks
├── components.tsx     # Reusable UI components
├── forms/
│   ├── LoginForm.tsx  # Login form component
│   └── SignupForm.tsx # Signup form component
└── README.md         # This file
```

## Files Overview

### `types.ts`
TypeScript interfaces for:
- **AuthUser**: User data structure
- **LoginData**, **SignupData**: Form data interfaces
- **AuthResult**: Authentication result structure
- **Component Props**: Props for reusable components

### `constants.ts`
Configuration values and constants:
- **AUTH_CONFIG**: API delays, routes, storage keys
- **AUTH_VALIDATION**: Validation rules and regex patterns
- **AUTH_MESSAGES**: User-facing messages
- **USER_ROLES**: Available user roles
- **CARD_STYLES**: Consistent styling classes

### `utils.ts`
Pure utility functions:
- **Validation**: `validateEmail()`, `validatePassword()`
- **Simulation**: `simulateLogin()`, `simulateSignup()`
- **Storage**: `storeAuthData()`, `getAuthData()`, `clearAuthData()`
- **Form validation**: `validateLoginForm()`, `validateSignupForm()`

### `hooks.ts`
Custom React hooks:
- **usePasswordVisibility()**: Password show/hide functionality
- **useAuthForm()**: Common form state management
- **useLogin()**: Login logic and state
- **useSignup()**: Signup logic and state

### `components.tsx`
Reusable UI components:
- **AuthCard**: Consistent card wrapper for auth forms
- **PasswordField**: Password input with visibility toggle
- **FormField**: Form field wrapper with label and error handling
- **SubmitButton**: Button with loading states
- **ErrorDisplay**: Error message display

### `forms/`
Form components:
- **LoginForm**: Complete login form
- **SignupForm**: Complete signup form

## Usage

### Basic Form Usage
```tsx
import { LoginForm, SignupForm } from './auth'

// Use in auth pages
<LoginForm />
<SignupForm />
```

### Using Individual Components
```tsx
import { AuthCard, PasswordField, useLogin } from './auth'

function CustomLoginForm() {
  const { login, isLoading } = useLogin()
  
  return (
    <AuthCard title="Login" description="Sign in to continue">
      {/* Custom form implementation */}
    </AuthCard>
  )
}
```

### Using Hooks
```tsx
import { usePasswordVisibility, useAuthForm } from './auth'

function CustomComponent() {
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility()
  const { isLoading, errors } = useAuthForm()
  
  // Component logic
}
```

## Features

- **Modular Architecture**: Clean separation of concerns
- **Type Safety**: Full TypeScript support
- **Reusable Components**: Consistent UI components
- **Custom Hooks**: Encapsulated business logic
- **Error Handling**: Comprehensive error display
- **Form Validation**: Built-in validation utilities
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Benefits

1. **DRY Principle**: No code duplication between forms
2. **Consistency**: Shared components ensure uniform styling
3. **Maintainability**: Changes in one place affect all forms
4. **Testability**: Each function and hook can be unit tested
5. **Extensibility**: Easy to add new auth forms or features
6. **Type Safety**: Full TypeScript coverage prevents errors

## Testing

Each module component can be independently tested:
- **utils.ts**: Unit tests for pure functions
- **hooks.ts**: React hook testing with `@testing-library/react-hooks`
- **components.tsx**: Component testing with `@testing-library/react`
- **forms/**: Integration tests for complete forms
