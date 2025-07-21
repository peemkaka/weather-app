import React from "react";
import WeatherCardBase from "./WeatherCardBase";

interface WindCardProps {
  title: string;
  icon?: string;
  windSpeed: number;
  windUnit?: string;
  windDegree?: number; // Optional for wind direction in degrees
  windDirection?: string;
  className?: string;
  onSeeMore?: () => void;
}

const WindCard: React.FC<WindCardProps> = ({
  title,
  icon,
  windSpeed,
  windUnit = "m/s",
  windDegree,
  windDirection,
  className,
  onSeeMore,
}) => {
  return (
    <WeatherCardBase
      title={title}
      icon={icon}
      value=""
      className={className}
      onSeeMore={onSeeMore}
      showSeeMore={true}
    >
      {/* Wind compass */}
      <div className="flex items-center justify-center my-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border border-white/30"></div>
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs opacity-60">
            N
          </div>
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs opacity-60">
            S
          </div>
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs opacity-60">
            W
          </div>
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs opacity-60">
            E
          </div>

          {/* Wind direction arrow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="text-lg transition-transform duration-300"
              style={{ transform: `rotate(${(windDegree ? (windDegree + 180) % 360 : 0)}deg)` }}
            >
              {windDirection || "↑"}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-light">{windSpeed}</div>
        <div className="text-xs opacity-80">{windUnit}</div>
      </div>
    </WeatherCardBase>
  );
};

export default WindCard;
