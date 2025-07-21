import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <div className="px-6 py-6 flex items-center justify-center">
        {/* Left spacer */}
        <div className="flex-1 hidden md:flex"></div>

        {/* Center navigation group */}
        <div className="bg-[var(--color-header-gray)]/90 px-8 py-2 flex items-center gap-6 text-white rounded-full shadow-sm">
          <span className="text-sm font-medium cursor-pointer hover:text-gray-200 transition-colors">
            Browse
          </span>
          <span className="text-sm font-medium cursor-pointer hover:text-gray-200 transition-colors">
            Map
          </span>
          <span className="text-sm font-medium cursor-pointer text-[var(--color-header-gray)] hover:text-gray-200 transition-colors bg-white px-3 py-1 rounded-full">
            Metrics
          </span>
        </div>

        {/* Right action group */}
        <div className="flex-1 hidden md:flex justify-end">
          <div className="px-8 py-2 flex items-center gap-6 text-white rounded-full">
            <span className="text-sm font-medium cursor-pointer hover:text-gray-200 transition-colors">
              Change
            </span>
            <span className="text-sm font-medium cursor-pointer hover:text-gray-200 transition-colors">
              ⚙️
            </span>
            <span className="text-sm font-medium cursor-pointer hover:text-gray-200 transition-colors">
              🔔
            </span>
            <span className="text-sm font-medium cursor-pointer hover:text-gray-200 transition-colors">
              ❓
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
