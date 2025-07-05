import type { RiskRatingDisplayProps } from "../../types/incidents"

export default function RiskRatingDisplay({
  riskPercentage,
  riskLevel,
  riskColor,
  isLiveMode,
  onToggleLiveMode
}: RiskRatingDisplayProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-300 text-xs sm:text-sm">Overall Risk Rating:</span>
        <span className={`${riskColor} font-medium text-sm`}>
          {riskPercentage}% - {riskLevel}
        </span>
      </div>
      
      {/* Live Mode Toggle */}
      <button
        onClick={onToggleLiveMode}
        className={`
          relative px-4 py-2 rounded-lg text-xs font-semibold 
          transition-all duration-200 ease-in-out self-start
          border-2 cursor-pointer
          hover:scale-105 hover:shadow-lg active:scale-95
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800
          ${isLiveMode 
            ? 'bg-green-600 border-green-500 text-white hover:bg-green-500 focus:ring-green-400 shadow-green-900/30' 
            : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500 hover:text-white focus:ring-gray-400'
          }
        `}
        title={isLiveMode ? "Click to switch to static mode" : "Click to enable live updates"}
      >
        <span className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-red-400 animate-pulse' : 'bg-gray-500'}`}></span>
          {isLiveMode ? 'LIVE' : 'STATIC'}
        </span>
      </button>
    </div>
  )
}
