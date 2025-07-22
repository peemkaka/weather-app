import type { WeatherData } from "@/types/weather";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";
import { WiDaySunny } from "react-icons/wi";
import SkeletonCard from "../SkeletonCard";

// Configure dayjs
dayjs.extend(relativeTime);
dayjs.locale("th");

interface SevenDayForecastCardProps {
  title: string;
  icon?: string;
  forecastData: WeatherData[];
  className?: string;
  loading?: boolean; // To handle loading state
  onSeeMore?: () => void;
}

const SevenDayForecastCard: React.FC<SevenDayForecastCardProps> = ({
  title,
  icon,
  forecastData,
  className = "",
  loading = false,
  onSeeMore,
}) => {
  // Function to format time text
  const formatTimeText = (timeText: string): string => {
    const now = dayjs();
    const targetTime = dayjs(timeText);

    const diffInHours = targetTime.diff(now, "hour");
    const diffInDays = targetTime.diff(now, "day");

    // If it's the same day
    if (diffInDays === 0) {
      if (diffInHours === 0) {
        return "ตอนนี้";
      } else if (diffInHours > 0) {
        return `${diffInHours} ชั่วโมงจากนี้`;
      } else {
        return `${Math.abs(diffInHours)} ชั่วโมงที่แล้ว`;
      }
    }

    // If it's yesterday
    if (diffInDays === -1) {
      return `เมื่อวาน ${Math.abs(diffInHours % 24)} ชั่วโมงที่แล้ว`;
    }

    // If it's tomorrow
    if (diffInDays === 1) {
      return `พรุ่งนี้ ${diffInHours % 24} ชั่วโมงคาดว่า`;
    }

    // For other days, show day name or date
    if (diffInDays > 1 && diffInDays <= 7) {
      return `${diffInDays} วันจากนี้`;
    } else if (diffInDays < -1 && diffInDays >= -7) {
      return `${Math.abs(diffInDays)} วันที่แล้ว`;
    }

    // For dates beyond a week, show formatted date
    return targetTime.format("DD/MM/YYYY");
  };

  const getWeatherIcon = (description: string) => {
    if (description.includes("clear")) return "☀️";
    if (description.includes("cloud")) return "☁️";
    if (description.includes("rain")) return "🌧️";
    if (description.includes("snow")) return "❄️";
    if (description.includes("thunderstorm")) return "⛈️";
    if (description.includes("mist") || description.includes("fog"))
      return "🌫️";
    return "🌡️"; // default
  };

  return loading ? (
    <SkeletonCard className="lg:col-span-2 lg:row-span-2" />
  ) : (
    <div
      className={`bg-[#6D6E71] backdrop-blur-sm rounded-2xl p-6 text-white lg:row-span-2 lg:col-span-2 ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium opacity-80">
          {icon && `${icon} `}
          {title}
        </span>
      </div>

      <div className="space-y-3">
        {forecastData.map((day, index) => (
          <div
            key={index}
            className="text-4xl font-light mb-2 flex flex-row gap-2 items-start justify-between space-x-4"
          >
            <div className="text-sm my-auto items-center justify-center">
              {formatTimeText(day.timeText || "")}
            </div>
            <span className="min-w-[3rem]">{day.temperature}°</span>
            <div className="flex flex-col">
              <p className="text-sm opacity-80">ความชื้น {day.humidity}%</p>
              <p className="text-xs opacity-70">{day.description}</p>
            </div>
            <div>{getWeatherIcon(day.description) || ""}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className="text-sm opacity-80 cursor-pointer hover:opacity-100 transition-opacity"
          onClick={onSeeMore}
        >
          See More
        </span>
        <span className="text-sm">›</span>
      </div>
    </div>
  );
};

export default SevenDayForecastCard;
