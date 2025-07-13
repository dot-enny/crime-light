import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../shared/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/ui';
import { Input } from '../shared/ui';
import { Label } from '../shared/ui';
import { cn } from '../shared/utils';
import { CARD_STYLES } from './constants';
import type { AuthCardProps, PasswordFieldProps } from './types';

/**
 * Reusable Auth Card component
 */
export const AuthCard = ({ title, description, children, className, ...props }: AuthCardProps & React.ComponentProps<"div">) => (
  <div className={cn(CARD_STYLES.container, className)} {...props}>
    <Card className={CARD_STYLES.base}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  </div>
);

/**
 * Reusable Password Field component with visibility toggle
 */
export const PasswordField = ({ 
  id, 
  name, 
  value, 
  placeholder = "Enter your password",
  required = false,
  className,
  showPassword,
  onToggleVisibility,
  ...props 
}: PasswordFieldProps & {
  showPassword: boolean;
  onToggleVisibility: () => void;
} & React.ComponentProps<"input">) => (
  <div className="relative">
    <Input 
      id={id}
      name={name}
      type={showPassword ? "text" : "password"}
      value={value}
      placeholder={placeholder}
      required={required}
      className={cn("pr-10", className)}
      {...props}
    />
    <button
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
      onClick={onToggleVisibility}
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>
);

/**
 * Reusable Form Field component
 */
export const FormField = ({ 
  label, 
  id, 
  error, 
  children 
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="grid gap-3">
    <Label htmlFor={id}>{label}</Label>
    {children}
    {error && <p className="text-sm text-red-400">{error}</p>}
  </div>
);

/**
 * Reusable Submit Button component
 */
export const SubmitButton = ({ 
  isLoading, 
  children, 
  loadingText = "Processing...",
  ...props 
}: {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
} & React.ComponentProps<typeof Button>) => (
  <Button 
    variant="outline" 
    className="w-full text-black cursor-pointer mt-6"
    type="submit"
    disabled={isLoading}
    {...props}
  >
    {isLoading ? (
      <div className="flex items-center gap-2">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
        {loadingText}
      </div>
    ) : (
      children
    )}
  </Button>
);

/**
 * Error Display component
 */
export const ErrorDisplay = ({ errors }: { errors: string[] }) => {
  if (errors.length === 0) return null;
  
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
      <ul className="text-sm text-red-400 space-y-1">
        {errors.map((error, index) => (
          <li key={index}>• {error}</li>
        ))}
      </ul>
    </div>
  );
};
