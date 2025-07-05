import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to determine if entrance animations should be triggered
 * based on navigation context. Animations only trigger when entering
 * the dashboard from outside (landing page, auth, direct URL) not when
 * navigating between dashboard routes.
 */
export const useFirstLoadAnimation = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if we're entering from outside the dashboard
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
  }, [location]);

  return {
    shouldAnimate,
    isVisible
  };
};
