import { Search } from "lucide-react";
import SafetyTips from "./SafetyTips";
import QuickActions from "./QuickActions";
import TrustedContacts from "./TrustedContacts";

interface SidebarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onEmergencyCall: () => void;
  onReportIncident: () => void;
  onShareLocation: () => void;
  onRequestEscort: () => void;
}

const trustedContacts = [
  { id: '1', name: 'Sarah', relation: 'Sister', status: 'online' as const },
  { id: '2', name: 'Mike', relation: 'Friend', status: 'away' as const }
];

export default function Sidebar({ 
  searchValue, 
  onSearchChange, 
  onEmergencyCall, 
  onReportIncident, 
  onShareLocation, 
  onRequestEscort 
}: SidebarProps) {
  return (
    <div className="w-full lg:w-80 order-1 lg:order-2">
      {/* Search Bar */}
      <div className="relative mb-6 md:mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Enter Address"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full border border-white text-gray-200 rounded-full py-3 pl-12 pr-4 text-sm bg-transparent"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-0">
        <SafetyTips />
        <div>
          <QuickActions
            onEmergencyCall={onEmergencyCall}
            onReportIncident={onReportIncident}
            onShareLocation={onShareLocation}
            onRequestEscort={onRequestEscort}
          />
          <TrustedContacts contacts={trustedContacts} />
        </div>
      </div>
    </div>
  );
}
