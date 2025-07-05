import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"

interface SuccessPageProps {
  isAnonymous: boolean
  onSubmitAnother: () => void
}

export function SuccessPage({ isAnonymous, onSubmitAnother }: SuccessPageProps) {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setShowAnimation(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

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
            {/* Animated Check Circle */}
            <div className="flex justify-center">
              <div className={`relative transition-all duration-700 ease-out ${
                showAnimation 
                  ? 'scale-100 opacity-100' 
                  : 'scale-50 opacity-0'
              }`}>
                <CheckCircle className={`h-16 w-16 text-green-400 transition-all duration-1000 ${
                  showAnimation ? 'animate-bounce' : ''
                }`} />
                
                {/* Ripple effect */}
                <div className={`absolute inset-0 rounded-full border-2 border-green-400 transition-all duration-1000 ${
                  showAnimation 
                    ? 'scale-150 opacity-0' 
                    : 'scale-100 opacity-100'
                }`} />
                <div className={`absolute inset-0 rounded-full border border-green-400 transition-all duration-1200 delay-200 ${
                  showAnimation 
                    ? 'scale-200 opacity-0' 
                    : 'scale-100 opacity-100'
                }`} />
              </div>
            </div>

            {/* Animated content */}
            <div className={`transition-all duration-700 delay-300 ease-out ${
              showAnimation 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
            }`}>
              <h1 className="text-white text-xl font-semibold tracking-wide mb-2">
                REPORT SUBMITTED
              </h1>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your incident report has been successfully submitted. 
                {!isAnonymous && " You will receive updates via the contact information provided."}
              </p>
            </div>

            {/* Animated reference ID */}
            <div className={`bg-gray-900 rounded-lg p-4 transition-all duration-700 delay-500 ease-out ${
              showAnimation 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
            }`}>
              <p className="text-gray-400 text-xs">Reference ID</p>
              <p className="text-white font-mono text-sm">CR-{Date.now().toString().slice(-8)}</p>
            </div>

            {/* Animated button */}
            <div className={`transition-all duration-700 delay-700 ease-out ${
              showAnimation 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
            }`}>
              <Button 
                onClick={onSubmitAnother}
                className="w-full bg-white text-black hover:bg-gray-200 cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                Submit Another Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
