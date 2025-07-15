# Home Page Module

This directory contains the refactored Home page implementation with improved modularity, maintainability, and reusability.

## Structure

```
src/pages/Home/
├── index.ts           # Public API exports
├── constants.ts       # Configuration, mock data, and type definitions
├── helpers.ts         # Pure utility functions
├── hooks.ts          # Custom React hooks
├── components.tsx    # Reusable UI components
└── README.md         # This file
```

## Files Overview

### `constants.ts`
Contains all configuration values, mock data, and TypeScript interfaces:
- **Types**: `SimulatedAlert`, `LocationData`
- **Animation configs**: `ANIMATION_CONFIG`
- **Mock data**: `LOCATION_DATA`, `BUTLER_MESSAGE`, `MOCK_ALERTS`
- **Styling**: `BACKGROUND_PATTERN_STYLE`

### `helpers.ts`
Pure utility functions for animations and data manipulation:
- `createAnimationClass()` - Generates CSS classes for animations
- `createGreetingAnimationClass()` - Specific animation for greeting text
- `getRandomInterval()` - Random number generation
- `createAlertTimestamp()` - Timestamp formatting

### `hooks.ts`
Custom React hooks encapsulating stateful logic:
- `useAlwaysAnimate()` - Manages continuous animation state
- `useSimulatedAlerts()` - Handles alert simulation and management

### `components.tsx`
Reusable presentational components:
- `BackgroundPattern` - Decorative background element
- `AnimatedSection` - Wrapper for animated content
- `Greeting` - User greeting component
- `MainContent` - Main content container
- `SidebarContainer` - Sidebar wrapper component

### `index.ts`
Public API that re-exports all useful components, hooks, and utilities for potential reuse across the application.

## Benefits of This Structure

1. **Separation of Concerns**: Each file has a single responsibility
2. **Reusability**: Components and hooks can be easily reused
3. **Testability**: Individual functions and hooks can be unit tested
4. **Maintainability**: Changes to specific functionality are isolated
5. **Type Safety**: All TypeScript interfaces are centrally defined
6. **Clean Imports**: The main Home component has clean, organized imports

## Usage

The main Home component (`../Home.tsx`) imports from these modules to compose the final page. Each module can also be imported individually for testing or reuse in other parts of the application.

## Testing

Each module can be independently tested:
- `helpers.ts` - Unit tests for pure functions
- `hooks.ts` - React hook testing with `@testing-library/react-hooks`
- `components.tsx` - Component testing with `@testing-library/react`
- `constants.ts` - Type checking and data validation tests
