interface ButlerMessageProps {
  message: string;
  onShowAnalysis: () => void;
}

export default function ButlerMessage({ message, onShowAnalysis }: ButlerMessageProps) {
  return (
    <div className="mb-6 md:mb-8">
      <p className="text-gray-300 text-sm leading-relaxed">
        Butler says: "{message}"
      </p>
      <button 
        className="text-blue-400 text-sm underline mt-2 cursor-pointer" 
        onClick={onShowAnalysis}
      >
        View Full Analysis
      </button>
    </div>
  );
}
