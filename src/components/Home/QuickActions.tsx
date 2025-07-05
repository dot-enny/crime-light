import { Phone, Share2, Plus, Users } from "lucide-react";

interface QuickActionsProps {
  onEmergencyCall: () => void;
  onReportIncident: () => void;
  onShareLocation: () => void;
  onRequestEscort: () => void;
}

const actions = [
  { id: 'emergency', icon: Phone, label: 'Emergency Call', color: 'bg-red-600 hover:bg-red-700' },
  { id: 'report', icon: Plus, label: 'Report Incident', color: 'bg-orange-600 hover:bg-orange-700' },
  { id: 'share', icon: Share2, label: 'Share Location', color: 'bg-blue-600 hover:bg-blue-700' },
  { id: 'escort', icon: Users, label: 'Request Escort', color: 'bg-green-600 hover:bg-green-700' }
];

export default function QuickActions({ onEmergencyCall, onReportIncident, onShareLocation, onRequestEscort }: QuickActionsProps) {
  const handlers = {
    emergency: onEmergencyCall,
    report: onReportIncident,
    share: onShareLocation,
    escort: onRequestEscort
  };

  return (
    <div>
      <h3 className="text-base md:text-lg font-medium mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map(({ id, icon: Icon, label, color }) => (
          <button 
            key={id}
            className={`w-full ${color} text-white p-3 rounded-lg flex items-center gap-3 transition-colors cursor-pointer`}
            onClick={handlers[id as keyof typeof handlers]}
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
