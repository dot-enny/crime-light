import { useState } from "react"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { AlertTriangle, MapPin, Clock, Shield, CheckCircle, Upload, Eye, EyeOff } from "lucide-react"

interface ReportForm {
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

const incidentTypes = [
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
]

const severityLevels = [
  { value: "low", label: "Low - Minor incident", color: "text-yellow-400" },
  { value: "medium", label: "Medium - Moderate concern", color: "text-orange-400" },
  { value: "high", label: "High - Serious incident", color: "text-red-400" },
  { value: "emergency", label: "Emergency - Immediate danger", color: "text-red-600" }
]

const lagosAreas = [
  "Ikeja", "Lagos Island", "Lekki", "Victoria Island", "Ikoyi", "Surulere", 
  "Yaba", "Oshodi", "Alaba", "Agege", "Mushin", "Shomolu", "Bariga",
  "Ojodu-Berger", "Mile 2", "Festac", "Ajah", "Gbagada", "Ketu", "Maryland"
]

export default function MakeReport() {
  const [formData, setFormData] = useState<ReportForm>({
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
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPersonalInfo, setShowPersonalInfo] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof ReportForm, value: string | boolean | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleInputChange("evidence", files)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.anonymous && !formData.fullName.trim()) {
      newErrors.fullName = "Full name is required for non-anonymous reports"
    }
    if (!formData.incidentType) {
      newErrors.incidentType = "Please select an incident type"
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    if (formData.description.trim().length < 20 && formData.description.trim().length > 0) {
      newErrors.description = "Description must be at least 20 characters"
    }
    if (!formData.timeOfIncident) {
      newErrors.timeOfIncident = "Time of incident is required"
    }
    if (!formData.severity) {
      newErrors.severity = "Please select severity level"
    }

    setErrors(newErrors)
    console.log("Validation errors:", newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("Form submitted with data:", formData)
    
    if (!validateForm()) {
      console.log("Validation failed:", errors)
      // Scroll to first error
      const firstErrorElement = document.querySelector('.text-red-400')
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API submission
      console.log("Submitting report...")
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Report submitted successfully!")
      
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Submission error:", error)
      setIsSubmitting(false)
      // Could add error state here
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-[90vh] bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        <Card className="w-full max-w-md bg-black border-gray-800 border-0">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-400" />
            </div>
            <div>
              <h1 className="text-white text-xl font-semibold tracking-wide mb-2">
                REPORT SUBMITTED
              </h1>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your incident report has been successfully submitted. 
                {!formData.anonymous && " You will receive updates via the contact information provided."}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-xs">Reference ID</p>
              <p className="text-white font-mono text-sm">CR-{Date.now().toString().slice(-8)}</p>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
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
                })
              }}
              className="w-full bg-white text-black hover:bg-gray-200 cursor-pointer"
            >
              Submit Another Report
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-[90vh] bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <Card className="w-full max-w-2xl bg-black border-gray-800 border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <h1 className="text-white text-xl font-semibold tracking-wide">REPORT AN INCIDENT</h1>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Report necessary details as accurately and as concisely as possible. All data will be kept secure
            and handled according to our privacy policy.
          </p>
        </CardHeader>

