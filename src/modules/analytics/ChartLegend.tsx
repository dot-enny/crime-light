import type { ChartLegendProps } from "../shared/types/incidents"

export default function ChartLegend({}: ChartLegendProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-0.5 bg-cyan-400"></div>
        <span className="text-gray-300 text-xs sm:text-sm">Average</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-0.5 bg-red-400"></div>
        <span className="text-gray-300 text-xs sm:text-sm">Current</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-0.5 bg-purple-400" style={{ borderStyle: 'dashed' }}></div>
        <span className="text-gray-300 text-xs sm:text-sm">Predicted</span>
      </div>
    </div>
  )
}
