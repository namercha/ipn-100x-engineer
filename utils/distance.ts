/**
 * Distance calculation utilities
 * Uses the Haversine formula to calculate distance between two points
 */

// Earth's radius in kilometers
const EARTH_RADIUS_KM = 6371;

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param lat1 Latitude of point 1
 * @param lon1 Longitude of point 1
 * @param lat2 Latitude of point 2
 * @param lon2 Longitude of point 2
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

/**
 * Format distance for display
 * @param distanceKm Distance in kilometers
 * @returns Formatted distance string
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

// Default coordinates for Houston (used when no location is provided)
export const DEFAULT_COORDINATES = {
  latitude: 29.7604,
  longitude: -95.3698,
};

/**
 * Simple geocoding mock - in production, use a real geocoding API
 * This provides approximate coordinates for common search terms
 */
export function mockGeocode(address: string): { latitude: number; longitude: number } | null {
  const addressLower = address.toLowerCase();

  // Simple keyword matching for demo purposes
  const locationMap: Record<string, { latitude: number; longitude: number }> = {
    // Houston locations
    'houston': { latitude: 29.7604, longitude: -95.3698 },
    'downtown houston': { latitude: 29.7523, longitude: -95.3632 },
    'downtown': { latitude: 29.7523, longitude: -95.3632 },
    'midtown': { latitude: 29.7408, longitude: -95.3847 },
    'montrose': { latitude: 29.7441, longitude: -95.3874 },
    'galleria': { latitude: 29.7412, longitude: -95.4612 },
    'westheimer': { latitude: 29.7398, longitude: -95.4321 },
    'hillcroft': { latitude: 29.7234, longitude: -95.5367 },
    'bellaire': { latitude: 29.7056, longitude: -95.5512 },
    'rice village': { latitude: 29.7168, longitude: -95.4138 },
    'medical center': { latitude: 29.7089, longitude: -95.4012 },
    'kirby': { latitude: 29.7352, longitude: -95.4214 },
    'heights': { latitude: 29.7924, longitude: -95.3987 },
    'memorial': { latitude: 29.7756, longitude: -95.4891 },
    // Houston zip codes
    '77002': { latitude: 29.7523, longitude: -95.3632 },
    '77006': { latitude: 29.7441, longitude: -95.3874 },
    '77027': { latitude: 29.7398, longitude: -95.4321 },
    '77036': { latitude: 29.7056, longitude: -95.5512 },
    '77057': { latitude: 29.7312, longitude: -95.5189 },
    '77063': { latitude: 29.7412, longitude: -95.5012 },
    '77074': { latitude: 29.6889, longitude: -95.5234 },
    '77081': { latitude: 29.7234, longitude: -95.5367 },
    '77098': { latitude: 29.7352, longitude: -95.4214 },
    '77099': { latitude: 29.6847, longitude: -95.5892 },
  };

  // Check for exact matches first
  for (const [key, coords] of Object.entries(locationMap)) {
    if (addressLower.includes(key)) {
      return coords;
    }
  }

  // Default to Houston city center if no match
  return DEFAULT_COORDINATES;
}
