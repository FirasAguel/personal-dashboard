import React from "react";
import styles from "./WeatherCard.module.css"; // CSS Module for styling

interface WeatherData {
  temperature: number; // Current temperature
  humidity: number; // Relative humidity
  condition: string; // Weather condition (e.g., "Clear Sky")
  icon: string; // Icon URL or identifier
}

const WeatherCard: React.FC<WeatherData> = ({ temperature, humidity, condition, icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={icon} alt={condition} className={styles.icon} />
        <h2 className={styles.condition}>{condition}</h2>
      </div>
      <div className={styles.body}>
        <p className={styles.temperature}>{Math.round(temperature)}°C</p>
        <p className={styles.humidity}>Humidity: {humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherCard;
