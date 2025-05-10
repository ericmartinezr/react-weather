'use client';

import WeatherCard from './weather_card';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Weather({ startDate }: { startDate: string }) {
  const { data, error, isLoading } = useSWR(
    `api/weather/${startDate}`,
    fetcher
  );

  if (isLoading) return <h1>Cargando...</h1>;
  if (error || data.error) return <h1>Error...</h1>;

  return <WeatherCard wdata={data} />;
}
