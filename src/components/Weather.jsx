import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Pune"); 
  //const api = "097d7f9b1b69335b45117e050d9a2431";
   const api = "585bb453c2617ee6bdd1d1111168e0df"; // If the above dosent work use this api key 
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getClothingSuggestion = (temp) => {
    if (temp < 0) {
      return "It's freezing outside, wear a heavy coat and warm clothes.";
    } else if (temp < 10) {
      return "It's cold outside, wear a coat.";
    } else if (temp < 20) {
      return "It's a bit chilly, a sweater should be enough.";
    } else if (temp < 30) {
      return "It's warm outside, a t-shirt should be enough.";
    } else {
      return "It's hot outside, wear light clothes.";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <div
        className=" flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://m-cdn.phonearena.com/images/article/143515-wide-two_1200/Apple-tests-adding-news-to-the-native-Weather-app-in-iOS-16.2-Beta.webp?1667618530')`,
        }}
      >
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <div className="flex flex-col">
              <h1 className="text-3xl text-center text-white   font-semibold mb-4">Weather App</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    value={city}
                    onChange={handleChangeCity}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter city name"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 my-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Get Weather
                </button>
              </form>
              {weatherData && (
                <div className="bg-gray-100 p-4 rounded-md">
                  <h2 className="text-xl font-semibold mb-2">
                    {weatherData.name}, {weatherData.sys.country}
                  </h2>
                  <div className="flex items-center">
                    <img
                      src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                      alt="weather icon"
                      className="w-10 h-10 mr-2"
                    />
                    <p className="text-lg">{weatherData.weather[0].main}</p>
                  </div>
                  <p className="text-lg mt-2">
                    {weatherData.weather[0].description}
                  </p>
                  <p className="text-lg mt-2">{weatherData.main.temp}°C</p>
                  <p className="text-lg mt-2">
                    Humidity: {weatherData.main.humidity}%
                  </p>
                  <p className="text-lg mt-2">
                    Wind Speed: {weatherData.wind.speed} m/s
                  </p>
                  
                </div>
              )}
            </div>

            <div className="mt-4">
            <p className="text-lg mt-2">{getClothingSuggestion(weatherData.main.temp)}</p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
