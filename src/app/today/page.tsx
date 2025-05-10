'use client';

import Link from 'next/link';
import { axisClasses, LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function TodayHome() {
	const { data, error, isLoading } = useSWR(`api/weather/today`, fetcher);

	const horas = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
		21, 22, 23,
	];

	const temperatura = data?.hourly.temperature_2m;

	return (
		<div className='flex flex-col text-white items-center justify-center min-h-screen  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='w-2/3 min-h-2/3'>
				{error || data?.error ? (
					<h1>Error</h1>
				) : isLoading ? (
					<h1>Cargando...</h1>
				) : (
					<LineChart
						xAxis={[
							{
								data: horas,
								label: dayjs().format('YYYY-MM-DD'),
								valueFormatter: (hora: number) => {
									if (hora >= 0 && hora <= 12) return `${hora}am`;
									else return `${hora}pm`;
								},
							},
						]}
						yAxis={[{ label: 'Temperatura' }]}
						series={[{ data: temperatura }]}
						sx={(theme) => ({
							[`.MuiBarElement-series-r_id`]: {
								stroke: '#fff',
							},
							[`.${axisClasses.root}`]: {
								[`.${axisClasses.tick}, .${axisClasses.line}`]: {
									stroke: '#B6B6B6',
									strokeWidth: 1,
								},
								[`.${axisClasses.tickLabel}`]: {
									fill: '#B6B6B6',
								},
								[`.${axisClasses.label}`]: {
									fill: '#B6B6B6',
								},
							},
						})}
						height={300}
					/>
				)}
			</main>
			<footer>
				<Link href='/'>Visit the weather for the week!</Link>
			</footer>
		</div>
	);
}
