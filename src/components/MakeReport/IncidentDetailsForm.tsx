import { MapPin, Clock } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { FormField } from "./FormField"
import { INCIDENT_TYPES, SEVERITY_LEVELS, LAGOS_AREAS, MIN_DESCRIPTION_LENGTH } from "./constants"
import type { ReportForm } from "./types"

interface IncidentDetailsFormProps {
  incidentType: string
  severity: string
  location: string
  timeOfIncident: string
  description: string
  errors: Record<string, string>
  onInputChange: (field: keyof ReportForm, value: string | boolean | File[]) => void
}

export function IncidentDetailsForm({
  incidentType,
  severity,
  location,
  timeOfIncident,
  description,
  errors,
  onInputChange
}: IncidentDetailsFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-white text-lg font-medium">Incident Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Incident Type"
          required
          error={errors.incidentType}
        >
          <Select value={incidentType} onValueChange={(value) => onInputChange("incidentType", value)}>
            <SelectTrigger className="bg-white text-black border-0 h-10">
              <SelectValue placeholder="Select incident type" />
            </SelectTrigger>
            <SelectContent>
              {INCIDENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          label="Severity Level"
          required
          error={errors.severity}
        >
          <Select value={severity} onValueChange={(value) => onInputChange("severity", value)}>
            <SelectTrigger className="bg-white text-black border-0 h-10">
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              {SEVERITY_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  <span className={level.color}>{level.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Location"
          required
          icon={<MapPin className="h-4 w-4" />}
          error={errors.location}
        >
          <Input
            id="location"
            type="text"
            value={location}
            onChange={(e) => onInputChange("location", e.target.value)}
            className="bg-white text-black border-0 h-10 focus:ring-2 focus:ring-gray-400"
            placeholder="Enter location or area"
            list="locations"
          />
          <datalist id="locations">
            {LAGOS_AREAS.map((area) => (
              <option key={area} value={area} />
            ))}
          </datalist>
        </FormField>

        <FormField
          label="Date & Time"
          required
          icon={<Clock className="h-4 w-4" />}
          error={errors.timeOfIncident}
        >
          <Input
            id="timeOfIncident"
            type="datetime-local"
            value={timeOfIncident}
            onChange={(e) => onInputChange("timeOfIncident", e.target.value)}
            className="bg-white text-black border-0 h-10 focus:ring-2 focus:ring-gray-400"
          />
        </FormField>
      </div>

      <FormField
        label="Description"
        required
        hint={`minimum ${MIN_DESCRIPTION_LENGTH} characters`}
        error={errors.description}
      >
        <textarea
          id="description"
          value={description}
          onChange={(e) => onInputChange("description", e.target.value)}
          className="w-full bg-white text-black border-0 rounded-md p-3 h-32 resize-none focus:ring-2 focus:ring-gray-400 focus:outline-none"
          placeholder="Describe the incident in detail. Include what happened, who was involved, and any other relevant information..."
        />
        <div className="flex justify-between">
          <div /> {/* Spacer for error message */}
          <p className="text-gray-400 text-xs">
            {description.length}/{MIN_DESCRIPTION_LENGTH} characters
          </p>
        </div>
      </FormField>
    </div>
  )
}
