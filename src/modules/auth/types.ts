// Auth module types
export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface AuthResult {
  success: boolean;
  user: AuthUser;
  token: string;
}

export interface AuthFormProps {
  className?: string;
}

export interface PasswordFieldProps {
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}
