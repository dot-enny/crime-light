import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

interface SuccessPageProps {
  isAnonymous: boolean
  onSubmitAnother: () => void
}

export function SuccessPage({ isAnonymous, onSubmitAnother }: SuccessPageProps) {
  return (
    <div className="flex-1 bg-black text-white p-4 md:p-6 relative">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="flex items-center justify-center min-h-full">
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
                {!isAnonymous && " You will receive updates via the contact information provided."}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-xs">Reference ID</p>
              <p className="text-white font-mono text-sm">CR-{Date.now().toString().slice(-8)}</p>
            </div>
            <Button 
              onClick={onSubmitAnother}
              className="w-full bg-white text-black hover:bg-gray-200 cursor-pointer"
            >
              Submit Another Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
