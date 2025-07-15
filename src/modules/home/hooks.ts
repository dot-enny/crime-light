import { useEffect, useState, useCallback } from "react";
import type { SimulatedAlert } from "./constants";
import {
  ANIMATION_CONFIG,
  ALERT_SIMULATION_CONFIG,
  SIMULATED_ALERTS_POOL
} from "./constants";
import { getRandomInterval, createAlertTimestamp } from "./helpers";

/**
 * Custom hook to manage the "always animate" state
 * Triggers after a configured delay to enable subtle animations
 */
export const useAlwaysAnimate = () => {
  const [alwaysAnimate, setAlwaysAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlwaysAnimate(true);
    }, ANIMATION_CONFIG.alwaysAnimateDelay);
    
    return () => clearTimeout(timer);
  }, []);
  
  return alwaysAnimate;
};

/**
 * Custom hook to manage simulated alerts system
 * Handles alert creation, timing, and dismissal logic
 */
export const useSimulatedAlerts = () => {
  const [simulatedAlertsList, setSimulatedAlertsList] = useState<SimulatedAlert[]>([]);
  
  // Alert simulation system
  useEffect(() => {
    let alertIndex = 0;
    
    const addNewAlert = () => {
      if (alertIndex < SIMULATED_ALERTS_POOL.length) {
        const alert = SIMULATED_ALERTS_POOL[alertIndex];
        const timestamp = createAlertTimestamp();
        
        setSimulatedAlertsList(prev => [{
          ...alert,
          timestamp,
          isNew: true
        }, ...prev]);
        
        // Remove the "isNew" flag after animation
        setTimeout(() => {
          setSimulatedAlertsList(prev => 
            prev.map(a => a.id === alert.id ? { ...a, isNew: false } : a)
          );
        }, ALERT_SIMULATION_CONFIG.newFlagDuration);
        
        alertIndex++;
      }
    };
    
    // Start adding alerts after configured delay, then at random intervals
    const firstTimeout = setTimeout(addNewAlert, ALERT_SIMULATION_CONFIG.firstDelay);
    
    const intervalId = setInterval(() => {
      addNewAlert();
    }, getRandomInterval(ALERT_SIMULATION_CONFIG.minInterval, ALERT_SIMULATION_CONFIG.maxInterval));
    
    return () => {
      clearTimeout(firstTimeout);
      clearInterval(intervalId);
    };
  }, []);

  // Handler for dismissing simulated alerts
  const handleDismissSimulatedAlert = useCallback((id: number) => {
    setSimulatedAlertsList(prev => prev.filter(alert => alert.id !== id));
  }, []);

  return {
    simulatedAlertsList,
    handleDismissSimulatedAlert
  };
};
