import React from "react";
import WeatherCardBase from "./WeatherCardBase";
import SkeletonCard from "../SkeletonCard";
interface SunriseCardProps {
  title: string;
  icon?: string;
  sunriseTime: string;
  sunsetTime: string;
  className?: string;
  loading?: boolean; // To handle loading state
  onSeeMore?: () => void;
}

const SunriseCard: React.FC<SunriseCardProps> = ({
  title,
  icon,
  sunriseTime,
  sunsetTime,
  className,
  loading = false,
  onSeeMore,
}) => {
  return loading ? (
    <SkeletonCard className="lg:col-span-1" />
  ) : (
    <WeatherCardBase
      title={title}
      icon={icon}
      value={sunriseTime}
      description={`Sunset: ${sunsetTime}`}
      className={className}
      onSeeMore={onSeeMore}
    >
      {/* Sun path curve */}
      <div className="my-4 relative h-8">
        <svg viewBox="0 0 100 20" className="w-full h-full">
          <path
            d="M 10 15 Q 50 0 90 15"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <circle cx="25" cy="8" r="2" fill="white" />
        </svg>
      </div>
    </WeatherCardBase>
  );
};

export default SunriseCard;
