import type { ReportForm } from "./types.ts"
import { MIN_DESCRIPTION_LENGTH } from "./constants.ts"

export function validateForm(formData: ReportForm): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!formData.anonymous && !formData.fullName.trim()) {
    errors.fullName = "Full name is required for non-anonymous reports"
  }
  
  if (!formData.incidentType) {
    errors.incidentType = "Please select an incident type"
  }
  
  if (!formData.location.trim()) {
    errors.location = "Location is required"
  }
  
  if (!formData.description.trim()) {
    errors.description = "Description is required"
  } else if (formData.description.trim().length < MIN_DESCRIPTION_LENGTH) {
    errors.description = `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters`
  }
  
  if (!formData.timeOfIncident) {
    errors.timeOfIncident = "Time of incident is required"
  }
  
  if (!formData.severity) {
    errors.severity = "Please select severity level"
  }

  return errors
}

export function createTestData(): ReportForm {
  return {
    fullName: "Test User",
    phone: "+234 123 456 7890",
    email: "test@example.com",
    incidentType: "Theft/Pickpocketing",
    location: "Ikeja",
    description: "This is a test incident report with sufficient detail to meet the minimum character requirement.",
    timeOfIncident: new Date().toISOString().slice(0, 16),
    severity: "medium",
    anonymous: false,
    evidence: []
  }
}

export function getInitialFormData(): ReportForm {
  return {
    fullName: "",
    phone: "",
    email: "",
    incidentType: "",
    location: "",
    description: "",
    timeOfIncident: "",
    severity: "",
    anonymous: false,
    evidence: []
  }
}
