import type { QuickStatsGridProps } from "../shared/types/incidents"

export default function QuickStatsGrid({ data }: QuickStatsGridProps) {
  const avgIncidents = Math.round(data.reduce((acc, item) => acc + item.average, 0) / data.length)
  const peakCurrent = Math.max(...data.map(item => item.current))
  const avgPredicted = Math.round(data.reduce((acc, item) => acc + item.predicted, 0) / data.length)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
      <div className="bg-gray-800 p-3 rounded-lg">
        <div className="text-cyan-400 text-lg sm:text-xl font-semibold">
          {avgIncidents}
        </div>
        <div className="text-gray-400 text-xs">Avg Incidents</div>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg">
        <div className="text-red-400 text-lg sm:text-xl font-semibold">
          {peakCurrent}
        </div>
        <div className="text-gray-400 text-xs">Peak Current</div>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg">
        <div className="text-purple-400 text-lg sm:text-xl font-semibold">
          {avgPredicted}
        </div>
        <div className="text-gray-400 text-xs">Avg Predicted</div>
      </div>
    </div>
  )
}
