import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../modules/shared/ui';
import { CRIME_TYPES, CRIME_TYPE_LABELS } from '../utils/crimeTypes';
import { Filter, X } from 'lucide-react';

interface CrimeFilterProps {
  selectedCrimeType: string;
  onCrimeTypeChange: (crimeType: string) => void;
  availableCrimeTypes: string[];
  className?: string;
}

export function CrimeFilter({ 
  selectedCrimeType, 
  onCrimeTypeChange, 
  availableCrimeTypes,
  className = "" 
}: CrimeFilterProps) {
  const handleClearFilter = () => {
    onCrimeTypeChange(CRIME_TYPES.ALL);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2 text-white text-sm">
        <Filter size={16} className="text-gray-400" />
        <span className="whitespace-nowrap">Filter by Crime:</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Select value={selectedCrimeType} onValueChange={onCrimeTypeChange}>
          <SelectTrigger className="w-48 bg-neutral-800 border-neutral-600 text-white text-sm">
            <SelectValue placeholder="Select crime type" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-800 border-neutral-600">
            <SelectItem value={CRIME_TYPES.ALL} className="text-white hover:bg-neutral-700">
              {CRIME_TYPE_LABELS[CRIME_TYPES.ALL]}
            </SelectItem>
            {availableCrimeTypes.map((crimeType) => (
              <SelectItem 
                key={crimeType} 
                value={crimeType}
                className="text-white hover:bg-neutral-700"
              >
                {CRIME_TYPE_LABELS[crimeType as keyof typeof CRIME_TYPE_LABELS] || crimeType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {selectedCrimeType !== CRIME_TYPES.ALL && (
          <button
            onClick={handleClearFilter}
            className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
            title="Clear filter"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

// Crime type badge component for popups
interface CrimeTypeBadgeProps {
  crimeType: string;
  size?: 'sm' | 'md';
}

export function CrimeTypeBadge({ crimeType, size = 'sm' }: CrimeTypeBadgeProps) {
  const label = CRIME_TYPE_LABELS[crimeType as keyof typeof CRIME_TYPE_LABELS] || crimeType;
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1';
  
  return (
    <span className={`inline-block bg-blue-100 text-blue-800 rounded-full ${sizeClasses} font-medium`}>
      {label}
    </span>
  );
}
