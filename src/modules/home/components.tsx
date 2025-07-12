import React from "react";
import { BACKGROUND_PATTERN_STYLE } from "./constants";

// Background Pattern Component
export const BackgroundPattern = () => (
  <div
    className="absolute inset-0 opacity-20 pointer-events-none"
    style={BACKGROUND_PATTERN_STYLE}
  />
);

// Animated Section Wrapper Component
interface AnimatedSectionProps {
  children: React.ReactNode;
  className: string;
}

export const AnimatedSection = ({ children, className }: AnimatedSectionProps) => (
  <div className={className}>
    {children}
  </div>
);

// Greeting Component
interface GreetingProps {
  className: string;
  userName?: string;
  weatherInfo?: string;
}

export const Greeting = ({ 
  className, 
  userName = "John", 
  weatherInfo = "Sunny day out" 
}: GreetingProps) => (
  <h2 className={`text-xl md:text-2xl font-light mb-6 md:mb-8 ${className}`}>
    Hello, {userName}. {weatherInfo}.
  </h2>
);

// Main Content Container
interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => (
  <div className="flex-1 order-1 lg:order-1">
    {children}
  </div>
);

// Sidebar Container
interface SidebarContainerProps {
  children: React.ReactNode;
  className: string;
}

export const SidebarContainer = ({ children, className }: SidebarContainerProps) => (
  <div className={`w-full lg:w-80 order-2 lg:order-2 ${className}`}>
    {children}
  </div>
);
