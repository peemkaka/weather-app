import React from "react";
import WeatherCardBase from "./WeatherCardBase";
import type { AirPollutionData } from "@/types/weather";
import SkeletonCard from "../SkeletonCard";

interface ProgressBarCardProps {
  title: string;
  icon?: string;
  value: string | number;
  description: string;
  additionalInfo?: string;
  progressWidth?: string; // e.g., "w-1/12", "w-5/12"
  progressColor?: string;
  airPollution?: AirPollutionData;
  loading?: boolean; // To handle loading state
  className?: string;

  onSeeMore?: () => void;
}

const ProgressBarCard: React.FC<ProgressBarCardProps> = ({
  title,
  icon,
  value,
  description,
  additionalInfo,
  progressWidth,
  airPollution,
  loading,
  progressColor = "bg-gradient-to-r from-green-400 to-red-400",
  className,
  onSeeMore,
}) => {
  // Dynamic CSS based on AQI level
  let dynamicProgressColor = progressColor;
  let dynamicProgressWidth = progressWidth;
  let aqiDescription = description;
  let aqiLevel = "";

  if (airPollution?.aqi !== undefined) {
    switch (airPollution.aqi) {
      case 1: // Good - อากาศดี
        dynamicProgressColor = "bg-gradient-to-r from-green-400 to-green-500";
        dynamicProgressWidth = "w-1/5"; // 20%
        aqiDescription = "อากาศดี";
        aqiLevel = "Good";
        break;
      case 2: // Fair - พอใช้
        dynamicProgressColor = "bg-gradient-to-r from-yellow-400 to-yellow-500";
        dynamicProgressWidth = "w-2/5"; // 40%
        aqiDescription = "พอใช้";
        aqiLevel = "Fair";
        break;
      case 3: // Moderate - เริ่มมีผล
        dynamicProgressColor = "bg-gradient-to-r from-orange-400 to-orange-500";
        dynamicProgressWidth = "w-3/5"; // 60%
        aqiDescription = "เริ่มมีผล";
        aqiLevel = "Moderate";
        break;
      case 4: // Poor - ไม่ดี
        dynamicProgressColor = "bg-gradient-to-r from-red-400 to-red-500";
        dynamicProgressWidth = "w-4/5"; // 80%
        aqiDescription = "ไม่ดี";
        aqiLevel = "Poor";
        break;
      case 5: // Very Poor - อันตราย
        dynamicProgressColor = "bg-gradient-to-r from-purple-500 to-red-600";
        dynamicProgressWidth = "w-full"; // 100%
        aqiDescription = "อันตราย";
        aqiLevel = "Very Poor";
        break;
      default:
        // Use default values
        break;
    }
  }
  return loading ? (
    <SkeletonCard className="lg:col-span-1" />
  ) : (
    <WeatherCardBase
      title={title}
      icon={icon}
      value={airPollution ? airPollution.aqi : value}
      description={
        airPollution ? `${aqiLevel} (${aqiDescription})` : description
      }
      additionalInfo={additionalInfo}
      className={className}
      onSeeMore={onSeeMore}
    >
      <div className="mb-3">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className={`h-full ${dynamicProgressColor} ${dynamicProgressWidth} transition-all duration-300 ease-in-out`}
          ></div>
        </div>
      </div>
    </WeatherCardBase>
  );
};

export default ProgressBarCard;
