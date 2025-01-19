"use client"
import WeatherWidget from "@/components/WeatherWidget";

export default function Home() {

  return (
    <>
    <div className="dashboard">
      <WeatherWidget city="Gabes" />
      <WeatherWidget city="Tokyo" />
      <WeatherWidget city="Paris" />
      <WeatherWidget city="Atlantis" />
      <div className="add-widget widget">
        + Add city
      </div>
    </div>
  </>
  );
}
