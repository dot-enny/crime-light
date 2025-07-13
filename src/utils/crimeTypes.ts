// Crime type constants and utilities for MapView filtering
export const CRIME_TYPES = {
  ALL: 'all',
  ARMED_ROBBERY: 'armed_robbery',
  THEFT: 'theft',
  PICKPOCKETING: 'pickpocketing',
  BAG_SNATCHING: 'bag_snatching',
  PHONE_THEFT: 'phone_theft',
  KIDNAPPING: 'kidnapping',
  EXTORTION: 'extortion',
  ROBBERY: 'robbery',
  TRAFFIC_ROBBERY: 'traffic_robbery',
  VEHICLE_BREAK_IN: 'vehicle_break_in',
  ASSAULT: 'assault',
  HARASSMENT: 'harassment',
  RAPE: 'rape',
  MURDER: 'murder',
  CULTISM: 'cultism',
  VIOLENCE: 'violence',
  TRAFFIC_CRIME: 'traffic_crime'
} as const;

export const CRIME_TYPE_LABELS = {
  [CRIME_TYPES.ALL]: 'All Crime Types',
  [CRIME_TYPES.ARMED_ROBBERY]: 'Armed Robbery',
  [CRIME_TYPES.THEFT]: 'Theft',
  [CRIME_TYPES.PICKPOCKETING]: 'Pickpocketing',
  [CRIME_TYPES.BAG_SNATCHING]: 'Bag Snatching',
  [CRIME_TYPES.PHONE_THEFT]: 'Phone Theft',
  [CRIME_TYPES.KIDNAPPING]: 'Kidnapping',
  [CRIME_TYPES.EXTORTION]: 'Extortion',
  [CRIME_TYPES.ROBBERY]: 'Robbery',
  [CRIME_TYPES.TRAFFIC_ROBBERY]: 'Traffic Robbery',
  [CRIME_TYPES.VEHICLE_BREAK_IN]: 'Vehicle Break-in',
  [CRIME_TYPES.ASSAULT]: 'Assault',
  [CRIME_TYPES.HARASSMENT]: 'Harassment',
  [CRIME_TYPES.RAPE]: 'Rape',
  [CRIME_TYPES.MURDER]: 'Murder',
  [CRIME_TYPES.CULTISM]: 'Cultism',
  [CRIME_TYPES.VIOLENCE]: 'Violence',
  [CRIME_TYPES.TRAFFIC_CRIME]: 'Traffic Crime'
} as const;

export const CRIME_TYPE_COLORS = {
  [CRIME_TYPES.ARMED_ROBBERY]: '#DC2626', // Red-600
  [CRIME_TYPES.MURDER]: '#7F1D1D', // Red-900
  [CRIME_TYPES.RAPE]: '#7F1D1D', // Red-900
  [CRIME_TYPES.KIDNAPPING]: '#DC2626', // Red-600
  [CRIME_TYPES.VIOLENCE]: '#EF4444', // Red-500
  [CRIME_TYPES.CULTISM]: '#B91C1C', // Red-700
  [CRIME_TYPES.THEFT]: '#F97316', // Orange-500
  [CRIME_TYPES.ROBBERY]: '#EA580C', // Orange-600
  [CRIME_TYPES.TRAFFIC_ROBBERY]: '#EA580C', // Orange-600
  [CRIME_TYPES.PICKPOCKETING]: '#FACC15', // Yellow-400
  [CRIME_TYPES.BAG_SNATCHING]: '#EAB308', // Yellow-500
  [CRIME_TYPES.PHONE_THEFT]: '#F59E0B', // Amber-500
  [CRIME_TYPES.VEHICLE_BREAK_IN]: '#D97706', // Amber-600
  [CRIME_TYPES.EXTORTION]: '#84CC16', // Lime-500
  [CRIME_TYPES.ASSAULT]: '#EF4444', // Red-500
  [CRIME_TYPES.HARASSMENT]: '#F59E0B', // Amber-500
  [CRIME_TYPES.TRAFFIC_CRIME]: '#6366F1' // Indigo-500
} as const;

export type CrimeType = keyof typeof CRIME_TYPES;
export type CrimeTypeValue = typeof CRIME_TYPES[CrimeType];

// Get unique crime types from locations data
export function getUniqueCrimeTypes(locations: Array<{ crimeTypes: string[] }>): string[] {
  const allTypes = locations.flatMap(location => location.crimeTypes);
  return [...new Set(allTypes)].sort();
}

// Filter locations by crime type
export function filterLocationsByCrimeType<T extends { crimeTypes: string[] }>(
  locations: T[], 
  selectedType: string
): T[] {
  if (selectedType === CRIME_TYPES.ALL) {
    return locations;
  }
  return locations.filter(location => location.crimeTypes.includes(selectedType));
}

// Get crime type color with fallback
export function getCrimeTypeColor(crimeType: string): string {
  return CRIME_TYPE_COLORS[crimeType as keyof typeof CRIME_TYPE_COLORS] || '#6B7280'; // Gray-500 fallback
}
