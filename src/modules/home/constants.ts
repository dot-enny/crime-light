// Types
export interface SimulatedAlert {
  id: number;
  type: 'warning' | 'info';
  timestamp: string;
  message: string;
  distance: string;
  isNew?: boolean;
}

export interface LocationData {
  currentTime: string;
  location: string;
  riskRating: {
    level: 'Low' | 'Medium' | 'High';
    percentage: number;
    color: string;
  };
}

// Animation Configuration
export const ANIMATION_CONFIG = {
  alwaysAnimateDelay: 200,
  duration: 700,
  delays: {
    greeting: 0,
    location: 150,
    butler: 300,
    sidebar: 200,
    liveAlerts: 400,
    recentAlerts: 500,
    mapView: 700,
  }
} as const;

// Alert Simulation Configuration
export const ALERT_SIMULATION_CONFIG = {
  firstDelay: 3000,
  minInterval: 8000,
  maxInterval: 15000,
  newFlagDuration: 1000,
} as const;

// Mock Data - in a real app, this would come from an API or context
export const SIMULATED_ALERTS_POOL = [
  {
    id: 101,
    type: 'warning' as const,
    message: 'Suspicious activity reported at Tafawa Balewa Square',
    distance: 'Distance: 1.2km from your location'
  },
  {
    id: 102,
    type: 'info' as const,
    message: 'Road closure on Broad Street - use alternative route',
    distance: 'Estimated delay: 15-20 minutes'
  },
  {
    id: 103,
    type: 'warning' as const,
    message: 'Phone snatching incident near National Theatre',
    distance: 'Distance: 0.5km from your location'
  },
  {
    id: 104,
    type: 'info' as const,
    message: 'Power outage reported in Surulere area',
    distance: 'Affected areas: Bode Thomas, Ojuelegba'
  },
  {
    id: 105,
    type: 'warning' as const,
    message: 'Break-in attempt reported on Ikorodu Road',
    distance: 'Distance: 2.1km from your location'
  }
] as const;

export const LOCATION_DATA: LocationData = {
  currentTime: "3:34PM",
  location: "Herbert Macaulay Way",
  riskRating: {
    level: 'Low',
    percentage: 23,
    color: 'text-green-400'
  }
} as const;

export const BUTLER_MESSAGE = "Now's a good time to go home. Spikes in small theft and harassment are 42% more probable in the next hour in this area.";

// CSS Classes
export const BACKGROUND_PATTERN_STYLE = {
  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
  backgroundSize: "30px 30px",
} as const;
