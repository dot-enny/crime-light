import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { useState, useEffect } from "react"

const dataByPeriod = {
  "1D": [
    { time: "00:00", average: 74, current: 45, predicted: 52, incidents: ["Noise complaint", "Minor theft"] },
    { time: "01:00", average: 76, current: 48, predicted: 55, incidents: ["Public disturbance"] },
    { time: "02:00", average: 78, current: 50, predicted: 58, incidents: ["Vandalism"] },
    { time: "03:00", average: 75, current: 52, predicted: 60, incidents: ["Break-in attempt"] },
    { time: "04:00", average: 72, current: 45, predicted: 55, incidents: ["Suspicious activity"] },
    { time: "05:00", average: 70, current: 40, predicted: 50, incidents: [] },
    { time: "06:00", average: 85, current: 60, predicted: 70, incidents: ["Traffic incident", "Theft"] },
    { time: "07:00", average: 95, current: 75, predicted: 85, incidents: ["Assault", "Drug activity", "Robbery"] },
    { time: "08:00", average: 110, current: 95, predicted: 105, incidents: ["Multiple thefts", "Violence", "Gang activity"] },
    { time: "09:00", average: 125, current: 110, predicted: 120, incidents: ["Armed robbery", "Assault", "Drug dealing"] },
    { time: "10:00", average: 135, current: 120, predicted: 130, incidents: ["Multiple incidents", "High crime activity"] },
    { time: "11:00", average: 130, current: 115, predicted: 125, incidents: ["Ongoing investigation", "Security alert"] },
  ],
  "1W": [
    { time: "Mon", average: 85, current: 70, predicted: 80, incidents: ["Weekly pattern analysis"] },
    { time: "Tue", average: 92, current: 85, predicted: 90, incidents: ["Increased activity"] },
    { time: "Wed", average: 78, current: 65, predicted: 75, incidents: ["Mid-week decline"] },
    { time: "Thu", average: 88, current: 80, predicted: 85, incidents: ["Rising trend"] },
    { time: "Fri", average: 120, current: 110, predicted: 115, incidents: ["Weekend surge beginning"] },
    { time: "Sat", average: 150, current: 140, predicted: 145, incidents: ["Peak weekend activity"] },
    { time: "Sun", average: 95, current: 85, predicted: 90, incidents: ["Weekend wind down"] },
  ],
  "1M": [
    { time: "Week 1", average: 90, current: 80, predicted: 85, incidents: ["Monthly baseline"] },
    { time: "Week 2", average: 105, current: 95, predicted: 100, incidents: ["Escalating incidents"] },
    { time: "Week 3", average: 125, current: 115, predicted: 120, incidents: ["Peak activity period"] },
    { time: "Week 4", average: 110, current: 100, predicted: 105, incidents: ["Declining trend"] },
  ],
  "3M": [
    { time: "Month 1", average: 95, current: 85, predicted: 90, incidents: ["Quarterly start"] },
    { time: "Month 2", average: 115, current: 105, predicted: 110, incidents: ["Mid-quarter increase"] },
    { time: "Month 3", average: 108, current: 98, predicted: 103, incidents: ["Quarter end stabilization"] },
  ],
}

