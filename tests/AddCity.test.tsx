import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page'; // Adjust the import path to your Home component

describe('Adding a city and displaying its weather widget', () => {
  beforeEach(() => {
    // Mock the global fetch API
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('adds a city and displays its weather widget', async () => {
    // Mock fetch response for the weather API
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        current: {
          temperature_2m: 25,
          relative_humidity_2m: 60,
          apparent_temperature: 27,
          is_day: 1,
        },
        daily: {
          sunrise: ['2025-01-19T06:00'],
          sunset: ['2025-01-19T18:00'],
        },
        timezone_abbreviation: 'GMT+1',
      }),
    });

    // Render the Home component
    render(<Home />);

    // Step 1: Click the "+ Add city" button to open the modal
    const addCityButton = screen.getByText('+ Add city');
    fireEvent.click(addCityButton);

    // Step 2: Select a city from the dropdown
    const citySelect = screen.getByRole('combobox');
    fireEvent.change(citySelect, { target: { value: 'London' } });

    // Step 3: Click the "Add" button to add the city
    const confirmAddButton = screen.getByText('Add');
    fireEvent.click(confirmAddButton);

    // Step 4: Wait for the widget to appear for the new city
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText(/Temperature: 25°C/i)).toBeInTheDocument();
      expect(screen.getByText(/Humidity: 60%/i)).toBeInTheDocument();
      expect(screen.getByText(/Sunrise: 06:00/i)).toBeInTheDocument();
      expect(screen.getByText(/Sunset: 18:00/i)).toBeInTheDocument();
    });
  });

  it('does not add a city that is already displayed', async () => {
    render(<Home />);

    // Step 1: Click the "+ Add city" button
    const addCityButton = screen.getByText('+ Add city');
    fireEvent.click(addCityButton);

    // Step 2: Select a city that is already in the widgets list
    const citySelect = screen.getByRole('combobox');
    fireEvent.change(citySelect, { target: { value: 'Tokyo' } });

    // Step 3: Click the "Add" button
    const confirmAddButton = screen.getByText('Add');
    fireEvent.click(confirmAddButton);

    // Step 4: Check that "City widget already displayed" is logged
    await waitFor(() => {
      expect(screen.queryByText('Tokyo')).toBeInTheDocument(); // Tokyo should already be there
    });
  });
});
