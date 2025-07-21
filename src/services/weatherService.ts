import type {
  WeatherData,
  WeatherApiResponse,
  GeocodeApiResponse,
  AirPollutionResponse,
} from "../types/weather";

// You'll need to get an API key from OpenWeatherMap
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export class WeatherService {
  static async getCurrentWeather(city: string): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error(`Weather data not found for ${city}`);
      }

      const data: WeatherApiResponse = await response.json();

      return this.transformWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }

  static async getSevenHourForecast(city: string): Promise<WeatherData[]> {
    // This method is a placeholder. OpenWeatherMap does not provide a 7-hour forecast endpoint.
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error(`7-hour forecast not found for ${city}`);
      }

      const data = await response.json();
      return data.list.map((item: any) => this.transformSevenHourData(item));
    } catch (error) {
      console.error("Error fetching 7-hour forecast data:", error);
      throw error;
    }
  }

  private static transformSevenHourData(data: WeatherApiResponse): WeatherData {
    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDegree: data.wind.deg,
      icon: data.weather[0].icon,
      pressure: data.main.pressure,
      visibility: data.visibility / 1000, // Convert to km
      timeText: data.dt_txt,
    };
  }

  private static transformWeatherData(data: WeatherApiResponse): WeatherData {
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDegree: data.wind.deg,
      feels_like: data.main.feels_like,
      icon: data.weather[0].icon,
      pressure: data.main.pressure,
      visibility: data.visibility / 1000, // Convert to km
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      latitude: data.coord.lat,
      longitude: data.coord.lon,
    };
  }

  static async getLocationByZip(
    zipCode: string,
    countryCode: string
  ): Promise<GeocodeApiResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/geo/1.0/zip?zip=${encodeURIComponent(
          zipCode
        )},${encodeURIComponent(countryCode)}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(
          `Location not found for zip code ${zipCode}, ${countryCode}`
        );
      }

      const data: GeocodeApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      throw error;
    }
  }

  // Fetch air pollution data based on latitude and longitude
  static async getAirPollutionData(
    lat: number,
    lon: number
  ): Promise<AirPollutionResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Air pollution data not found");
      }

      const data: AirPollutionResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching air pollution data:", error);
      throw error;
    }
  }
}

export default WeatherService;