export default function IncidentsAnalysis({ setIsOpen }: { setIsOpen?: (val: boolean) => void }) {
  const [selectedPeriod, setSelectedPeriod] = useState<"1D" | "1W" | "1M" | "3M">("1D")
  const [currentData, setCurrentData] = useState(dataByPeriod["1D"])
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null)
  const [isLiveMode, setIsLiveMode] = useState(false)

  // Calculate risk rating based on current data
  const calculateRiskRating = (data: any[]) => {
    const avgCurrent = data.reduce((acc, item) => acc + item.current, 0) / data.length
    const riskPercentage = Math.min(Math.round((avgCurrent / 150) * 100), 100)
    
    let riskLevel = "Safe"
    let riskColor = "text-green-400"
    
    if (riskPercentage > 70) {
      riskLevel = "High Risk"
      riskColor = "text-red-400"
    } else if (riskPercentage > 40) {
      riskLevel = "Medium Risk"
      riskColor = "text-yellow-400"
    }
    
    return { riskPercentage, riskLevel, riskColor }
  }

  const { riskPercentage, riskLevel, riskColor } = calculateRiskRating(currentData)

  // Handle time period change
  const handlePeriodChange = (period: "1D" | "1W" | "1M" | "3M") => {
    if (period === selectedPeriod) return
    
    setIsAnimating(true)
    setSelectedPeriod(period)
    
    setTimeout(() => {
      setCurrentData(dataByPeriod[period])
      setIsAnimating(false)
    }, 300)
  }

  // Simulate live updates
  useEffect(() => {
    if (!isLiveMode) return
    
    const interval = setInterval(() => {
      setCurrentData(prevData => 
        prevData.map(item => ({
          ...item,
          current: Math.max(0, item.current + Math.random() * 20 - 10), // Random fluctuation
          predicted: Math.max(0, item.predicted + Math.random() * 15 - 7.5)
        }))
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [isLiveMode])

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-600 shadow-lg">
          <p className="text-white font-medium">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
          {data.incidents && data.incidents.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-600">
              <p className="text-gray-300 text-xs font-medium">Incidents:</p>
              {data.incidents.slice(0, 3).map((incident: string, idx: number) => (
                <p key={idx} className="text-gray-400 text-xs">• {incident}</p>
              ))}
              {data.incidents.length > 3 && (
                <p className="text-gray-500 text-xs">+{data.incidents.length - 3} more...</p>
              )}
            </div>
          )}
        </div>
      )
    }
    return null
  }
  return (
    <div className="">
      {/* Main Dashboard Card */}
      <Card className="bg-black text-white p-3 sm:p-6 rounded-xl relative">
        {/* Close Icon Button */}
        {setIsOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 focus:outline-none z-10"
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
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-300 text-xs sm:text-sm">Overall Risk Rating:</span>
                <span className={`${riskColor} font-medium text-sm`}>{riskPercentage}% - {riskLevel}</span>
              </div>
              
              {/* Live Mode Toggle */}
              <button
                onClick={() => setIsLiveMode(!isLiveMode)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors self-start ${
                  isLiveMode 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {isLiveMode ? '🔴 LIVE' : '⚫ STATIC'}
              </button>
            </div>

            <div className="flex bg-gray-800 rounded-lg p-1 overflow-x-auto">
              {(["1D", "1W", "1M", "3M"] as const).map((period) => (
                <Button 
                  key={period}
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handlePeriodChange(period)}
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
          </div>

          {/* Chart */}
          <div className={`h-64 sm:h-80 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={currentData} 
                margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9CA3AF" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 200]}
                  ticks={[0, 40, 80, 120, 160, 200]}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#06B6D4"
                  strokeWidth={2}
                  dot={{ fill: "#06B6D4", strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, fill: "#06B6D4", stroke: "#ffffff", strokeWidth: 2 }}
                  name="Average"
                  onClick={(data) => setSelectedDataPoint(data)}
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: "#EF4444", strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, fill: "#EF4444", stroke: "#ffffff", strokeWidth: 2 }}
                  name="Current"
                  onClick={(data) => setSelectedDataPoint(data)}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, fill: "#8B5CF6", stroke: "#ffffff", strokeWidth: 2 }}
                  name="Predicted"
                  strokeDasharray="5 5"
                  onClick={(data) => setSelectedDataPoint(data)}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Data Insights */}
          {selectedDataPoint && (
            <div className="bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-600 animate-in slide-in-from-bottom-2">
              <h3 className="text-white font-medium mb-2 text-sm sm:text-base">Time Period: {selectedDataPoint.time}</h3>
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
          )}

          {/* Legend and Quick Stats */}
          <div className="space-y-4">
            {/* Legend */}
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

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-cyan-400 text-lg sm:text-xl font-semibold">
                  {Math.round(currentData.reduce((acc, item) => acc + item.average, 0) / currentData.length)}
                </div>
                <div className="text-gray-400 text-xs">Avg Incidents</div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-red-400 text-lg sm:text-xl font-semibold">
                  {Math.max(...currentData.map(item => item.current))}
                </div>
                <div className="text-gray-400 text-xs">Peak Current</div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-purple-400 text-lg sm:text-xl font-semibold">
                  {Math.round(currentData.reduce((acc, item) => acc + item.predicted, 0) / currentData.length)}
                </div>
                <div className="text-gray-400 text-xs">Avg Predicted</div>
              </div>
            </div>

            {/* Trend Analysis */}
            <div className="bg-gray-800 p-3 sm:p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Trend Analysis</h4>
              <div className="text-xs sm:text-sm text-gray-300">
                {(() => {
                  const trend = currentData[currentData.length - 1].current - currentData[0].current
                  const trendPercent = Math.round((trend / currentData[0].current) * 100)
                  return trend > 0 ? (
                    <span className="text-red-400">
                      📈 Crime rate increased by {trendPercent}% in this {selectedPeriod} period
                    </span>
                  ) : (
                    <span className="text-green-400">
                      📉 Crime rate decreased by {Math.abs(trendPercent)}% in this {selectedPeriod} period
                    </span>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
