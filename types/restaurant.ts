export interface Restaurant {
  id: string;
  name: string;
  address: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  openingHours: string;
  closingHours: string;
  operatingHours?: string; // Full operating hours string (e.g., "Mon-Thu: 11AM-9PM")
  latitude: number;
  longitude: number;
  phone: string;
  description: string;
  vegetarianOptions?: string;
  signatureDishes?: string;
  website?: string;
  specialFeatures?: string;
}

export interface SearchParams {
  latitude?: number;
  longitude?: number;
  address?: string;
}

export interface ApiResponse {
  restaurants: Restaurant[];
  message?: string;
  error?: string;
}
