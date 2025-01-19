import { render, screen, waitFor } from '@testing-library/react';
import WeatherWidget from '@/components/WeatherWidget';

describe('WeatherWidget', () => {
  beforeEach(() => {
    // Mock the global fetch API
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Reset mocks after each test
  });

  it('renders loading state initially', () => {
    render(<WeatherWidget city="Tokyo" />);
    expect(
      screen.getByText(/Loading weather for Tokyo.../i)
    ).toBeInTheDocument();
  });

  it('renders weather data after a successful fetch', async () => {
    // Mock the API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        current: {
          time: '2025-01-19T03:30',
          interval: 900,
          temperature_2m: 9.3,
          relative_humidity_2m: 67,
          apparent_temperature: 6.8,
          is_day: 1,
        },
        daily: {
          sunrise: ['2025-01-19T07:23'],
          sunset: ['2025-01-19T17:37'],
        },
        timezone_abbreviation: 'GMT+1',
      }),
    });

    render(<WeatherWidget city="Tokyo" />);

    // Wait for the weather data to appear
    await waitFor(() => {
      expect(screen.getByText(/Tokyo/i)).toBeInTheDocument();
      expect(screen.getByText(/Temperature: 9.3°C/i)).toBeInTheDocument();
      expect(screen.getByText(/Humidity: 67%/i)).toBeInTheDocument();
      expect(screen.getByText(/Sunrise: 07:23/i)).toBeInTheDocument();
      expect(screen.getByText(/Sunset: 17:37/i)).toBeInTheDocument();
    });
  });

  it('renders error message for unsupported city', async () => {
    render(<WeatherWidget city="Atlantis" />);

    await waitFor(() => {
      expect(
        screen.getByText(/Atlantis is not supported/i)
      ).toBeInTheDocument();
    });
  });

  it('renders error message when fetch fails', async () => {
    // Mock a failed fetch
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    render(<WeatherWidget city="Tokyo" />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument();
    });
  });
});
