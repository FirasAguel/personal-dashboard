import React from 'react';
import WeatherWidget from './WeatherWidget';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <WeatherWidget city="Tokyo" />
      <WeatherWidget city="New York" />
      {/* Add more widgets here */}
    </div>
  );
}
