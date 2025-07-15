import { AlertTriangle } from "lucide-react"

interface ValidationSummaryProps {
  errors: Record<string, string>
}

export function ValidationSummary({ errors }: ValidationSummaryProps) {
  if (Object.keys(errors).length === 0) return null

  return (
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
  )
}
