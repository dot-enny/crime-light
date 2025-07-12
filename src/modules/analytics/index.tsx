import { Card } from "../../components/ui/card"
import { useState, useEffect } from "react"
import type { 
  DataPoint, 
  TimePeriod, 
  IncidentsAnalysisProps
} from "../../types/incidents"
import { 
  ANIMATION_DURATION,
  LIVE_UPDATE_INTERVAL
} from "../../types/incidents"
import { calculateRiskRating, applyRandomFluctuation } from "../../utils/incidentUtils"
import { incidentDataByPeriod } from "../../data/incidentData"

// Import child components
import RiskRatingDisplay from "./RiskRatingDisplay"
import TimePeriodSelector from "./TimePeriodSelector"
import IncidentChart from "./IncidentChart"
import DataInsightsPanel from "./DataInsightsPanel"
import QuickStatsGrid from "./QuickStatsGrid"
import TrendAnalysis from "./TrendAnalysis"
import ChartLegend from "./ChartLegend"

export default function IncidentsAnalysis({ setIsOpen }: IncidentsAnalysisProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("1D")
  const [currentData, setCurrentData] = useState<DataPoint[]>(incidentDataByPeriod["1D"])
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [selectedDataPoint, setSelectedDataPoint] = useState<DataPoint | null>(null)
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false)

  const { riskPercentage, riskLevel, riskColor } = calculateRiskRating(currentData)

  // Handle time period change
  const handlePeriodChange = (period: TimePeriod): void => {
    if (period === selectedPeriod) return
    
    setIsAnimating(true)
    setSelectedPeriod(period)
    
    setTimeout(() => {
      setCurrentData(incidentDataByPeriod[period])
      setIsAnimating(false)
    }, ANIMATION_DURATION)
  }

  // Handle live mode toggle
  const handleToggleLiveMode = (): void => {
    setIsLiveMode(prev => !prev)
  }

  // Handle data point selection
  const handleDataPointSelect = (dataPoint: DataPoint): void => {
    setSelectedDataPoint(dataPoint)
  }

  // Simulate live updates
  useEffect(() => {
    if (!isLiveMode) return
    
    const interval = setInterval(() => {
      setCurrentData(prevData => 
        prevData.map(item => ({
          ...item,
          current: applyRandomFluctuation(item.current, 20),
          predicted: applyRandomFluctuation(item.predicted, 15)
        }))
      )
    }, LIVE_UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [isLiveMode])

  return (
    <div className="">
      {/* Main Dashboard Card */}
      <Card className="bg-black text-white p-3 sm:p-6 rounded-xl relative">
        {/* Close Icon Button */}
        {setIsOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 focus:outline-none z-10 cursor-pointer"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <div className="space-y-4 sm:space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-lg sm:text-xl font-semibold mb-2">INCIDENTS ANALYSIS</h1>
            <p className="text-gray-300 text-xs sm:text-sm">Herbert Macaulay Way, Yaba. 3:34PM</p>
          </div>

          {/* Risk Rating and Time Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <RiskRatingDisplay
              riskPercentage={riskPercentage}
              riskLevel={riskLevel}
              riskColor={riskColor}
              isLiveMode={isLiveMode}
              onToggleLiveMode={handleToggleLiveMode}
            />
            
            <TimePeriodSelector
              selectedPeriod={selectedPeriod}
              isAnimating={isAnimating}
              onPeriodChange={handlePeriodChange}
            />
          </div>

          {/* Chart */}
          <IncidentChart
            data={currentData}
            isAnimating={isAnimating}
            onDataPointSelect={handleDataPointSelect}
          />

          {/* Data Insights */}
          <DataInsightsPanel selectedDataPoint={selectedDataPoint} />

          {/* Legend and Quick Stats */}
          <div className="space-y-4">
            <ChartLegend />
            <QuickStatsGrid data={currentData} />
            <TrendAnalysis data={currentData} selectedPeriod={selectedPeriod} />
          </div>
        </div>
      </Card>
    </div>
  )
}
