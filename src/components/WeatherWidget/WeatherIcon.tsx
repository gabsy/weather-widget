import daySunny from './icons/icon-day-sunny.svg';
import nightClear from './icons/icon-night-clear.svg';
import dayCloudy from './icons/icon-day-cloudy.svg';
import nightAltCloudy from './icons/icon-night-alt-cloudy.svg';
import cloud from './icons/icon-cloud.svg';
import cloudy from './icons/icon-cloudy.svg';
import showers from './icons/icon-showers.svg';
import dayRain from './icons/icon-day-rain.svg';
import nightAltRain from './icons/icon-night-alt-rain.svg';
import dayLightning from './icons/icon-day-lightning.svg';
import nightAltLightning from './icons/icon-night-alt-lightning.svg';
import snow from './icons/icon-snow.svg';
import fog from './icons/icon-fog.svg';

interface WeatherIconProps {
	iconCode?: string;
	description?: string;
}

const WeatherIcon = ({ iconCode, description }: WeatherIconProps) => {
	const iconsMappings = {
		'01d': daySunny,
		'01n': nightClear,
		'02d': dayCloudy,
		'02n': nightAltCloudy,
		'03d': cloud,
		'03n': cloud,
		'04d': cloudy,
		'04n': cloudy,
		'09d': showers,
		'09n': showers,
		'10d': dayRain,
		'10n': nightAltRain,
		'11d': dayLightning,
		'11n': nightAltLightning,
		'13d': snow,
		'13n': snow,
		'50d': fog,
		'50n': fog,
	};
	const iconName = iconsMappings[iconCode as keyof typeof iconsMappings];

	return (
		<div className="weather-icon">
			<img src={iconName} alt={description} />
		</div>
	);
};

export default WeatherIcon;
