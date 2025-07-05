import { AlertTriangle } from "lucide-react";

interface MapViewProps {
  dismissedAlerts: number[];
  onDismissAlert: (id: number) => void;
}

export default function MapView({ dismissedAlerts, onDismissAlert }: MapViewProps) {
  const isMapAlertDismissed = dismissedAlerts.includes(3);

  return (
    <div className="mb-6 lg:mb-0">
      <h3 className="text-lg md:text-xl font-medium mb-2">BIRD'S EYE</h3>
      <p className="text-gray-400 text-sm mb-4">Set to: Home ▼</p>

      {/* Map Container */}
      <div className="bg-gray-800 rounded-lg p-3 md:p-4 w-full max-w-lg lg:w-96">
        {/* Alert Banner */}
        {!isMapAlertDismissed && (
          <div className="bg-orange-100 border border-orange-300 rounded px-3 py-2 mb-4 flex items-center gap-2">
            <AlertTriangle size={16} className="text-orange-600 flex-shrink-0" />
            <span className="text-orange-800 text-sm flex-1">Increased loitering around Range</span>
            <button 
              onClick={() => onDismissAlert(3)}
              className="text-orange-600 flex-shrink-0 hover:text-orange-700 cursor-pointer text-lg md:text-xl leading-none -mt-1 -mr-1"
            >×</button>
          </div>
        )}

        {/* Map Placeholder */}
        <div className="bg-gray-700 rounded h-48 md:h-64 relative overflow-hidden">
          {/* Simulated map with roads */}
          <div className="absolute inset-0">
            {/* Road lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-600 transform -rotate-12"></div>
            <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-gray-600 transform rotate-45"></div>
            <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gray-600 transform -rotate-45"></div>
            <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-gray-600 transform rotate-12"></div>
            <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-gray-600 transform -rotate-12"></div>

            {/* Location markers */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"></div>
            <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="absolute top-2/3 left-3/4 w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-orange-500 rounded-full"></div>

            {/* Area labels */}
            <div className="absolute top-6 left-6 text-xs text-gray-400">SURULERE</div>
            <div className="absolute bottom-6 right-6 text-xs text-gray-400">YABA</div>
            <div className="absolute bottom-6 left-6 text-xs text-gray-400">HERBERT MACAULAY</div>
          </div>
        </div>
      </div>
    </div>
  );
}
