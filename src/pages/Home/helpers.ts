// Helper functions for Home page

/**
 * Creates animation class string for elements
 * @param shouldAnimate - Whether animation should be applied
 * @param isVisible - Whether element is visible (for animation state)
 * @param delay - Animation delay in milliseconds
 * @param direction - Animation direction ('y' for vertical, 'x' for horizontal)
 * @param initialOffset - Initial transform offset (default 6 for y, 8 for x)
 * @returns CSS class string
 */
export const createAnimationClass = (
  shouldAnimate: boolean,
  isVisible: boolean,
  delay: number,
  direction: 'y' | 'x' = 'y',
  initialOffset: number = direction === 'y' ? 6 : 8
): string => {
  if (!shouldAnimate) {
    return direction === 'y' ? 'opacity-100 translate-y-0' : 'opacity-100 translate-x-0';
  }

  const delayClass = delay > 0 ? `delay-${delay}` : '';
  const visibleClass = isVisible 
    ? direction === 'y' ? 'opacity-100 translate-y-0' : 'opacity-100 translate-x-0'
    : direction === 'y' ? `opacity-0 translate-y-${initialOffset}` : `opacity-0 translate-x-${initialOffset}`;

  return `transition-all duration-700 ease-out ${delayClass} ${visibleClass}`.trim();
};

/**
 * Creates animation class specifically for greeting with different initial offset
 */
export const createGreetingAnimationClass = (shouldAnimate: boolean, isVisible: boolean): string => {
  return createAnimationClass(shouldAnimate, isVisible, 0, 'y', 4);
};

/**
 * Generates random interval between min and max values
 * @param min - Minimum interval in milliseconds
 * @param max - Maximum interval in milliseconds
 * @returns Random interval
 */
export const getRandomInterval = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Creates a timestamp string for new alerts
 * @returns Current timestamp string
 */
export const createAlertTimestamp = (): string => {
  return 'Just now';
};
