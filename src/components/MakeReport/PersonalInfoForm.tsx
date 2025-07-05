import { Eye, EyeOff } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { FormField } from "./FormField"
import type { ReportForm } from "./types"

interface PersonalInfoFormProps {
  fullName: string
  phone: string
  email: string
  errors: Record<string, string>
  showPersonalInfo: boolean
  onToggleVisibility: () => void
  onInputChange: (field: keyof ReportForm, value: string | boolean | File[]) => void
}

export function PersonalInfoForm({
  fullName,
  phone,
  email,
  errors,
  showPersonalInfo,
  onToggleVisibility,
  onInputChange
}: PersonalInfoFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-white text-lg font-medium">Personal Information</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onToggleVisibility}
          className="cursor-pointer"
        >
          {showPersonalInfo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      
      {showPersonalInfo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Full Name"
            required
            error={errors.fullName}
          >
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => onInputChange("fullName", e.target.value)}
              className="bg-white text-black border-0 h-10 focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your full name"
            />
          </FormField>

          <FormField label="Phone Number">
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => onInputChange("phone", e.target.value)}
              className="bg-white text-black border-0 h-10 focus:ring-2 focus:ring-gray-400"
              placeholder="+234 xxx xxx xxxx"
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField label="Email Address">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => onInputChange("email", e.target.value)}
                className="bg-white text-black border-0 h-10 focus:ring-2 focus:ring-gray-400"
                placeholder="your.email@example.com"
              />
            </FormField>
          </div>
        </div>
      )}
    </div>
  )
}
