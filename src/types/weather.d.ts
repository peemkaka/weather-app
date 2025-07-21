export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  icon: string;
}
export interface ForecastData {
  date: string;
  high: number;
  low: number;
  description: string;
  icon: string;
}

export interface WeatherApiResponse {
    name: string;
    main: {
        temp: number;
        humidity: number;
    }
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
}