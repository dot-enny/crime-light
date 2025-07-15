import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import type { IncidentChartProps, TooltipProps } from "../shared/types/incidents"
import { CHART_DOMAIN, CHART_TICKS } from "../shared/types/incidents"

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600 shadow-lg">
        <p className="text-white font-medium">{`Time: ${label}`}</p>
        {payload.map((entry, index) => (
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

export default function IncidentChart({ 
  data, 
  isAnimating, 
  onDataPointSelect 
}: IncidentChartProps) {
  return (
    <div className={`h-64 sm:h-80 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
          onClick={(chartData) => {
            if (chartData && chartData.activeLabel) {
              const clickedDataPoint = data.find(item => item.time === chartData.activeLabel)
              if (clickedDataPoint) {
                onDataPointSelect(clickedDataPoint)
              }
            }
          }}
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
            domain={CHART_DOMAIN}
            ticks={CHART_TICKS}
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
          />
          <Line
            type="monotone"
            dataKey="current"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ fill: "#EF4444", strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: "#EF4444", stroke: "#ffffff", strokeWidth: 2 }}
            name="Current"
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
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
