import React, { useState, useEffect } from "react";
import styles from "./WeatherWidget.module.css";
import { cityCoordinates } from "../../config/cityCoordinates";

interface WeatherWidgetProps {
  city: string;
}

const fetchCoordinates = (city: string) => cityCoordinates[city] || { latitude: 0, longitude: 0 };

const getCurrentTimeFromGMT = (gmtOffset: string): string => {

  const normalizedOffset = gmtOffset === "GMT" ? "GMT+0" : gmtOffset;

  const offsetInHours = parseInt(normalizedOffset.replace("GMT", ""), 10);

  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;

  const localTime = new Date(utcTime + offsetInHours * 60 * 60 * 1000);

  const hours = localTime.getHours().toString().padStart(2, "0");
  const minutes = localTime.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city }) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { latitude, longitude } = fetchCoordinates(city);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        if(latitude===0 && longitude === 0) //大西洋の中
          throw new Error(`${city} is not supported`);
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation&hourly=temperature_2m&&daily=sunrise,sunset&timezone=auto`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return <div className={`${styles['weather-widget']} widget`}>Loading weather for {city}...</div>;
  }

  if (error) {
    return <div className={`${styles['weather-widget']} widget`}>Error: {error}</div>;
  }

  return (
    <div className={`${styles['weather-widget']} widget ${weather?.current.is_day === 1 ? styles.day : styles.night}`}>
      <div className={styles.minimal}>
        <h2>{city}</h2>
        <h3>{getCurrentTimeFromGMT(weather?.timezone_abbreviation)}</h3>
        <p className={styles.hideOnHover}> 
          {Math.round(weather?.current.apparent_temperature)}°{' '}
          {weather?.current.relative_humidity_2m}%
        </p>
      </div>
      <div className={styles.details}>
        <p>Temperature: {weather?.current.temperature_2m}°C</p>
        <p>Apparent Temperature: {weather?.current.apparent_temperature}°C</p>
        <p>Humidity: {weather?.current.relative_humidity_2m}%</p>
        <p>Sunrise: {weather?.daily.sunrise[0].split('T')[1]}</p>
        <p>Sunset: {weather?.daily.sunset[0].split('T')[1]}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;