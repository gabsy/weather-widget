// Adjust temperature to avoid -0
export function adjustTemperature(temperature: number) {
	const roundedTemperature = Math.round(temperature);
	return Object.is(roundedTemperature, -0) ? 0 : roundedTemperature;
}
