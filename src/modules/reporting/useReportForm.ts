import { useState, useCallback } from "react"
import type { ReportForm } from "./types"
import { validateForm, getInitialFormData, createTestData } from "./utils"

export function useReportForm() {
  const [formData, setFormData] = useState<ReportForm>(getInitialFormData())
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPersonalInfo, setShowPersonalInfo] = useState(true)

  const handleInputChange = useCallback((field: keyof ReportForm, value: string | boolean | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }, [errors])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleInputChange("evidence", files)
  }, [handleInputChange])

  const handleAnonymousToggle = useCallback((anonymous: boolean) => {
    handleInputChange("anonymous", anonymous)
    setShowPersonalInfo(!anonymous)
  }, [handleInputChange])

  const fillTestData = useCallback(() => {
    setFormData(createTestData())
  }, [])

  const validateAndSubmit = useCallback(async (): Promise<boolean> => {
    const validationErrors = validateForm(formData)
    setErrors(validationErrors)
    
    if (Object.keys(validationErrors).length > 0) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.text-red-400')
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return false
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitting(false)
      setIsSubmitted(true)
      return true
    } catch (error) {
      console.error("Submission error:", error)
      setIsSubmitting(false)
      return false
    }
  }, [formData])

  const resetForm = useCallback(() => {
    setIsSubmitted(false)
    setFormData(getInitialFormData())
    setErrors({})
    setShowPersonalInfo(true)
  }, [])

  return {
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
  }
}
