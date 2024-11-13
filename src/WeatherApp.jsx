import { useTheme } from "./ThemeContext";
import React, { useState } from "react";
import FetchWeather from "./api/FetchWeather";
import ThemeBtn from "./ThemeBtn";
import dark from "./assets/moon.jpg";
import light from "./assets/sun.jpg";

const WeatherApp = () => {
  const { themeMode } = useTheme();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (city === "") {
      showMessage("Please provide city name!");
    } else {
      try {
        const data = await FetchWeather(city);
        setWeather(data);
        setCity("");
      } catch (error) {
        showMessage("Please provide valid city name!");
      }
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="relative h-screen p-6 md:p-9 bg-white dark:bg-black">
      <div
        className="relative flex items-center justify-center h-full bg-cover bg-center rounded-2xl"
        style={{
          backgroundImage: `url(${themeMode === "dark" ? dark : light})`,
        }}
      >
        {message && (
          <div className="fixed z-50 top-4 transform -translate-x-1/2 px-6 py-3 bg-red-500 text-white rounded-lg shadow-xl text-center font-semibold animate-slide-up-down">
            {message}
          </div>
        )}

        {/* Theme Toggle Button in Upper Right */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeBtn />
        </div>

        {/* Overlay to Darken Background */}
        <div className="absolute inset-0 bg-black opacity-5 rounded-2xl backdrop-blur-lg"></div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-xs sm:max-w-md md:max-w-lg p-6 md:p-10 text-gray-100 bg-black bg-opacity-50 rounded-lg shadow-lg">
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-4 text-center">
            WeatherNow 🌦️
          </h1>
          <h2 className="text-xl md:text-1xl mb-4 text-center">
            The Only Weather Forecast You Need
          </h2>

          {/* Input and Search Button */}
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 border border-gray-500 rounded-lg text-gray-800 mb-4"
          />
          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Get Weather
          </button>

          {/* Weather Display Section */}
          {weather && (
            <div className="mt-6 md:mt-8 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="text-5xl md:text-6xl font-bold text-pink-500 mb-2">
                {Math.round(weather.main.temp)}°C
              </div>
              <p className="text-base md:text-lg mb-4 text-gray-300 italic tracking-wide">
                {weather.weather[0].description}
              </p>
              <div className="grid grid-cols-2 gap-2 md:gap-4 text-gray-300">
                <p className="flex items-center justify-center space-x-2 text-sm md:text-lg">
                  🌡️ Humidity: {weather.main.humidity}%
                </p>
                <p className="flex items-center justify-center space-x-2 text-sm md:text-lg">
                  ☁️ Cloud Cover: {weather.clouds.all}%
                </p>
                <p className="flex items-center justify-center space-x-2 text-sm md:text-lg">
                  🔽 Min Temp: {Math.round(weather.main.temp_min)}°C
                </p>
                <p className="flex items-center justify-center space-x-2 text-sm md:text-lg">
                  🔼 Max Temp: {Math.round(weather.main.temp_max)}°C
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
