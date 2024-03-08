import { useEffect, useState, FC } from 'react';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import WidgetHeader from './WidgetHeader';
import '@fontsource/oswald/300.css';
import '@fontsource/oswald/400.css';
import '@fontsource/oswald/500.css';
import './styles/index.css';

interface WeatherMain {
	temp: number;
	temp_min: number;
	temp_max: number;
	humidity: number;
}

interface Wind {
	speed: number;
	deg: number;
}

export interface WeatherData {
	name: string;
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};
	weather: Array<{
		description: string;
		icon: string;
	}>;
	main: WeatherMain;
	wind: Wind;
	timezone: number;
}

export interface WeatherWidgetProps {
	lat?: number | null;
	lon?: number | null;
	city?: string;
	apiKey: string;
	apiUrl: string;
	units?: 'metric' | 'imperial';
}

const WeatherWidget: FC<WeatherWidgetProps> = ({
	lat,
	lon,
	city = 'Cluj-Napoca',
	apiKey = import.meta.env.VITE_WW_API_KEY,
	apiUrl = import.meta.env.VITE_WW_API_URL,
	units = 'metric',
}) => {
	// const [currentData, setCurrentData] = useState<WeatherData | null>(null);
	// const [forecastData, setForecastData] = useState<WeatherData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [refresh, setRefresh] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const [data, setData] = useState<{
		currentData: WeatherData | null;
		forecastData: WeatherData | null;
	}>({ currentData: null, forecastData: null });

	// Day or night mode based on current weather data
	const dayTimeMode = data?.currentData?.weather?.[0]?.icon?.includes('n')
		? 'night'
		: 'day';

	// Set location query if city name is provided, otherwise use lat and lon
	const locationQuery = city ? `q=${city}` : `lat=${lat}&lon=${lon}`;

	// Units symbols
	const unitsSymbols = {
		temperature: units === 'metric' ? '°C' : '°F',
		windSpeed: units === 'metric' ? 'm/s' : 'mph',
	};

	// Refresh data function
	const handleRefresh = () => {
		setIsLoading(true);
		setRefresh(!refresh);
	};

	// Fetch weather data function
	const fetchData = async () => {
		try {
			const [responseCurrent, responseForecast] = await Promise.all([
				fetch(
					`${apiUrl}/weather?${locationQuery}&appid=${apiKey}&units=${units}`,
				) as Promise<Response>,
				fetch(
					`${apiUrl}/forecast?${locationQuery}&appid=${apiKey}&units=${units}`,
				) as Promise<Response>,
			]);

			if (!responseCurrent.ok || !responseForecast.ok) {
				throw new Error('Error fetching data from the API');
			}

			const [currentData, forecastData] = await Promise.all([
				responseCurrent.json() as Promise<WeatherData>,
				responseForecast.json() as Promise<WeatherData>,
			]);

			setData({ currentData, forecastData });
		} catch (error) {
			console.error(error);
			setError((error as Error).message);
			setData({ currentData: null, forecastData: null });
		} finally {
			setIsLoading(false);
		}
	};

	// Fetch weather data on component mount
	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	return (
		<div className={`weather-widget ${dayTimeMode}`}>
			{isLoading ? (
				<div className="loader">Loading data...</div>
			) : (
				<>
					{!error ? (
						<>
							<WidgetHeader
								location={{
									city: data.currentData?.name,
									country: data.currentData?.sys?.country,
								}}
								description={
									data.currentData?.weather?.[0]?.description
								}
								handleRefresh={handleRefresh}
							/>
							<CurrentWeather
								data={data.currentData} // Add empty object as fallback
								unitsSymbols={unitsSymbols}
							/>
							<ForecastWeather
								data={data.forecastData}
								unitsSymbols={unitsSymbols}
							/>
						</>
					) : (
						<div className="loader">{error}</div>
					)}
				</>
			)}
		</div>
	);
};

export default WeatherWidget;
