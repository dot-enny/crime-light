import { Upload } from "lucide-react"
import { Label } from "../../components/ui/label"

interface EvidenceUploadProps {
  evidence: File[]
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function EvidenceUpload({ evidence, onFileUpload }: EvidenceUploadProps) {
  return (
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
          onChange={onFileUpload}
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
        {evidence.length > 0 && (
          <div className="mt-3 text-left">
            <p className="text-green-400 text-sm mb-2">Files selected:</p>
            {evidence.map((file, index) => (
              <p key={index} className="text-gray-300 text-xs">
                • {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
