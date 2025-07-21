import React from "react";
import "./SnowBackdrop.css";

interface SnowBackdropProps {
  intensity?: "light" | "medium" | "heavy";
}

const SnowBackdrop: React.FC<SnowBackdropProps> = ({ intensity = "medium" }) => {
  const getSnowflakeCount = () => {
    switch (intensity) {
      case "light": return 30;
      case "medium": return 60;
      case "heavy": return 100;
      default: return 60;
    }
  };

  const snowflakes = Array.from({ length: getSnowflakeCount() }, (_, i) => (
    <div
      key={i}
      className="snowflake"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 1}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
        fontSize: `${Math.random() * 8 + 8}px`,
      }}
    >
      ❄
    </div>
  ));

  return (
    <div className="snow-container">
      {snowflakes}
    </div>
  );
};

export default SnowBackdrop;
