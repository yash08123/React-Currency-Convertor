import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const api = "585bb453c2617ee6bdd1d1111168e0df"; // OpenWeatherMap API key

  const countries = [
    {
      name: "USA",
      states: ["New York", "California", "Texas"],
      cities: {
        "New York": ["New York City", "Buffalo", "Rochester"],
        "California": ["Los Angeles", "San Francisco", "San Diego"],
        "Texas": ["Houston", "Dallas", "Austin"]
      }
    },
    {
      name: "Canada",
      states: ["Ontario", "Quebec", "Alberta"],
      cities: {
        "Ontario": ["Toronto", "Ottawa", "Hamilton"],
        "Quebec": ["Montreal", "Quebec City", "Gatineau"],
        "Alberta": ["Calgary", "Edmonton", "Red Deer"]
      }
    },
    {
      name: "UK",
      states: ["England", "Scotland", "Wales"],
      cities: {
        "England": ["London", "Manchester", "Birmingham"],
        "Scotland": ["Edinburgh", "Glasgow", "Aberdeen"],
        "Wales": ["Cardiff", "Swansea", "Newport"]
      }
    },
    {
      name: "Australia",
      states: ["New South Wales", "Queensland", "Victoria"],
      cities:{
        "New South Wales": ["Sydney", "Newcastle", "Wollongong"],
        "Queensland": ["Brisbane", "Gold Coast", "Sunshine Coast"],
        "Victoria": ["Melbourne", "Geelong", "Ballarat"]
      
      }
    },
    {
      name: "India",
      states: ["Maharashtra", "Karnataka", "Tamil Nadu"],
      cities: {
        "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"]
      }

    },
    {
      name: "Germany",
      states: ["Bavaria", "Hesse", "North Rhine-Westphalia"],
      cities: {
        "Bavaria": ["Munich", "Nuremberg", "Augsburg"],
        "Hesse": ["Frankfurt", "Wiesbaden", "Kassel"],
        "North Rhine-Westphalia": ["Cologne", "Düsseldorf", "Dortmund"]
      }
    },
    {
      name: "France",
      states: ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes"],
      cities: {
        "Île-de-France": ["Paris", "Versailles", "Saint-Denis"],
        "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Toulon"],
        "Auvergne-Rhône-Alpes": ["Lyon", "Grenoble", "Saint-Étienne"]
      }

    },
    {
      name: "Italy",
      states: ["Lombardy", "Lazio", "Veneto"],
      cities: {
        "Lombardy": ["Milan", "Brescia", "Monza"],
        "Lazio": ["Rome", "Latina", "Frosinone"],
        "Veneto": ["Venice", "Verona", "Padua"]
      }
    }
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null); // Reset weatherData to null on error
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
    setState("");
    setCity("");
  };

  const handleChangeState = (e) => {
    setState(e.target.value);
    setCity("");
  };

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md p-4 bg-gray-100 rounded-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">Weather App</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex mb-4">
            <select
              value={country}
              onChange={handleChangeCountry}
              className="w-full px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <select
              value={state}
              onChange={handleChangeState}
              className="w-full px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select State</option>
              {country &&
                countries.find((c) => c.name === country)?.states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
            </select>
            <select
              value={city}
              onChange={handleChangeCity}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select City</option>
              {state &&
                countries
                  .find((c) => c.name === country)
                  ?.cities[state].map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Get Weather
          </button>
        </form>
        {weatherData && (
          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold mb-2">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <div className="flex items-center mb-2">
              <img
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt="weather icon"
                className="w-10 h-10 mr-2"
              />
              <p className="text-lg">{weatherData.weather[0].main}</p>
            </div>
            <p className="text-lg mb-2">{weatherData.weather[0].description}</p>
            <p className="text-lg mb-2">{weatherData.main.temp}°C</p>
            <p className="text-lg mb-2">Humidity: {weatherData.main.humidity}%</p>
            <p className="text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
        {weatherData && (
          <div className="mt-4">
            <p className="text-lg">{getClothingSuggestion(weatherData.main.temp)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
