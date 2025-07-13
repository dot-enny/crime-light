import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader } from "../modules/shared/ui";
import { Button } from "../modules/shared/ui";
import { useFirstLoadAnimation } from "../modules/shared/hooks/useFirstLoadAnimation"
import {
  useReportForm,
  AnonymousToggle,
  PersonalInfoForm,
  IncidentDetailsForm,
  EvidenceUpload,
  ValidationSummary,
  SuccessPage
} from "../modules/reporting"

export default function MakeReport() {
  const { shouldAnimate, isVisible } = useFirstLoadAnimation({ alwaysAnimate: true });
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    showPersonalInfo,
    handleInputChange,
    handleFileUpload,
    handleAnonymousToggle,
    setShowPersonalInfo,
    fillTestData,
    validateAndSubmit,
    resetForm
  } = useReportForm()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await validateAndSubmit()
  }

  if (isSubmitted) {
    return (
      <SuccessPage 
        isAnonymous={formData.anonymous} 
        onSubmitAnother={resetForm} 
      />
    )
  }

  return (
    <div className="flex-1 bg-black text-white p-4 md:p-6 relative">
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="flex items-center justify-center min-h-full">
        <Card className="w-full max-w-2xl bg-black border-gray-800 border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className={`h-6 w-6 text-red-400 ${
                shouldAnimate 
                  ? `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`
                  : 'opacity-100'
              }`} 
              style={shouldAnimate ? {
                strokeDasharray: isVisible ? '0' : '100',
                strokeDashoffset: isVisible ? '0' : '100',
                transition: 'stroke-dasharray 1.2s ease-out, stroke-dashoffset 1.2s ease-out, opacity 1s ease-out'
              } : {}} />
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
              <AnonymousToggle 
                isAnonymous={formData.anonymous}
                onToggle={handleAnonymousToggle}
              />

              {/* Personal Information */}
              {!formData.anonymous && (
                <PersonalInfoForm
                  fullName={formData.fullName}
                  phone={formData.phone}
                  email={formData.email}
                  errors={errors}
                  showPersonalInfo={showPersonalInfo}
                  onToggleVisibility={() => setShowPersonalInfo(!showPersonalInfo)}
                  onInputChange={handleInputChange}
                />
              )}

              {/* Incident Details */}
              <IncidentDetailsForm
                incidentType={formData.incidentType}
                severity={formData.severity}
                location={formData.location}
                timeOfIncident={formData.timeOfIncident}
                description={formData.description}
                errors={errors}
                onInputChange={handleInputChange}
              />

              {/* Evidence Upload */}
              <EvidenceUpload
                evidence={formData.evidence}
                onFileUpload={handleFileUpload}
              />

              {/* Validation Summary */}
              <ValidationSummary errors={errors} />

              {/* Submit Buttons */}
              <div className="pt-4 space-y-3">
                {/* Quick Test Button for Development */}
                <Button
                  type="button"
                  onClick={fillTestData}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 text-sm cursor-pointer"
                >
                  Fill Test Data (Development)
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-red-600 hover:bg-red-700 text-white h-12 text-base font-medium ${
                    isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
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
    </div>
  )
}
