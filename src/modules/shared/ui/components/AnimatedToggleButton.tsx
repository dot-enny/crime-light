import React from 'react';

interface AnimatedToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  OpenIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  CloseIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  iconClassName?: string;
  srText?: string;
}

export default function AnimatedToggleButton({
  isOpen,
  onToggle,
  OpenIcon,
  CloseIcon,
  className = "",
  iconClassName = "h-6 w-6",
  srText = "Toggle menu"
}: AnimatedToggleButtonProps) {
  return (
    <button
      className={`p-2 rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 ${className}`}
      onClick={onToggle}
    >
      <span className="sr-only">{srText}</span>
      <div className="relative w-6 h-6">
        <OpenIcon 
          className={`${iconClassName} absolute transition-all duration-300 ${
            isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
          }`} 
        />
        <CloseIcon 
          className={`${iconClassName} absolute transition-all duration-300 ${
            isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
          }`} 
        />
      </div>
    </button>
  );
}
