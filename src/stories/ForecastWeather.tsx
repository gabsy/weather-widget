// import React from 'react';
import WeatherIcon from './WeatherIcon';
import { formatTime } from './ww-utils/utilsTime';
import { motion } from 'framer-motion';

interface Weather {
	icon: string;
	description: string;
}

interface Main {
	temp_min: number;
	temp_max: number;
}

interface Item {
	dt: number;
	main: Main;
	weather: Weather[];
}

interface City {
	timezone: string;
}

interface Data {
	list: Item[];
	city: City;
}

interface ForecastWeatherProps {
	data: Data;
}

const ForecastWeather: FC<ForecastWeatherProps> = ({ data }) => {
	const { list } = data;
	const { timezone } = data.city;

	return (
		<motion.div
			className="forecast-weather"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.4 }}
		>
			{list.map((item, index) => {
				const { dt, main, weather } = item;
				const { temp_min, temp_max } = main;
				const { icon: iconCode, description } = weather[0];
				const date = new Date(dt * 1000);
				const dayName = new Intl.DateTimeFormat('en-US', {
					weekday: 'short',
				}).format(date);
				const time = formatTime(dt, timezone, false);

				return (
					<div key={index} className="forecast-item">
						<div className="forecast-item-day">{dayName}</div>
						<div className="forecast-item-time">{time}</div>
						<WeatherIcon
							iconCode={iconCode}
							description={description}
						/>
						<div className="forecast-item-temp">
							{temp_min.toFixed(0)}&deg; / {temp_max.toFixed(0)}
							&deg;
						</div>
					</div>
				);
			})}
		</motion.div>
	);
};

export default ForecastWeather;
