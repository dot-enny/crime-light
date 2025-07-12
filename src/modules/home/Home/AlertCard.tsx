import { AlertTriangle, Clock } from "lucide-react";

interface AlertCardProps {
  id: number;
  type: 'warning' | 'info';
  timestamp: string;
  message: string;
  distance?: string;
  isDismissed: boolean;
  onDismiss: (id: number) => void;
}

export default function AlertCard({ id, type, timestamp, message, distance, isDismissed, onDismiss }: AlertCardProps) {
  if (isDismissed) return null;

  const isWarning = type === 'warning';
  const bgColor = isWarning ? 'bg-orange-900/30' : 'bg-yellow-900/30';
  const borderColor = isWarning ? 'border-orange-500/40' : 'border-yellow-500/40';
  const textColor = isWarning ? 'text-orange-200' : 'text-yellow-200';
  const iconColor = isWarning ? 'text-orange-400' : 'text-yellow-400';
  const dismissColor = isWarning ? 'text-orange-400 hover:text-orange-300' : 'text-yellow-400 hover:text-yellow-300';
  const distanceColor = isWarning ? 'text-orange-300/80' : 'text-yellow-300/80';

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-3 flex items-start gap-3`}>
      {isWarning ? (
        <AlertTriangle size={16} className={`${iconColor} flex-shrink-0 mt-0.5`} />
      ) : (
        <Clock size={16} className={`${iconColor} flex-shrink-0 mt-0.5`} />
      )}
      <div className="flex-1">
        <p className={`${textColor} text-sm`}>
          <span className="font-medium">{timestamp}:</span> {message}
        </p>
        {distance && (
          <p className={`${distanceColor} text-xs mt-1`}>{distance}</p>
        )}
      </div>
      <button 
        onClick={() => onDismiss(id)}
        className={`${dismissColor} flex-shrink-0 cursor-pointer text-2xl md:text-3xl leading-none -mt-1 md:-mt-2 -mr-1`}
      >×</button>
    </div>
  );
}
