import { useState, useCallback } from "react";
import type { AirPollutionData } from "../types/weather";
import WeatherService from "../services/weatherService";

export const useAirPollution = () => {
  const [airPollution, setAirPollution] = useState<AirPollutionData | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAirPollution = useCallback(async (latitude: number, longitude: number) => {
    if (!latitude || !longitude) return;

    setLoading(true);
    setError(null);

    try {
      const response = await WeatherService.getAirPollutionData(latitude, longitude);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const airPollutionData: AirPollutionData = {
        aqi: response.list[0].main.aqi,
        components: response.list[0].components,
        dt: response.list[0].dt,
      };
      setAirPollution(airPollutionData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch air pollution data"
      );
      setAirPollution(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAirPollution = useCallback(() => {
    setAirPollution(undefined);
    setError(null);
  }, []);

  return {
    airPollution,
    loading,
    error,
    fetchAirPollution,
    clearAirPollution,
  };
};

export default useAirPollution;
