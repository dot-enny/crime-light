import { Shield } from "lucide-react";
import { useState } from "react";
import AlertCard from "./AlertCard";

interface AlertsSectionProps {
  dismissedAlerts: number[];
  onDismissAlert: (id: number) => void;
  alwaysAnimate?: boolean;
}

const alertsData = [
  {
    id: 1,
    type: 'warning' as const,
    timestamp: '3 mins ago',
    message: 'Pickpocketing reported near Yaba Market',
    distance: 'Distance: 0.8km from your location'
  },
  {
    id: 2,
    type: 'info' as const,
    timestamp: '15 mins ago',
    message: 'Avoid Herbert Macaulay - Heavy traffic',
    distance: 'Alternative routes available'
  }
];

export default function AlertsSection({ dismissedAlerts, onDismissAlert, alwaysAnimate = false }: AlertsSectionProps) {
  const [dismissingAlerts, setDismissingAlerts] = useState<Set<number>>(new Set());
  const hasAllAlertsDismissed = alertsData.every(alert => dismissedAlerts.includes(alert.id));

  const handleDismiss = (id: number) => {
    // Mark alert as dismissing
    setDismissingAlerts(prev => new Set(prev).add(id));
    
    // After animation completes, actually remove the alert
    setTimeout(() => {
      onDismissAlert(id);
      setDismissingAlerts(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  };

  return (
    <div className="mb-6 md:mb-8">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        {alwaysAnimate ? (
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-orange-500"
          >
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="100"
              strokeDashoffset="100"
              style={{
                animation: 'drawShield 6s infinite ease-in-out'
              }}
            />
          </svg>
        ) : (
          <Shield size={20} className="text-orange-500" />
        )}
        Recent Alerts
      </h3>
      <div className="space-y-3">
        {alertsData.map(alert => {
          const isDismissed = dismissedAlerts.includes(alert.id);
          const isDismissing = dismissingAlerts.has(alert.id);
          
          if (isDismissed) return null;
          
          return (
            <div
              key={alert.id}
              className={`transition-all duration-300 ease-in-out ${
                isDismissing 
                  ? 'opacity-0 scale-95 -translate-y-2 mb-0 overflow-hidden max-h-0' 
                  : 'opacity-100 scale-100 translate-y-0 mb-3 max-h-96'
              }`}
              style={{
                marginBottom: isDismissing ? '0px' : '12px'
              }}
            >
              <AlertCard
                {...alert}
                isDismissed={false}
                onDismiss={handleDismiss}
              />
            </div>
          );
        })}
        
        {/* Empty State */}
        {hasAllAlertsDismissed && (
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6 text-center">
            <Shield size={32} className="text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 text-sm mb-2">All caught up!</p>
            <p className="text-gray-500 text-xs">No recent alerts in your area. Stay safe out there.</p>
          </div>
        )}
      </div>
    </div>
  );
}
