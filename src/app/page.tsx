"use client"

import { useState, useEffect } from "react";
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true&timezone=Asia/Tokyo"
        );
        const data = await response.json();
        const { temperature, weathercode, relative_humidity } = data.current_weather;
        setWeather({
          temperature,
          humidity: relative_humidity,
          condition: getWeatherCondition(weathercode),
          icon: getWeatherIcon(weathercode),
        });
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      }
    };

    fetchWeather();
  }, []);

  function getWeatherCondition(code: number): string {
    const conditions: Record<number, string> = {
      0: "Clear Sky",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Overcast",
      // Add more mappings as needed
    };
    return conditions[code] || "Unknown";
  }

  function getWeatherIcon(code: number): string {
    return `https://openweathermap.org/img/wn/${code}.png`;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", padding: "20px"}}>
      {weather ? (
        <WeatherCard
          temperature={weather.temperature}
          humidity={weather.humidity}
          condition={weather.condition}
          icon={weather.icon}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


  /*

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
*/
