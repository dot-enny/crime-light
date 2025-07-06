import { MapPin } from "lucide-react";

interface LocationCardProps {
  currentTime: string;
  location: string;
  riskRating: {
    level: 'Low' | 'Medium' | 'High';
    percentage: number;
    color: string;
  };
  alwaysAnimate?: boolean;
}

export default function LocationCard({ currentTime, location, riskRating, alwaysAnimate = false }: LocationCardProps) {
  return (
    <div className="rounded-lg p-3 md:p-4 mb-4 md:mb-6 inline-block w-full sm:w-auto relative">
      {/* Animated border - starts solid, becomes animated */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          rx="8"
          style={{
            animation: alwaysAnimate ? 'drawBorder 8s ease-in-out infinite' : 'none',
            animationDelay: alwaysAnimate ? '50ms' : '0ms',
            filter: 'drop-shadow(0 0 6px rgba(34, 197, 94, 0.3))'
          }}
        />
      </svg>
      <div className="text-2xl md:text-3xl font-bold mb-2">{currentTime}</div>
      <div className="flex items-center gap-2 text-sm">
        <MapPin 
          size={16} 
          className={alwaysAnimate ? 'animate-bounce' : ''}
          style={{ animationDuration: '3s' }}
        />
        <span>{location}</span>
      </div>
      <div className="mt-3 text-sm">
        <span className="text-gray-300">Risk Rating: </span>
        <span className={`${riskRating.color} font-medium ${
          alwaysAnimate 
            ? 'animate-pulse transition-all duration-1000' 
            : ''
        }`}>
          {riskRating.level} - {riskRating.percentage}%
        </span>
      </div>
    </div>
  );
}
