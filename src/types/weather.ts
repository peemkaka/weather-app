// Geocoding API Response Types
export interface GeocodeApiResponse {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
}

// Air Pollution API Response Types
export interface AirPollutionResponse {
  list: {
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }[];
}
// Weather API Response Types
export interface WeatherData {
  city?: string;
  country?: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  windDegree?: number; // Optional for wind direction
  icon: string;
  pressure?: number;
  visibility?: number;
  uvIndex?: number;
  sunrise?: string;
  sunset?: string;
  latitude?: number;
  longitude?: number;
  timeText?: string; // Optional for time text in 7-hour forecast
  feels_like?: number; // Optional for "feels like" temperature
}

export interface AirPollutionData {
  aqi: number; // Air Quality Index
  components: {
    co: number; // Carbon Monoxide
    no: number; // Nitric Oxide
    no2: number; // Nitrogen Dioxide
    o3: number; // Ozone
    pm2_5: number; // Particulate Matter 2.5
    pm10: number; // Particulate Matter 10
    nh3: number; // Ammonia
  };
  dt: number; // Timestamp of the data
}

export interface WeatherApiResponse {
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like?: number; // Optional for "feels like" temperature
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number; // Wind direction in degrees
  };
  visibility: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt_txt?: string; // Optional for 7-hour forecast time text
  name: string;
}

export interface SearchBarProps {
  onSearch?: (city: string) => void;
  placeholder?: string;
}

export interface WeatherCardProps {
  data?: WeatherData;
  loading?: boolean;
}

export interface HeaderProps {
  title?: string;
}

export interface SnowBackdropProps {
  intensity?: "light" | "medium" | "heavy";
}
