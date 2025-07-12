import { Button } from "../../components/ui/button"
import type { TimePeriodSelectorProps, TimePeriod } from "../../types/incidents"

const TIME_PERIODS: readonly TimePeriod[] = ["1D", "1W", "1M", "3M"] as const

export default function TimePeriodSelector({
  selectedPeriod,
  isAnimating,
  onPeriodChange
}: TimePeriodSelectorProps) {
  return (
    <div className="flex bg-gray-800 rounded-lg p-1 overflow-x-auto">
      {TIME_PERIODS.map((period) => (
        <Button 
          key={period}
          variant="ghost" 
          size="sm" 
          onClick={() => onPeriodChange(period)}
          className={`text-xs px-2 sm:px-3 py-1 transition-all duration-200 whitespace-nowrap ${
            selectedPeriod === period
              ? 'bg-gray-600 text-white hover:bg-gray-500' 
              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          } ${isAnimating ? 'opacity-50' : ''}`}
          disabled={isAnimating}
        >
          {period}
        </Button>
      ))}
    </div>
  )
}
