export const INCIDENT_TYPES = [
  "Armed Robbery",
  "Theft/Pickpocketing", 
  "Assault",
  "Kidnapping",
  "Fraud/Scam",
  "Sexual Harassment",
  "Vandalism",
  "Drug-related Crime",
  "Domestic Violence",
  "Other"
] as const

export const SEVERITY_LEVELS = [
  { value: "low", label: "Low - Minor incident", color: "text-yellow-400" },
  { value: "medium", label: "Medium - Moderate concern", color: "text-orange-400" },
  { value: "high", label: "High - Serious incident", color: "text-red-400" },
  { value: "emergency", label: "Emergency - Immediate danger", color: "text-red-600" }
] as const

export const LAGOS_AREAS = [
  "Ikeja", "Lagos Island", "Lekki", "Victoria Island", "Ikoyi", "Surulere", 
  "Yaba", "Oshodi", "Alaba", "Agege", "Mushin", "Shomolu", "Bariga",
  "Ojodu-Berger", "Mile 2", "Festac", "Ajah", "Gbagada", "Ketu", "Maryland"
] as const

export const MIN_DESCRIPTION_LENGTH = 20
export const MAX_FILE_SIZE_MB = 10

export type IncidentType = typeof INCIDENT_TYPES[number]
export type SeverityLevel = typeof SEVERITY_LEVELS[number]["value"]
