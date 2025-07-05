import type { TrendAnalysisProps } from "../../types/incidents"
import { calculateTrend } from "../../utils/incidentUtils"

export default function TrendAnalysis({ data, selectedPeriod }: TrendAnalysisProps) {
  const trendPercent = calculateTrend(data)

  return (
    <div className="bg-gray-800 p-3 sm:p-4 rounded-lg">
      <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Trend Analysis</h4>
      <div className="text-xs sm:text-sm text-gray-300">
        {trendPercent > 0 ? (
          <span className="text-red-400">
            📈 Crime rate increased by {trendPercent}% in this {selectedPeriod} period
          </span>
        ) : (
          <span className="text-green-400">
            📉 Crime rate decreased by {Math.abs(trendPercent)}% in this {selectedPeriod} period
          </span>
        )}
      </div>
    </div>
  )
}
