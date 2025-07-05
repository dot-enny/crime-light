export interface ReportForm {
  fullName: string
  phone: string
  email: string
  incidentType: string
  location: string
  description: string
  timeOfIncident: string
  severity: string
  anonymous: boolean
  evidence: File[]
}
