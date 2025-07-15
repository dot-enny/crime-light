// Utility functions for generating mock timestamps and data for enhanced popups
export function generateMockTimestamp(): string {
  const now = new Date();
  const timeOptions = [
    { value: 2, unit: 'hours' },
    { value: 6, unit: 'hours' },
    { value: 12, unit: 'hours' },
    { value: 1, unit: 'day' },
    { value: 2, unit: 'days' },
    { value: 3, unit: 'days' },
    { value: 1, unit: 'week' },
    { value: 2, unit: 'weeks' },
    { value: 1, unit: 'month' }
  ];
  
  const randomOption = timeOptions[Math.floor(Math.random() * timeOptions.length)];
  const pastTime = new Date(now);
  
  if (randomOption.unit === 'hours') {
    pastTime.setHours(now.getHours() - randomOption.value);
  } else if (randomOption.unit === 'day' || randomOption.unit === 'days') {
    pastTime.setDate(now.getDate() - randomOption.value);
  } else if (randomOption.unit === 'week' || randomOption.unit === 'weeks') {
    pastTime.setDate(now.getDate() - (randomOption.value * 7));
  } else if (randomOption.unit === 'month') {
    pastTime.setMonth(now.getMonth() - randomOption.value);
  }
  
  return pastTime.toISOString();
}

export function formatTimestamp(timestamp: string): string {
  const now = new Date();
  const reportTime = new Date(timestamp);
  const diffMs = now.getTime() - reportTime.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffHours < 1) {
    return 'Just now';
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`;
  } else {
    return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
  }
}

export function getSeverityFromSafetyRating(safetyRating: number): 'high' | 'medium' | 'low' {
  if (safetyRating <= 1) return 'high';
  if (safetyRating <= 2) return 'medium';
  return 'low';
}

export function generateMockReportCount(): number {
  return Math.floor(Math.random() * 50) + 5; // 5-54 reports
}
