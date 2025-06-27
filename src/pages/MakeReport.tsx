import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export default function MakeReport() {
  return (
    <div className="min-h-[90vh] bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <Card className="w-full max-w-md bg-black border-gray-800">
        <CardContent className="p-8 space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-white text-xl font-semibold tracking-wide">REPORT AN INCIDENT</h1>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Report necessary details as accurately and as concisely as possible. All data will be kept anonymous,
              unless otherwise selected.
            </p>
          </div>

          {/* Form Field */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white text-sm">
              Full Name*
            </Label>
            <Input
              id="fullName"
              type="text"
              className="bg-white text-black border-0 h-10 focus:ring-2 focus:ring-gray-400"
              placeholder=""
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
