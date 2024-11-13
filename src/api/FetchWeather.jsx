const URL = String(import.meta.env.VITE_WEATHER_APP_URL);
const API_KEY = String(import.meta.env.VITE_WEATHER_APP_KEY);

const FetchWeather = async (query) => {
  try {
    const response = await fetch(`${URL}?q=${query}&units=metric&appid=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error; // Rethrow the error or handle it as needed
  }
};


export default FetchWeather;