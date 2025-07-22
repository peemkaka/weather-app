import React from "react";
import type { ReactNode } from "react";
import type { Skeleton } from "./skeleton";
import SkeletonCard from "../SkeletonCard";

interface WeatherCardBaseProps {
  title: string;
  icon?: string;
  value: string | number;
  description?: string;
  additionalInfo?: string;
  children?: ReactNode;
  className?: string;
  showSeeMore?: boolean;
  loading?: boolean; // To handle loading state
  onSeeMore?: () => void;
}

const WeatherCardBase: React.FC<WeatherCardBaseProps> = ({
  title,
  icon,
  value,
  description,
  additionalInfo,
  children,
  className = "",
  showSeeMore = true,
  loading = false,
  onSeeMore,
}) => {
  return (
    loading? <SkeletonCard className="lg:col-span-1"/> :
    <div className={`bg-[#6D6E71] backdrop-blur-sm rounded-2xl p-6 text-white ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium opacity-80">
          {icon && `${icon} `}{title}
        </span>
      </div>
      
      <div className="text-4xl font-light mb-2">{value}</div>
      
      {description && (
        <p className="text-sm opacity-80 mb-2">{description}</p>
      )}
      
      {additionalInfo && (
        <p className="text-xs opacity-70 mb-4">{additionalInfo}</p>
      )}
      
      {children}
      
      {showSeeMore && (
        <div className="mt-4 flex items-center justify-between">
          <span 
            className="text-sm opacity-80 cursor-pointer hover:opacity-100 transition-opacity"
            onClick={onSeeMore}
          >
            See More
          </span>
          <span className="text-sm">›</span>
        </div>
      )}
    </div>
  );
};

export default WeatherCardBase;
