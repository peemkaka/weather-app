import React, { useState } from "react";

interface SearchBarProps {
  onSearch?: (city: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Enter city name..." 
}) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() && onSearch) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 text-white bg-[var(--color-header-gray)]/30 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-white/60"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-white/20 text-white rounded-[15px] hover:bg-white/30 transition-colors font-medium"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
