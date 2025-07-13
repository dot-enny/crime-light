import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../shared/ui';
import { useLogin, usePasswordVisibility } from '../hooks';
import { AuthCard, PasswordField, FormField, SubmitButton, ErrorDisplay } from '../components';
import { AUTH_CONFIG } from '../constants';
import type { AuthFormProps } from '../types';

export function LoginForm({ className, ...props }: AuthFormProps & React.ComponentProps<"div">) {
  const { login, isLoading, errors } = useLogin();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    
    await login(data);
  };

  return (
    <AuthCard
      title="Login to your account"
      description="Enter your email below to login to your account"
      className={className}
      {...props}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <ErrorDisplay errors={errors} />
          
          <FormField label="Email" id="email">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </FormField>
          
          <FormField label="Password" id="password">
            <PasswordField
              id="password"
              name="password"
              showPassword={showPassword}
              onToggleVisibility={togglePasswordVisibility}
              required
            />
          </FormField>
          
          <SubmitButton isLoading={isLoading} loadingText="Logging in...">
            Login
          </SubmitButton>
        </div>
        
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={AUTH_CONFIG.signupRoute} className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
