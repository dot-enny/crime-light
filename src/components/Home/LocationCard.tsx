import { MapPin } from "lucide-react";

interface LocationCardProps {
  currentTime: string;
  location: string;
  riskRating: {
    level: 'Low' | 'Medium' | 'High';
    percentage: number;
    color: string;
  };
}

export default function LocationCard({ currentTime, location, riskRating }: LocationCardProps) {
  return (
    <div className="border-2 border-green-600 rounded-lg p-3 md:p-4 mb-4 md:mb-6 inline-block w-full sm:w-auto">
      <div className="text-2xl md:text-3xl font-bold mb-2">{currentTime}</div>
      <div className="flex items-center gap-2 text-sm">
        <MapPin size={16} />
        <span>{location}</span>
      </div>
      <div className="mt-3 text-sm">
        <span className="text-gray-300">Risk Rating: </span>
        <span className={`${riskRating.color} font-medium`}>
          {riskRating.level} - {riskRating.percentage}%
        </span>
      </div>
    </div>
  );
}
