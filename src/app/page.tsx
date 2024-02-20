'use client';

import Image from 'next/image';
import NavBar from '../components/NavBar';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';
import { format, fromUnixTime, parseISO } from 'date-fns';
import Container from '@/components/Container';
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import WeatherIcon from '@/components/WeatherIcon';
import { getDayNightIcon } from '@/utils/getDayNightIcon';
import { metersToKilometers } from '@/utils/metersToKilometers';
import WeatherDetails from '@/components/WeatherDetails';
import { convertWindSpeed } from '@/utils/convertWindSpeed';

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
  cod: '200',
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
    'repoData',
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=mexico&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  );

  const firstData = data?.list[0];

  console.log('data', data);

  if (isLoading)
    return (
      <div className='flex items-center min-h-screen justify-center'>
        <p className='animate-bounce'>Loading...</p>
      </div>
    );

  return (
    <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
      <NavBar />
      <main className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
        {/* today data */}
        <section className='space-y-4'>
          <div className='space-y-2'>
            <h2 className='flex gap-1 text-2xl items-end'>
              <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
              <p className='text-lg'>
                ({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})
              </p>
            </h2>
            <Container className='gap-10 px-6 items-center'>
              {/* temperature */}
              <div className='flex flex-col px-4'>
                <span className='text-5xl'>
                  {convertKelvinToCelsius(firstData?.main.temp ?? 300.99)}°
                </span>
                <p className='text-xs space-x-1 whitespace-nowrap'>
                  <span>Feels like</span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                  </span>
                </p>
                <p className='text-xs space-x-2'>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓{' '}
                  </span>
                  <span>
                    {' '}
                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                  </span>
                </p>
              </div>
              {/* time and weather icon */}
              <div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3'>
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className='flex flex-col justify-between gap-2 items-center text-xs font-semibold'
                  >
                    <p className='whitespace-nowrap'>
                      {format(parseISO(d.dt_txt), 'h:mm a')}
                    </p>
                    {/* <WeatherIcon iconName={d.weather[0].icon} /> */}
                    <WeatherIcon
                      iconName={getDayNightIcon(d.weather[0].icon, d.dt_txt)}
                    />
                    <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className='flex gap-4'>
            {/* left */}
            <Container className='w-fit justify-center flex-col px-4 items-center'>
              <p className=' capitalize text-center'>
                {firstData?.weather[0].description}
              </p>
              <WeatherIcon
                iconName={getDayNightIcon(
                  firstData?.weather[0].icon ?? '',
                  firstData?.dt_txt ?? ''
                )}
              />
            </Container>
            <Container className='bg-yellow-300/80 px-6 gap-4 justify-between overflow-auto'>
              <WeatherDetails
                visibility={metersToKilometers(firstData?.visibility ?? 10000)}
                airPressure={`${firstData?.main.pressure} hPa`}
                humidity={`${firstData?.main.humidity}%`}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 1702949452),
                  'H:mm'
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 1702517657),
                  'H:mm'
                )}
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.65)}
              />
            </Container>
            {/* right */}
          </div>
        </section>
        {/* 7 day forcast data */}
        <section className='flex w-full flex-col gap-4'>
          <p className='text-2xl'>Forcast (7 days)</p>
        </section>
      </main>
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