        <CardContent className="p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Anonymous Toggle */}
            <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg">
              <Shield className="h-5 w-5 text-blue-400" />
              <div className="flex-1">
                <Label className="text-white text-sm font-medium">Anonymous Report</Label>
                <p className="text-gray-400 text-xs">Your identity will be completely protected</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  handleInputChange("anonymous", !formData.anonymous)
                  setShowPersonalInfo(!formData.anonymous)
                }}
                className={`cursor-pointer ${formData.anonymous ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-gray-600 text-gray-300'}`}
              >
                {formData.anonymous ? "Anonymous" : "Identified"}
              </Button>
            </div>

            {/* Personal Information */}
            {!formData.anonymous && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-white text-lg font-medium">Personal Information</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                    className="cursor-pointer"
                  >
                    {showPersonalInfo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                
                {showPersonalInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-white text-sm">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="bg-white text-black border-0 h-10 focus:ring-2 focus:ring-gray-400"
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white text-sm">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-white text-black border-0 h-10 focus:ring-2 focus:ring-gray-400"
                        placeholder="+234 xxx xxx xxxx"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email" className="text-white text-sm">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-white text-black border-0 h-10 focus:ring-2 focus:ring-gray-400"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Incident Details */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-medium">Incident Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white text-sm">Incident Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("incidentType", value)}>
                    <SelectTrigger className="bg-white text-black border-0 h-10">
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      {incidentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.incidentType && <p className="text-red-400 text-xs">{errors.incidentType}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-sm">Severity Level *</Label>
                  <Select onValueChange={(value) => handleInputChange("severity", value)}>
                    <SelectTrigger className="bg-white text-black border-0 h-10">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      {severityLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <span className={level.color}>{level.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.severity && <p className="text-red-400 text-xs">{errors.severity}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location *
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="bg-white text-black border-0 h-10 focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter location or area"
                    list="locations"
                  />
                  <datalist id="locations">
                    {lagosAreas.map((area) => (
                      <option key={area} value={area} />
                    ))}
                  </datalist>
                  {errors.location && <p className="text-red-400 text-xs">{errors.location}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeOfIncident" className="text-white text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Date & Time *
                  </Label>
                  <Input
                    id="timeOfIncident"
                    type="datetime-local"
                    value={formData.timeOfIncident}
                    onChange={(e) => handleInputChange("timeOfIncident", e.target.value)}
                    className="bg-white text-black border-0 h-10 focus:ring-2 focus:ring-gray-400"
                  />
                  {errors.timeOfIncident && <p className="text-red-400 text-xs">{errors.timeOfIncident}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white text-sm">
                  Description * <span className="text-gray-400 text-xs">(minimum 20 characters)</span>
                </Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="w-full bg-white text-black border-0 rounded-md p-3 h-32 resize-none focus:ring-2 focus:ring-gray-400 focus:outline-none"
                  placeholder="Describe the incident in detail. Include what happened, who was involved, and any other relevant information..."
                />
                <div className="flex justify-between">
                  {errors.description && <p className="text-red-400 text-xs">{errors.description}</p>}
                  <p className="text-gray-400 text-xs ml-auto">
                    {formData.description.length}/20 characters
                  </p>
                </div>
              </div>

              {/* Evidence Upload */}
              <div className="space-y-2">
                <Label className="text-white text-sm flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Evidence (Optional)
                </Label>
                <div className="bg-gray-900 border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="evidence-upload"
                  />
                  <Label htmlFor="evidence-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-300 text-sm">
                      Click to upload photos, videos, or documents
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Max 10MB per file. Supported: JPG, PNG, MP4, PDF, DOC
                    </p>
                  </Label>
                  {formData.evidence.length > 0 && (
                    <div className="mt-3 text-left">
                      <p className="text-green-400 text-sm mb-2">Files selected:</p>
                      {formData.evidence.map((file, index) => (
                        <p key={index} className="text-gray-300 text-xs">
                          • {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Validation Summary */}
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <h4 className="text-red-400 text-sm font-medium">Please fix the following issues:</h4>
                </div>
                <ul className="text-red-300 text-xs space-y-1">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4 space-y-3">
              {/* Quick Test Button for Development */}
              <Button
                type="button"
                onClick={() => {
                  console.log("Quick test clicked")
                  // Fill form with test data
                  setFormData({
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
                  })
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 text-sm cursor-pointer"
              >
                Fill Test Data (Development)
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-red-600 hover:bg-red-700 text-white h-12 text-base font-medium ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting Report...
                  </div>
                ) : (
                  "Submit Incident Report"
                )}
              </Button>
              
              <p className="text-gray-400 text-xs text-center mt-3">
                By submitting this report, you agree to our terms of service and privacy policy.
                Emergency situations should be reported to 199 immediately.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
