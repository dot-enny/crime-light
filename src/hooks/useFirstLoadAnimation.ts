import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface AnimationOptions {
  /** Always animate regardless of navigation source */
  alwaysAnimate?: boolean;
  /** Only animate when entering from outside dashboard (default behavior) */
  onlyFromOutside?: boolean;
}

/**
 * Custom hook to determine if entrance animations should be triggered
 * based on navigation context and options.
 */
export const useFirstLoadAnimation = (options: AnimationOptions = { onlyFromOutside: true }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // If alwaysAnimate is true, always trigger animations
    if (options.alwaysAnimate) {
      setShouldAnimate(true);
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }

    // Default behavior: only animate from outside dashboard
    if (options.onlyFromOutside) {
      const fromState = location.state as { from?: string } | null;
      const isFromOutsideDashboard = !fromState?.from?.includes('/dashboard');
      
      // Also check if it's a fresh page load (no previous navigation state)
      const isFreshLoad = !location.state || !fromState?.from;
      
      // Animate if coming from outside dashboard or fresh load
      if (isFromOutsideDashboard || isFreshLoad) {
        setShouldAnimate(true);
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
      } else {
        // If navigating within dashboard, show content immediately
        setShouldAnimate(false);
        setIsVisible(true);
      }
    }
  }, [location, options.alwaysAnimate, options.onlyFromOutside]);

  return {
    shouldAnimate,
    isVisible
  };
};
