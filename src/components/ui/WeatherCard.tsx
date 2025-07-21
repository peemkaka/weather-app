import React from 'react';
import type { WeatherData } from '../../types/weather';
import SkeletonCard from '../SkeletonCard';

type WeatherCardProps = {
  weatherData: WeatherData;
  time?: string;
  loading?: boolean;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  time,
  loading = false,
}) => {
  // ถ้ากำลัง loading หรือไม่มีข้อมูล แสดง skeleton
  if (loading || !weatherData.city) {
    return <SkeletonCard />;
  }

  const {
    city,
    country,
    temperature,
    description,
    humidity,
    windSpeed,
    pressure,
    visibility
  } = weatherData;
  
  return (
    <div className="bg-[#6D6E71] text-white rounded-2xl p-6 shadow-lg relative lg:col-span-2">
      {time && (
        <div className="absolute top-3 right-4 text-xs text-gray-200 opacity-80">
          {time}
        </div>
      )}

      <h2 className="text-lg font-semibold">{city}, {country}</h2>
      <p className="text-4xl font-bold mt-2">{temperature}°C</p>
      <p className="capitalize text-sm mt-1 text-gray-200">{description}</p>

      <div className="mt-4 text-xs text-gray-300 space-y-1">
        <div className="flex justify-between">
          <span>Humidity: {humidity}%</span>
          <span>Wind: {windSpeed} m/s</span>
        </div>
        {pressure && visibility && (
          <div className="flex justify-between">
            <span>Pressure: {pressure} hPa</span>
            <span>Visibility: {visibility} km</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
