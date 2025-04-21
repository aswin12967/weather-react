import React, { useState, useEffect } from "react";
import "./Weather.css";
import sunny from "./images/sunny.png";
import cloudy from "./images/cloudy.png";
import rainy from "./images/rainy.png";
import thunderstorm from "./images/thunderstorm.png";
import snowy from "./images/snowy.png";
import misty from "./images/misty.png";
import nightClear from "./images/nightClear.png";
import nightCloudy from "./images/nightCloudy.png";
import weatherWomen from "./images/weatherWomen.png";



function Weather() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(null);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);


  const getWeatherData = async () => {
    if (search.trim() === "") {
      setCity(null);
      setError("");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f88b35c101d85bb5f135af4d6c5f7e35&units=metric`
      );
      const result = await response.json();

      if (result.cod === "404") {
        setCity(null);
        setError("City not found. Please try again.");
      } else {
        setCity(result);
        setError("");
      }
    } catch {
      setCity(null);
      setError("Failed to fetch weather data.");
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      setCity(null);
      setError("");
      setHasSearched(false); 
      return;
    }
  
    getWeatherData();
  }, [search]);
  

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (!hasSearched) setHasSearched(true);
  };

 
  

  const getWeatherImage = (main, icon) => {
    const isNight = icon && icon.endsWith("n");
  
    const map = {
      Clear: isNight ? nightClear : sunny,
      Clouds: isNight ? nightCloudy : cloudy,
      Rain: rainy,
      Thunderstorm: thunderstorm,
      Snow: snowy,
      Mist: misty,
      Haze: misty,
      Fog: misty,
      Drizzle: rainy,
    };
  
    return map[main] || sunny;
  };
  
  
  

  const getQuote = (main) => {
    const quotes = {
      Clear: "Open skies, open hearts. A perfect time to shine!",
      Clouds: "A little cloud cover, but your vibe’s still lit ☁️",
      Rain: "Rain's here — grab an umbrella and dance through it!",
      Thunderstorm: "Thunder's loud, but you're louder. Stay safe ⚡",
      Snow: "Snowfall? Cozy vibes and warm drinks ahead ❄️",
      Mist: "It’s a dreamy misty day. Perfect for reflection ☁️",
    };
    return quotes[main] || "Weather’s wild — but you’re wilder.";
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter Your City Name"
        value={search}
        onChange={handleChange}
      />



      {error && <p className="error">{error}</p>}

      {!hasSearched && (
  <div className="weather-intro">
    <img src={weatherWomen} alt="Weather Woman" className="weather-Woman" />
    <p className="quote">Your forecast buddy is ready. Enter a city to begin!</p>
  </div>
)}


      {city && city.weather && city.main && (
        <div className="weather-card">
          <div className="weather-details">
            <h2 className="city-name">{city.name}</h2>
            <div className="icon-temp">
            <img
  className="weather-icon"
  src={getWeatherImage(city.weather[0].main, city.weather[0].icon)}
  alt="Weather Icon"
/>



              <h3 className="temperature">{city.main.temp}°C</h3>
            </div>
            <h3 className="climate-type">{city.weather[0].description}</h3>
          </div>
          <p className="quote">{getQuote(city.weather[0].main)}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;





