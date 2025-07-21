# Weather App

A modern weather application built with React, TypeScript, and Tailwind CSS v4.

## Features

- 🌤️ Real-time weather information
- 🔍 City search functionality
- ❄️ Dynamic snow backdrop for cold weather
- 📱 Responsive design
- 🎨 Beautiful UI with Tailwind CSS v4
- ⚡ Fast and lightweight

## Components Structure

```
src/
├── components/
│   ├── Header.tsx          # App header with title
│   ├── SearchBar.tsx       # Search input component
│   ├── WeatherCard.tsx     # Weather display component
│   ├── SnowBackdrop.tsx    # Animated snow effect
│   └── SnowBackdrop.css    # Snow animation styles
├── pages/
│   └── Home.tsx            # Main page component
├── hooks/
│   └── useWeather.ts       # Custom hook for weather data
├── services/
│   └── weatherService.ts   # Weather API service
├── types/
│   └── weather.ts          # TypeScript interfaces
└── App.tsx                 # Root component
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd peempat-weather
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Configuration

To use real weather data, you'll need to:

1. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replace `YOUR_OPENWEATHERMAP_API_KEY` in `src/services/weatherService.ts`
3. Update the `fetchWeather` function in `src/hooks/useWeather.ts` to use the real API

```typescript
// In useWeather.ts, replace this line:
const data = WeatherService.getMockWeatherData(city);

// With this:
const data = await WeatherService.getCurrentWeather(city);
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **OpenWeatherMap API** - Weather data (optional)

## Project Structure

The project follows a clean architecture pattern:

- **Components**: Reusable UI components
- **Pages**: Page-level components
- **Hooks**: Custom React hooks for business logic
- **Services**: API calls and data transformation
- **Types**: TypeScript interfaces and types

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
