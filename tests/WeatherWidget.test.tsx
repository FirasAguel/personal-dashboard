// import { render, screen } from "@testing-library/react";
// import WeatherWidget from "@/components/WeatherWidget";

// describe("WeatherWidget", () => {
//   it("renders the city name", () => {
//     render(<WeatherWidget city="Tokyo" />);
//     expect(screen.getByText(/Tokyo/i)).toBeInTheDocument();
//   });

//   it("shows loading state initially", () => {
//     render(<WeatherWidget city="Tokyo" />);
//     expect(screen.getByText(/loading/i)).toBeInTheDocument();
//   });

//   it("handles error state", async () => {
//     global.fetch = jest.fn(() =>
//       Promise.reject("API is down")
//     ) as jest.Mock;
//     render(<WeatherWidget city="InvalidCity" />);
//     expect(await screen.findByText(/failed to fetch/i)).toBeInTheDocument();
//   });
 
// });

// import { render, screen, waitFor } from "@testing-library/react";
// import WeatherWidget from "@/components/WeatherWidget";


// describe("WeatherWidget (Real API)", () => {
//   it("renders the city name after fetching data", async () => {
//     render(<WeatherWidget city="AAA" />);

//     await waitFor(() => {
//       expect(screen.getByText(/not supported/i)).toBeInTheDocument();
//     });
//   });

//   it("renders the city name after fetching data", async () => {
//     render(<WeatherWidget city="Tokyo" />);

//     await waitFor(() => {
//       expect(screen.getByText(/Tokyo/i)).toBeInTheDocument();
//     }, { timeout: 5000 }); // Adjust timeout if needed
//   });

// });



// import { render, screen, waitFor, cleanup } from "@testing-library/react";
// import WeatherWidget from "@/components/WeatherWidget";

// afterEach(() => {
//   cleanup(); // Clean up DOM
//   jest.restoreAllMocks(); // Reset mocks
// });

// describe("WeatherWidget", () => {
//   it("renders an error message for unsupported city", async () => {
//     render(<WeatherWidget city="AAA" />);

//     await waitFor(() => {
//       expect(screen.getByText(/not supported/i)).toBeInTheDocument();
//     });
//   });

//   it("renders a loading state initially", () => {
//     render(<WeatherWidget city="Tokyo" />);
//     expect(screen.getByText(/Loading weather for/i)).toBeInTheDocument();
//   });

//   it("renders the city name for supported city", async () => {
//     render(<WeatherWidget city="Tokyo" />);

//     await waitFor(() => {
//       expect(screen.getByText(/Tokyo/i)).toBeInTheDocument();
//     });
//   });
// });

import { render, screen, waitFor } from "@testing-library/react";
import WeatherWidget from "@/components/WeatherWidget";

describe("WeatherWidget", () => {
  beforeEach(() => {
    // Mock the global fetch API
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Reset mocks after each test
  });

  it("renders loading state initially", () => {
    render(<WeatherWidget city="Tokyo" />);
    expect(screen.getByText(/Loading weather for Tokyo.../i)).toBeInTheDocument();
  });

  it("renders weather data after a successful fetch", async () => {
    // Mock the API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        current: {
          time: "2025-01-19T03:30",
          interval: 900,
          temperature_2m: 9.3,
          relative_humidity_2m: 67,
          apparent_temperature: 6.8,
          is_day: 1,
        },
        daily: {
          sunrise: ["2025-01-19T07:23"],
          sunset: ["2025-01-19T17:37"],
        },
        timezone_abbreviation: "GMT+1",
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

  it("renders error message for unsupported city", async () => {
    render(<WeatherWidget city="Atlantis" />);

    await waitFor(() => {
      expect(screen.getByText(/Atlantis is not supported/i)).toBeInTheDocument();
    });
  });

  it("renders error message when fetch fails", async () => {
    // Mock a failed fetch
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(<WeatherWidget city="Tokyo" />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument();
    });
  });
});

