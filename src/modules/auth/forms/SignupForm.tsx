import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { useSignup, usePasswordVisibility } from '../hooks';
import { AuthCard, PasswordField, FormField, SubmitButton, ErrorDisplay } from '../components';
import { AUTH_CONFIG, USER_ROLES } from '../constants';
import type { AuthFormProps } from '../types';

export function SignupForm({ className, ...props }: AuthFormProps & React.ComponentProps<"div">) {
  const [role, setRole] = useState<string>("");
  const { signup, isLoading, errors } = useSignup();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      username: (form.elements.namedItem("username") as HTMLInputElement)?.value,
      password: (form.elements.namedItem("password") as HTMLInputElement)?.value,
      role: role,
    };
    
    await signup(data);
  };

  return (
    <AuthCard
      title="Create your account"
      description="Enter your email below to signup"
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
          
          <FormField label="Username" id="username">
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
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
          
          <FormField label="Role" id="role">
            <Select value={role} onValueChange={setRole} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 text-white">
                <SelectItem value={USER_ROLES.USER}>User</SelectItem>
                <SelectItem value={USER_ROLES.ADMIN}>Admin</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <SubmitButton isLoading={isLoading} loadingText="Creating account...">
            Continue
          </SubmitButton>
        </div>
        
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={AUTH_CONFIG.loginRoute} className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
