'use client';

import Image from 'next/image';

interface WeatherData {
  time: string;
  temp_max: string;
  temp_min: string;
}

export default function WeatherCard({ wdata }: { wdata: any }) {
  const wdata_card: WeatherData[] = [];
  wdata.daily.time.forEach((_: any, index: number) => {
    wdata_card.push({
      time: wdata.daily.time[index],
      temp_max: wdata.daily.temperature_2m_max[index],
      temp_min: wdata.daily.temperature_2m_min[index],
    });
    return wdata;
  });

  return wdata_card.map((wdata: WeatherData, index: number) => {
    return (
      <div
        key={index}
        className='flex-1 rounded overflow-hidden shadow-lg border border-gray-600 snap-start scroll-ml-6'>
        <div className='flex flex-col'>
          <div className='font-bold text-xl mb-2 text-gray-600 p-10'>
            <Image
              src={`/weather-icons/sunny.svg`}
              alt={'Sunny'}
              width={128}
              height={128}
            />
          </div>
          <div className='flex flex-col text-center'>
            <div className='py-2 text-gray-400'>{wdata.time}</div>
            <div className='flex flex-row text-center'>
              <div className='flex-1'>{wdata.temp_max}°C</div>
              <div className='flex-1'>{wdata.temp_min}°C</div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}
