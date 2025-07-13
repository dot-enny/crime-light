import { Shield } from "lucide-react"
import { Button } from "../shared/ui";
import { Label } from "../shared/ui";

interface AnonymousToggleProps {
  isAnonymous: boolean
  onToggle: (anonymous: boolean) => void
}

export function AnonymousToggle({ isAnonymous, onToggle }: AnonymousToggleProps) {
  return (
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
        onClick={() => onToggle(!isAnonymous)}
        className={`cursor-pointer ${
          isAnonymous 
            ? 'bg-blue-600 border-blue-600 text-white' 
            : 'bg-transparent border-gray-600 text-gray-300'
        }`}
      >
        {isAnonymous ? "Anonymous" : "Identified"}
      </Button>
    </div>
  )
}
