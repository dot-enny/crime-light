import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"

const data = [
  { time: "00:00", average: 74, current: 45, predicted: 52 },
  { time: "01:00", average: 76, current: 48, predicted: 55 },
  { time: "02:00", average: 78, current: 50, predicted: 58 },
  { time: "03:00", average: 75, current: 52, predicted: 60 },
  { time: "04:00", average: 72, current: 45, predicted: 55 },
  { time: "05:00", average: 70, current: 40, predicted: 50 },
  { time: "06:00", average: 85, current: 60, predicted: 70 },
  { time: "07:00", average: 95, current: 75, predicted: 85 },
  { time: "08:00", average: 110, current: 95, predicted: 105 },
  { time: "09:00", average: 125, current: 110, predicted: 120 },
  { time: "10:00", average: 135, current: 120, predicted: 130 },
  { time: "11:00", average: 130, current: 115, predicted: 125 },
]

export default function IncidentsAnalysis({ setIsOpen }: { setIsOpen?: (val: boolean) => void }) {
  return (
    <div className="">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-sm text-gray-500 font-medium">Analysis</h2>
      </div>

      {/* Main Dashboard Card */}
      <Card className="bg-black text-white p-6 rounded-xl relative">
        {/* Close Icon Button */}
        {setIsOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none z-10"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-xl font-semibold mb-2">INCIDENTS ANALYSIS</h1>
            <p className="text-gray-300 text-sm">Herbert Macaulay Way, Yaba. 3:34PM</p>
          </div>

          {/* Risk Rating and Time Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-300 text-sm">Overall Risk Rating:</span>
              <span className="text-green-400 font-medium">23% - Safe</span>
            </div>

            <div className="flex bg-gray-800 rounded-lg p-1">
              <Button variant="ghost" size="sm" className="bg-gray-600 text-white hover:bg-gray-500 text-xs px-3 py-1">
                1D
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:bg-gray-700 hover:text-white text-xs px-3 py-1"
              >
                1W
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:bg-gray-700 hover:text-white text-xs px-3 py-1"
              >
                1M
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:bg-gray-700 hover:text-white text-xs px-3 py-1"
              >
                3M
              </Button>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 200]}
                  ticks={[0, 40, 80, 120, 160, 200]}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#06B6D4"
                  strokeWidth={2}
                  dot={{ fill: "#06B6D4", strokeWidth: 2, r: 3 }}
                  name="Average"
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: "#EF4444", strokeWidth: 2, r: 3 }}
                  name="Current"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 3 }}
                  name="Predicted"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-cyan-400"></div>
              <span className="text-gray-300">Average</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-red-400"></div>
              <span className="text-gray-300">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-purple-400"></div>
              <span className="text-gray-300">Predicted</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
