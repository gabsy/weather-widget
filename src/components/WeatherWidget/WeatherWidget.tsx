import { useEffect, useState } from 'react';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import WidgetHeader from './WidgetHeader';
import '@fontsource/oswald/300.css';
import '@fontsource/oswald/400.css';
import '@fontsource/oswald/500.css';
import './styles/index.css';

interface WeatherData {
	cod: string | number;
	message?: string;
	name?: string;
	sys?: {
		country?: string;
	};
	weather?: Array<{
		description?: string;
		icon?: string;
	}>;
}

interface WeatherWidgetProps {
	lat?: number;
	lon?: number;
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
	const [currentData, setCurrentData] = useState<WeatherData | null>(null);
	const [forecastData, setForecastData] = useState<WeatherData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [refresh, setRefresh] = useState<boolean>(false);

	// Day or night mode based on current weather data
	const dayTimeMode = currentData?.weather?.[0]?.icon?.includes('n')
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
	const handleRefresh = (): void => {
		setIsLoading(true);
		setRefresh(!refresh);
	};

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const responseCurrent = await fetch(
					`${apiUrl}/weather?${locationQuery}&appid=${apiKey}&units=${units}`,
				);
				const currentData: WeatherData = await responseCurrent.json();
				setCurrentData(currentData);

				const responseForecast = await fetch(
					`${apiUrl}/forecast?${locationQuery}&appid=${apiKey}&units=${units}`,
				);
				const forecastData: WeatherData = await responseForecast.json();
				setForecastData(forecastData);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching weather data:', error);
			}
		};

		fetchData();
	}, [lat, lon, city, apiKey, apiUrl, units, refresh, locationQuery]);

	return (
		<div className={`weather-widget ${dayTimeMode}`}>
			{isLoading ? (
				<div className="loader">Loading data...</div>
			) : (
				<>
					{currentData && currentData.cod === 200 ? (
						<>
							<WidgetHeader
								location={{
									city: currentData.name,
									country: currentData.sys?.country,
								}}
								description={
									currentData.weather?.[0]?.description
								}
								handleRefresh={handleRefresh}
							/>
							<CurrentWeather
								data={currentData}
								unitsSymbols={unitsSymbols}
							/>
							{forecastData && forecastData.cod === '200' && (
								<ForecastWeather
									data={forecastData}
									unitsSymbols={unitsSymbols}
								/>
							)}
						</>
					) : (
						<div className="loader">
							{currentData?.message ||
								'Error fetching weather data'}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default WeatherWidget;
