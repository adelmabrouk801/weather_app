import React, { useEffect, useState } from "react";
import { Container, CircularProgress, Typography } from "@mui/material";
import { Search, ForecastTable, CurrentWeather } from "../../components";
import { currentWeatherUrl, weatherApiKey } from "../../healpers";
import { useAppSelector } from "../../App/hooks";
import { selectLocationStatus } from "../../redux/locations/location.reducer";
import LoadingProgress from "../../components/Loading/Loading";

export const AppWrapper = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOnSearchChange = (searchData) => {
    if (searchData) {
      const [lat, long] = searchData.value.split(" ");
      setLoading(true);

      Promise.all([
        fetch(
          `${currentWeatherUrl}/weather?lat=${lat}&lon=${long}&appid=${weatherApiKey}&units=metric`
        ),
        fetch(
          `${currentWeatherUrl}/forecast?lat=${lat}&lon=${long}&appid=${weatherApiKey}&units=metric`
        ),
      ])
        .then(async (responses) => {
          const [weatherResponse, forecastResponse] = await Promise.all(
            responses.map((res) => res.json())
          );
          setCurrentWeather({ city: searchData.label, ...weatherResponse });
          setForecast({ city: searchData.label, ...forecastResponse });
        })
        .catch((error) => {
          setError("Failed to fetch weather data. Please try again.");
          console.error("Error fetching data:", error);
        })
        .finally(() => setLoading(false));
    } else {
      // Handle the case when searchData is null or undefined
      // For example, you might want to reset the state or display an error message.
      console.error("Invalid searchData:", searchData);
    }
  };

  const locationStatus = useAppSelector(selectLocationStatus);
  console.log(locationStatus);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchData(latitude, longitude);
        },
        (error) => {
          setError("Error getting geolocation. Please try again.");
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      console.error("Geolocation is not supported by your browser");
    }
  };

  const fetchData = (lat, long) => {
    setLoading(true);
    Promise.all([
      fetch(
        `${currentWeatherUrl}/weather?lat=${lat}&lon=${long}&appid=${weatherApiKey}&units=metric`
      ),
      fetch(
        `${currentWeatherUrl}/forecast?lat=${lat}&lon=${long}&appid=${weatherApiKey}&units=metric`
      ),
    ])
      .then(async (responses) => {
        const [weatherResponse, forecastResponse] = await Promise.all(
          responses.map((res) => res.json())
        );
        setCurrentWeather({ city: weatherResponse.name, ...weatherResponse });
        setForecast({ city: weatherResponse.name, ...forecastResponse });
      })
      .catch((error) => {
        setError("Failed to fetch weather data. Please try again.");
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Fetch data based on geolocation when the component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchData(latitude, longitude);
        },
        (error) => {
          setError("Error getting geolocation. Please try again.");
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <Container>
      <Search
        onSearchChange={handleOnSearchChange}
        onLocateMe={handleLocateMe}
      />
      {loading && <LoadingProgress loading={loading} />}
      {error && <Typography color="error">{error}</Typography>}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <ForecastTable current={currentWeather} data={forecast} />}
    </Container>
  );
};
