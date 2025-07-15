import type { DataInsightsPanelProps } from "../shared/types/incidents"

export default function DataInsightsPanel({ selectedDataPoint }: DataInsightsPanelProps) {
  if (!selectedDataPoint) return null

  return (
    <div className="bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-600 animate-in slide-in-from-bottom-2">
      <h3 className="text-white font-medium mb-2 text-sm sm:text-base">
        Time Period: {selectedDataPoint.time}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-sm">
        <div className="flex justify-between sm:block">
          <span className="text-cyan-400">Average: </span>
          <span className="text-white">{selectedDataPoint.average}</span>
        </div>
        <div className="flex justify-between sm:block">
          <span className="text-red-400">Current: </span>
          <span className="text-white">{selectedDataPoint.current}</span>
        </div>
        <div className="flex justify-between sm:block">
          <span className="text-purple-400">Predicted: </span>
          <span className="text-white">{selectedDataPoint.predicted}</span>
        </div>
      </div>
      {selectedDataPoint.incidents && selectedDataPoint.incidents.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-gray-300 text-sm font-medium mb-1">Recent Incidents:</p>
          <ul className="text-gray-400 text-xs space-y-1">
            {selectedDataPoint.incidents.map((incident: string, idx: number) => (
              <li key={idx}>• {incident}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
