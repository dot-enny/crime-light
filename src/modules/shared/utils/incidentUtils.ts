import type { DataPoint, RiskRating } from "../types/incidents"
import { RISK_THRESHOLDS, RISK_COLORS } from "../types/incidents"

/**
 * Calculate risk rating based on incident data
 * @param data Array of data points containing current incident counts
 * @returns Risk rating object with percentage, level, and color
 */
export const calculateRiskRating = (data: DataPoint[]): RiskRating => {
  const avgCurrent = data.reduce((acc, item) => acc + item.current, 0) / data.length
  const riskPercentage = Math.min(Math.round((avgCurrent / RISK_THRESHOLDS.MAX_RISK_VALUE) * 100), 100)
  
  if (riskPercentage > RISK_THRESHOLDS.HIGH) {
    return {
      riskPercentage,
      riskLevel: "High Risk",
      riskColor: RISK_COLORS["High Risk"]
    }
  } else if (riskPercentage > RISK_THRESHOLDS.MEDIUM) {
    return {
      riskPercentage,
      riskLevel: "Medium Risk", 
      riskColor: RISK_COLORS["Medium Risk"]
    }
  } else {
    return {
      riskPercentage,
      riskLevel: "Safe",
      riskColor: RISK_COLORS["Safe"]
    }
  }
}

/**
 * Calculate trend percentage between first and last data points
 * @param data Array of data points
 * @returns Trend percentage (positive for increase, negative for decrease)
 */
export const calculateTrend = (data: DataPoint[]): number => {
  if (data.length < 2) return 0
  
  const trend = data[data.length - 1].current - data[0].current
  return Math.round((trend / data[0].current) * 100)
}

/**
 * Generate random fluctuation for live mode
 * @param baseValue Current value to fluctuate
 * @param maxChange Maximum change amount
 * @returns New value with random fluctuation
 */
export const applyRandomFluctuation = (baseValue: number, maxChange: number): number => {
  return Math.max(0, baseValue + Math.random() * maxChange - (maxChange / 2))
}
