import { useState, useCallback } from "react";
import type { WeatherData } from "../types/weather";
import WeatherService from "../services/weatherService";

type SevenDayWeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
};

export const useSevenHourWeather = () => {
  const [sevenHourData, setSevenHourData] = useState<
    SevenDayWeatherData | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await WeatherService.getSevenHourForecast(city);
      // If data is WeatherData[], wrap it in SevenDayWeatherData
      setSevenHourData({
        cod: "200",
        message: 0,
        cnt: data.length,
        list: data.slice(0, 7), // Limit to 7 items for 7-hour forecast
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch 7-hour weather data"
      );
      setSevenHourData(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearWeather = useCallback(() => {
    setSevenHourData(undefined);
    setError(null);
  }, []);

  return {
    sevenHourData,
    loading,
    error,
    fetchWeather,
    clearWeather,
  };
};

export default useSevenHourWeather;
