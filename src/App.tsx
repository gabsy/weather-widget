import WeatherWidget, {
	WeatherWidgetProps,
} from '@components/WeatherWidget/WeatherWidget';
import './App.css';

function App() {
	const weatherWidgetProps: WeatherWidgetProps = {
		apiKey: import.meta.env.VITE_WW_API_KEY,
		apiUrl: import.meta.env.VITE_WW_API_URL,
	};

	return (
		<div className="main-wrapper">
			<WeatherWidget {...weatherWidgetProps} />
		</div>
	);
}

export default App;
