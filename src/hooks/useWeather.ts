import { useState, useCallback } from "react";
import type { WeatherData } from "../types/weather";
import WeatherService from "../services/weatherService";

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await WeatherService.getCurrentWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data");
      setWeatherData(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearWeather = useCallback(() => {
    setWeatherData(undefined);
    setError(null);
  }, []);

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
    clearWeather,
  };
};

export default useWeather;
