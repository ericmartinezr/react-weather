import dayjs from 'dayjs';
import { type NextRequest } from 'next/server';

const IP_API = 'https://api.myip.com';
const GEOLOC_API = 'http://ip-api.com/json';
const OPENMETEO_API = 'https://api.open-meteo.com/v1/forecast'; //latitude=52.52&longitude=13.41'

async function GetIP() {
	const ip_data = await fetch(IP_API, { cache: 'force-cache' });
	return (await ip_data.json()).ip;
}

async function GetGeolocalization() {
	const ip = await GetIP();
	const geo_data = await fetch(`${GEOLOC_API}/${ip}`, { cache: 'force-cache' });
	const geo_data_json = await geo_data.json();
	const { lat, lon } = geo_data_json;
	return { lat, lon };
}

async function GetWeather() {
	const today = dayjs().format('YYYY-MM-DD');
	const { lat, lon } = await GetGeolocalization();
	const url = new URL(OPENMETEO_API);
	url.searchParams.append('latitude', lat.toString());
	url.searchParams.append('longitude', lon.toString());
	url.searchParams.append('hourly', 'temperature_2m');
	url.searchParams.append('timezone', 'auto');
	url.searchParams.append('start_date', today);
	url.searchParams.append('end_date', today);
	const meteo = await fetch(url, { cache: 'force-cache' });
	return await meteo.json();
}

export async function GET(request: NextRequest) {
	const wdata = await GetWeather();
	return Response.json({ ...wdata });
}
