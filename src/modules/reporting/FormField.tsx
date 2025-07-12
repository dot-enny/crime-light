import type { ReactNode } from "react"
import { Label } from "../../components/ui/label"

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  icon?: ReactNode
  children: ReactNode
  hint?: string
}

export function FormField({ label, required, error, icon, children, hint }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-white text-sm flex items-center gap-2">
        {icon}
        {label} {required && "*"}
        {hint && <span className="text-gray-400 text-xs">({hint})</span>}
      </Label>
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}
