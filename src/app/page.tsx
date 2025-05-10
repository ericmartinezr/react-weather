'use client';

import dayjs from 'dayjs';
import Weather from './weather';
import { Dispatch, SetStateAction, Suspense, useState } from 'react';
import Link from 'next/link';

// Son 16 días máximo (hacia adelante)
// y cada vez muestro 7 días, comienzo con 7 días
function checkRange(
  startDate: string,
  setInvalidDateRange: Dispatch<SetStateAction<boolean>>
) {
  const today_dayjs = dayjs(startDate);
  const today = today_dayjs.format('YYYY-MM-DD');
  // Le sumo 15 ya que day.js no incluye el día actual en la suma
  const lastDayPossible_dayjs = dayjs().add(15, 'day');
  const lastDayPossible = lastDayPossible_dayjs.format('YYYY-MM-DD');

  // Si al avanzar con el boton el ultimo dia posible es igual a hoy
  // o si la diferencia entre el ultimo dia posible y hoy es menor o igual a 7 (mostramos 7 dias)
  // entonces deshabilito el boton para avanzar
  if (
    today == lastDayPossible ||
    lastDayPossible_dayjs.diff(today, 'day') <= 7
  ) {
    setInvalidDateRange(true);
  } else {
    setInvalidDateRange(false);
  }
}

export default function Home() {
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [invalidDateRange, setInvalidDateRange] = useState(false);

  return (
    <>
      <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
        <main className='row-start-2'>
          <div className='flex flex-row gap-[32px] items-center sm:items-start h-80'>
            <Suspense fallback={<div>Loading...</div>}>
              <Weather startDate={startDate} />
            </Suspense>
          </div>
          <div className='text-center mt-10'>
            <input
              onClick={() => {
                setStartDate(
                  dayjs(startDate).subtract(8, 'day').format('YYYY-MM-DD')
                );

                checkRange(startDate, setInvalidDateRange);
              }}
              type='button'
              value='Semana anterior'
              className='bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-indigo-800 hover:to-purple-800 text-white text-xl font-semibold px-4 py-2 m-4 rounded'
            />
            <input
              onClick={() => {
                setStartDate(
                  dayjs(startDate).add(8, 'day').format('YYYY-MM-DD')
                );

                checkRange(startDate, setInvalidDateRange);
              }}
              disabled={invalidDateRange}
              type='button'
              value='Siguiente'
              className='bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-indigo-800 hover:to-purple-800 text-white text-xl font-semibold px-4 py-2 m-4 rounded'
            />
          </div>
        </main>
        <footer className='row-start-3'>
          <Link href='/today'>Visit the weather for today!</Link>
        </footer>
      </div>
    </>
  );
}
