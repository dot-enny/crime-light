import { Shield } from "lucide-react";
import AlertCard from "./AlertCard";

interface AlertsSectionProps {
  dismissedAlerts: number[];
  onDismissAlert: (id: number) => void;
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

export default function AlertsSection({ dismissedAlerts, onDismissAlert }: AlertsSectionProps) {
  const hasAllAlertsDismissed = alertsData.every(alert => dismissedAlerts.includes(alert.id));

  return (
    <div className="mb-6 md:mb-8">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Shield size={20} className="text-orange-500" />
        Recent Alerts
      </h3>
      <div className="space-y-3">
        {alertsData.map(alert => (
          <AlertCard
            key={alert.id}
            {...alert}
            isDismissed={dismissedAlerts.includes(alert.id)}
            onDismiss={onDismissAlert}
          />
        ))}
        
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
