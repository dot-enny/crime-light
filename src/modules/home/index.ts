// Re-export the main Home component and its supporting modules
export { default } from '../../pages/Home';

// Export all types for external usage
export type {
  LocationData,
  SimulatedAlert
} from './constants';

// Export utility functions that might be useful elsewhere
export {
  createAnimationClass,
  createGreetingAnimationClass,
  getRandomInterval,
  createAlertTimestamp
} from './helpers';

// Export custom hooks for potential reuse
export {
  useAlwaysAnimate,
  useSimulatedAlerts
} from './hooks';

// Export reusable components
export {
  BackgroundPattern,
  AnimatedSection,
  Greeting,
  MainContent,
  SidebarContainer
} from './components';
