'use client';
import React, { useState, useEffect } from 'react';
import WeatherWidget from '@/components/WeatherWidget';
import Modal from '@/components/Modal';
import { cityCoordinates } from '../../config/cityCoordinates';

const cities = Object.keys(cityCoordinates).sort();

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [widgets, setWidgets] = useState<string[]>([
    'Gabes',
    'Tokyo',
    'Paris',
    'Atlantis',
  ]);
  const [selectedCity, setSelectedCity] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  return (
    <>
      <Modal onClose={() => setIsModalOpen(false)} visible={isModalOpen}>
        <h2>Select a City</h2>
        <div style={{ display: 'flex' }}>
          <select onChange={handleChange}>
            {cities.map((city, i) => (
              <option value={city} key={i}>
                {city}
              </option>
            ))}
            <option value="Add new city">Add new city</option>
          </select>
          <button
            onClick={() => {
              if (selectedCity === 'Add new city') {
                console.log('Handle add new city');
              } else if (widgets.includes(selectedCity)) {
                console.log('City widget already displayed');
              } else {
                setWidgets((prev) => [...prev, selectedCity]);
                setIsModalOpen(false);
              }
            }}
          >
            Add
          </button>
        </div>
      </Modal>

      <div className="dashboard">
        {widgets.map((city) => (
          <WeatherWidget city={city} key={city} />
        ))}
        <div className="add-widget widget" onClick={() => setIsModalOpen(true)}>
          + Add city
        </div>
      </div>
    </>
  );
}
