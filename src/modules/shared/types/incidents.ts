// Core data interfaces for incident analysis
export interface DataPoint {
  time: string
  average: number
  current: number
  predicted: number
  incidents: string[]
}

// Time period types
export type TimePeriod = '1D' | '1W' | '1M' | '3M'

// Risk calculation types
export type RiskLevel = 'Safe' | 'Medium Risk' | 'High Risk'

export interface RiskRating {
  riskPercentage: number
  riskLevel: RiskLevel
  riskColor: string
}

// Chart tooltip types
export interface TooltipPayloadEntry {
  name: string
  value: number
  color: string
  payload: DataPoint
}

export interface TooltipProps {
  active?: boolean
  payload?: TooltipPayloadEntry[]
  label?: string
}

// Period data structure
export type PeriodData = Record<TimePeriod, DataPoint[]>

// Component props
export interface IncidentsAnalysisProps {
  setIsOpen?: (val: boolean) => void
}

// Individual component prop interfaces
export interface RiskRatingDisplayProps {
  riskPercentage: number
  riskLevel: RiskLevel
  riskColor: string
  isLiveMode: boolean
  onToggleLiveMode: () => void
}

export interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod
  isAnimating: boolean
  onPeriodChange: (period: TimePeriod) => void
}

export interface IncidentChartProps {
  data: DataPoint[]
  isAnimating: boolean
  onDataPointSelect: (dataPoint: DataPoint) => void
}

export interface DataInsightsPanelProps {
  selectedDataPoint: DataPoint | null
}

export interface QuickStatsGridProps {
  data: DataPoint[]
}

export interface TrendAnalysisProps {
  data: DataPoint[]
  selectedPeriod: TimePeriod
}

export interface ChartLegendProps {
  // No props needed - static component
}

// Constants
export const RISK_THRESHOLDS = {
  HIGH: 70,
  MEDIUM: 40,
  MAX_RISK_VALUE: 150,
} as const

export const ANIMATION_DURATION = 300
export const LIVE_UPDATE_INTERVAL = 2000
export const CHART_DOMAIN = [0, 200] as const
export const CHART_TICKS = [0, 40, 80, 120, 160, 200] as const

// Risk color mapping
export const RISK_COLORS: Record<RiskLevel, string> = {
  'Safe': 'text-green-400',
  'Medium Risk': 'text-yellow-400',
  'High Risk': 'text-red-400',
} as const
