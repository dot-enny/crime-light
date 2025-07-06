import { Shield, AlertTriangle, Clock } from "lucide-react";

interface Alert {
  id: number;
  type: 'warning' | 'info';
  timestamp: string;
  message: string;
  distance: string;
  isNew?: boolean;
}

interface SimulatedAlertsSectionProps {
  alerts: Alert[];
  onDismissAlert: (id: number) => void;
  alwaysAnimate?: boolean;
}

function SimulatedAlertCard({ alert, onDismiss }: { alert: Alert; onDismiss: (id: number) => void }) {
  const isWarning = alert.type === 'warning';
  const bgColor = isWarning ? 'bg-orange-900/30' : 'bg-yellow-900/30';
  const borderColor = isWarning ? 'border-orange-500/40' : 'border-yellow-500/40';
  const textColor = isWarning ? 'text-orange-200' : 'text-yellow-200';
  const iconColor = isWarning ? 'text-orange-400' : 'text-yellow-400';
  const dismissColor = isWarning ? 'text-orange-400 hover:text-orange-300' : 'text-yellow-400 hover:text-yellow-300';
  const distanceColor = isWarning ? 'text-orange-300/80' : 'text-yellow-300/80';

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-3 flex items-start gap-3 transition-all duration-500 ease-out
      ${alert.isNew ? 'animate-pulse scale-105 shadow-lg' : 'scale-100'}`}>
      {isWarning ? (
        <AlertTriangle size={16} className={`${iconColor} flex-shrink-0 mt-0.5`} />
      ) : (
        <Clock size={16} className={`${iconColor} flex-shrink-0 mt-0.5`} />
      )}
      <div className="flex-1">
        <p className={`${textColor} text-sm`}>
          <span className="font-medium">{alert.timestamp}:</span> {alert.message}
        </p>
        <p className={`${distanceColor} text-xs mt-1`}>{alert.distance}</p>
      </div>
      <button 
        onClick={() => onDismiss(alert.id)}
        className={`${dismissColor} flex-shrink-0 cursor-pointer text-2xl md:text-3xl leading-none -mt-1 md:-mt-2 -mr-1`}
      >×</button>
    </div>
  );
}

export default function SimulatedAlertsSection({ alerts, onDismissAlert, alwaysAnimate = false }: SimulatedAlertsSectionProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="mb-6 md:mb-8">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        {alwaysAnimate ? (
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-red-500"
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
                animation: 'drawShield 4s infinite ease-in-out'
              }}
            />
          </svg>
        ) : (
          <Shield size={20} className="text-red-500" />
        )}
        Live Alerts
        {alerts.length > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            {alerts.length}
          </span>
        )}
      </h3>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={alert.id}
            className={`transition-all duration-700 ease-out ${
              alert.isNew 
                ? 'animate-slide-in-left opacity-100 translate-x-0' 
                : 'opacity-100 translate-x-0'
            }`}
            style={{ 
              animationDelay: alert.isNew ? `${index * 150}ms` : '0ms' 
            }}
          >
            <SimulatedAlertCard 
              alert={alert} 
              onDismiss={onDismissAlert}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
