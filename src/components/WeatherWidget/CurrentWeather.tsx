import WeatherIcon from './WeatherIcon';
import { formatTime } from './utils/utilsTime';
import { motion } from 'framer-motion';

interface WeatherMain {
	temp: number;
	temp_min: number;
	temp_max: number;
	humidity: number;
}

interface Weather {
	icon: string;
	description: string;
}

interface Wind {
	speed: number;
	deg: number;
}

interface Sys {
	sunrise: number;
	sunset: number;
}

interface CurrentWeatherData {
	main: WeatherMain;
	weather: Weather[];
	sys: Sys;
	wind: Wind;
	timezone: number;
}

interface UnitsSymbols {
	temperature: string;
	windSpeed: string;
}

interface CurrentWeatherProps {
	data: CurrentWeatherData;
	unitsSymbols: UnitsSymbols;
}

const CurrentWeather: FC<CurrentWeatherProps> = ({ data, unitsSymbols }) => {
	const { main, weather, sys, wind, timezone } = data;
	const { temp, temp_min, temp_max, humidity } = main;
	const { icon: iconCode, description } = weather[0];
	const { speed, deg } = wind;

	const temperature = Math.round(temp);
	const minTemperature = Math.round(temp_min);
	const maxTemperature = Math.round(temp_max);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
		>
			<div className="current-weather">
				<div className="temperature">
					{temperature && (
						<p className="temperature">
							{temperature}
							{unitsSymbols.temperature}
						</p>
					)}
				</div>
				<WeatherIcon iconCode={iconCode} description={description} />
				<div className="min-max">
					{maxTemperature && (
						<div>
							<span className="label">Max</span> {maxTemperature}
							{unitsSymbols.temperature}
						</div>
					)}
					{minTemperature && (
						<div>
							<span className="label">Min</span> {minTemperature}
							{unitsSymbols.temperature}
						</div>
					)}
				</div>
			</div>
			<div className="additional-values">
				{wind && (
					<div className="additional-values-item">
						<span className="label">Wind</span> {speed}{' '}
						<span className="windspeed">
							{unitsSymbols.windSpeed}
						</span>
						, {deg}°
					</div>
				)}
				{humidity && (
					<div className="additional-values-item">
						<span className="label">Humidity</span> {humidity}%
					</div>
				)}
				{sys && (
					<>
						<div className="additional-values-item">
							<span className="label">Sunrise</span>
							{formatTime(sys.sunrise, timezone)}
						</div>
						<div className="additional-values-item">
							<span className="label">Sunset</span>
							{formatTime(sys.sunset, timezone)}
						</div>
					</>
				)}
			</div>
		</motion.div>
	);
};

export default CurrentWeather;
