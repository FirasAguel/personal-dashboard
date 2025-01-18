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





import { render, screen, waitFor, cleanup } from "@testing-library/react";
import WeatherWidget from "@/components/WeatherWidget";

afterEach(() => {
  cleanup(); // Clean up DOM
  jest.restoreAllMocks(); // Reset mocks
});

describe("WeatherWidget", () => {
  it("renders an error message for unsupported city", async () => {
    render(<WeatherWidget city="AAA" />);

    await waitFor(() => {
      expect(screen.getByText(/not supported/i)).toBeInTheDocument();
    });
  });

  it("renders the city name for supported city", async () => {
    render(<WeatherWidget city="Tokyo" />);

    await waitFor(() => {
      expect(screen.getByText(/Tokyo/i)).toBeInTheDocument();
    });
  });
});
