"use client";

import Image from "next/image";
import NavBar from "../components/NavBar";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";

//

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: CityInfo;
}

interface WeatherEntry {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

// Example usage:
const data: WeatherData = {
  cod: "200",
  message: 0,
  cnt: 2,
  list: [
    // WeatherEntry objects here
  ],
  city: {
    // CityInfo object here
  },
};

const queryClient = new QueryClient();

export function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
    // fetch(
    //   `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
    // ).then((res) => res.json())
  );

  console.log("data", data);

  if (isLoading) return "Loading...";

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <NavBar />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
