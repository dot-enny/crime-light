import type { PeriodData } from "../modules/shared/types/incidents"

export const incidentDataByPeriod: PeriodData = {
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
