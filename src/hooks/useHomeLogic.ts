// Custom hook for Home page logic
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseHomeLogicReturn {
  // Analysis modal
  isAnalysisVisible: boolean;
  showAnalysis: () => void;
  setIsAnalysisVisible: (visible: boolean) => void;
  
  // Alerts
  dismissedAlerts: number[];
  dismissAlert: (alertId: number) => void;
  
  // Search
  searchValue: string;
  setSearchValue: (value: string) => void;
  
  // Quick actions
  handleEmergencyCall: () => void;
  handleReportIncident: () => void;
  handleShareLocation: () => void;
  handleRequestEscort: () => void;
}

export function useHomeLogic(): UseHomeLogicReturn {
  const navigate = useNavigate();
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const showAnalysis = useCallback(() => {
    setIsAnalysisVisible(!isAnalysisVisible);
  }, [isAnalysisVisible]);

  const dismissAlert = useCallback((alertId: number) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  }, []);

  // Quick action handlers - these would typically integrate with external services
  const handleEmergencyCall = useCallback(() => {
    console.log('Emergency call initiated');
    // TODO: Integrate with emergency services
  }, []);

  const handleReportIncident = useCallback(() => {
    console.log('Navigating to report incident');
    navigate('/dashboard/make-report');
  }, [navigate]);

  const handleShareLocation = useCallback(() => {
    console.log('Share location');
    // TODO: Share current location with trusted contacts
  }, []);

  const handleRequestEscort = useCallback(() => {
    console.log('Request escort');
    // TODO: Request safety escort service
  }, []);

  return {
    isAnalysisVisible,
    showAnalysis,
    setIsAnalysisVisible,
    dismissedAlerts,
    dismissAlert,
    searchValue,
    setSearchValue,
    handleEmergencyCall,
    handleReportIncident,
    handleShareLocation,
    handleRequestEscort
  };
}
