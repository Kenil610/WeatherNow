import React, { useEffect, useState } from "react";
import WeatherApp from "./WeatherApp";
import { ThemeProvider } from "./ThemeContext";
import "./App.css"

function App() {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <WeatherApp />
    </ThemeProvider>
  );
}

export default App;
