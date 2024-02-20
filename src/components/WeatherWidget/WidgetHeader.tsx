import { FC } from 'react';
import { motion } from 'framer-motion';
import refreshIcon from './icons/icon-refresh.svg';

interface Location {
	city?: string;
	country?: string;
}

interface WidgetHeaderProps {
	location: Location;
	description?: string;
	handleRefresh: () => void;
}

const WidgetHeader: FC<WidgetHeaderProps> = ({
	location,
	description,
	handleRefresh,
}) => {
	const { city, country } = location;

	return (
		<motion.div
			className="weather-widget-header"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, ease: 'easeInOut' }}
		>
			<div className="location">
				{city}, {country}
			</div>
			<div className="description">{description}</div>
			<button className="refresh-button" onClick={handleRefresh}>
				<img src={refreshIcon} alt="Refresh" />
			</button>
		</motion.div>
	);
};

export default WidgetHeader;
