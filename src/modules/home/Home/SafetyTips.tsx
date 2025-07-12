import { Heart } from "lucide-react";

const tips = [
  "Avoid local enforcement hotspots after 9 PM.",
  "Walk in a group of 2+ people when possible.",
  "If accosted, remain calm and avoid confrontation.",
  "Keep valuables hidden and use main roads.",
  "Trust your instincts - if something feels off, leave."
];

export default function SafetyTips() {
  return (
    <div className="lg:mb-12">
      <h3 className="text-base md:text-lg font-medium mb-4">Useful Tips in this Area</h3>
      <ol className="space-y-2 text-sm text-gray-300">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-400 font-medium">{index + 1}.</span>
            <span>{tip}</span>
          </li>
        ))}
      </ol>
      
      {/* Emergency Procedures */}
      <div className="mt-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
        <h4 className="text-red-400 font-medium text-sm mb-2 flex items-center gap-2">
          <Heart size={14} />
          Emergency Procedures
        </h4>
        <p className="text-xs text-gray-300">
          Call 199 (Police), 123 (Fire), or press the emergency button below to alert contacts.
        </p>
      </div>
    </div>
  );
}
