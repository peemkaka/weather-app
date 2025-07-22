import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SnowBackdrop from "../SnowBackdrop";
import useWeather from "../../hooks/useWeather";
import Header from "../Header";
import ProgressBarCard from "./ProgressBarCard";
import SunriseCard from "./SunriseCard";
import WeatherCardBase from "./WeatherCardBase";
import SevenDayForecastCard from "./SevenDayForecastCard";
import WindCard from "./WindCard";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import useAirPollution from "@/hooks/useAirPollution";
import useSevenHourWeather from "@/hooks/useSevenDayHours";

function Home() {
  const { weatherData, loading, error, fetchWeather } = useWeather();

  const {
    airPollution,
    loading: airPollutionLoading,
    error: airPollutionError,
    fetchAirPollution,
    clearAirPollution,
  } = useAirPollution();

  const {
    loading: sevenLoading,
    sevenHourData,
    fetchWeather: fetchSevenHourWeather,
  } = useSevenHourWeather();
  const [showSnow, setShowSnow] = useState(false);

  const averageHigh = 34; // สมมติค่าเฉลี่ย
  const todayTemp = weatherData?.temperature ?? 0;

  const feelsColder =
    (weatherData?.feels_like ?? 0) < (weatherData?.temperature ?? 0);
  const reason = feelsColder ? "Due to wind chill" : "Due to humidity";

  const deviation =
    todayTemp < averageHigh ? "ต่ำกว่าค่าเฉลี่ย" : "สูงกว่าค่าเฉลี่ย";

  const handleSearch = async (city: string) => {
    // Clear previous air pollution data when searching new city
    clearAirPollution();

    await fetchWeather(city);

    // Show snow effect for cold weather
    if (weatherData && weatherData.temperature < 40) {
      setShowSnow(true);
    } else {
      setShowSnow(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchWeather("Bangkok");
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      weatherData &&
      typeof weatherData.latitude === "number" &&
      typeof weatherData.longitude === "number"
    ) {
      fetchAirPollution(weatherData.latitude, weatherData.longitude);
      if (typeof weatherData.city === "string") {
        fetchSevenHourWeather(weatherData.city);
      }
    }
  }, [weatherData, fetchAirPollution, fetchSevenHourWeather]);
  if (sevenHourData && sevenHourData.list.length > 0) {
    console.log(sevenHourData);
  }

  const getHumidityDescription = (humidity: number) => {
    if (typeof humidity !== "number") return "Unknown";
    if (humidity < 30) {
      return "อากาศแห้ง";
    }
    if (humidity > 70) {
      return "อากาศชื้นมาก";
    }
    return "อากาศชื้น";
  };

  return (
    <div className="min-h-screen bg-gray-400/50 relative">
      {showSnow && <SnowBackdrop intensity="medium" />}

      <div className="relative z-10">
        <Header />

        <main className="p-6">
          {/* Search Bar */}
          <motion.div
            className="w-1/2 mx-auto mb-6 flex"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            <SearchBar
              onSearch={handleSearch}
              placeholder="Enter city name (e.g., Bangkok, London)"
            />
          </motion.div>

          {/* Weather Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.4,
              staggerChildren: 0.1,
            }}
          >
            {/* Home Card */}
            <WeatherCard
              weatherData={
                weatherData || {
                  city: "",
                  country: "",
                  temperature: 0,
                  description: "",
                  humidity: 0,
                  windSpeed: 0,
                  icon: "",
                }
              }
              loading={airPollutionLoading}
            />
            {/* UV Index Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ProgressBarCard
                loading={airPollutionLoading}
                airPollution={airPollution}
                title="Air Quality ( PM2.5 )"
                icon="☀️"
                value={airPollutionLoading ? "Loading.." : "0"}
                description={
                  airPollutionLoading ? "Loading air quality data..." : "Low"
                }
                additionalInfo="Low for the rest of the day"
              />
            </motion.div>

            {/* Sunrise Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <SunriseCard
                title={"SUNRISE"}
                icon="🌅"
                sunriseTime={weatherData?.sunrise ?? ""}
                sunsetTime={weatherData?.sunset ?? ""}
                loading={airPollutionLoading}
              />
            </motion.div>

            {/* Visibility Card */}
            <WeatherCardBase
              title="VISIBILITY"
              icon="👁️"
              value={
                weatherData?.visibility
                  ? `${weatherData.visibility} km`
                  : "Unknown"
              }
              description={"Limited due to snowfall"}
              loading={airPollutionLoading}
            />

            {/* 7 Hour Forecast */}
            <SevenDayForecastCard
              title="7 hours latest forecast"
              forecastData={sevenHourData?.list ?? []}
              loading={airPollutionLoading}
            />
            {/* Wind Card */}
            <WindCard
              title="WIND"
              icon="💨"
              windSpeed={weatherData?.windSpeed || 0}
              windUnit="m/s"
              windDegree={weatherData?.windDegree || 0}
              windDirection={"↑"}
              loading={airPollutionLoading}
            />
            {/* Humidity Card */}
            <WeatherCardBase
              loading={airPollutionLoading}
              title="HUMIDITY"
              icon="💧"
              value={`${weatherData?.humidity || 0}%`}
              description={getHumidityDescription(weatherData?.humidity || 0)}
            />
            {/* Feels Like Card */}
            <WeatherCardBase
              loading={airPollutionLoading}
              title="FEELS LIKE"
              icon="🌡️"
              value={
                weatherData?.feels_like ? `${weatherData.feels_like}°` : "N/A"
              }
              description={reason}
              additionalInfo="4 mm expected in next 24h"
            />

            {/* Averages Card */}
            <WeatherCardBase
              loading={airPollutionLoading}
              title="AVERAGES"
              icon="📊"
              value={todayTemp + "°"}
              description={deviation}
              additionalInfo={`Average H: ${averageHigh}°`}
            />

            {/* Rainfall Card */}
            <WeatherCardBase
              loading={airPollutionLoading}
              title="RAINFALL"
              icon="🌧️"
              value="4 mm"
              description="In last 24h"
              additionalInfo="About 2 inches"
            />

            {/* Air Quality Card */}
            <ProgressBarCard
              loading={airPollutionLoading}
              title="AIR QUALITY"
              icon="🏭"
              value="45"
              description="(Moderate)"
              additionalInfo="Same as yesterday"
              progressWidth="w-5/12"
            />
          </motion.div>

          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              <p>Weather Error: {error}</p>
            </div>
          )}

          {airPollutionError && (
            <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-center">
              <p>Air Pollution Error: {airPollutionError}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
