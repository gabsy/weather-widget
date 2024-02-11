export function formatTime(timestamp, timezoneOffset, hour12 = true) {
	const date = new Date((timestamp + timezoneOffset) * 1000);
	const formattedTime = new Intl.DateTimeFormat('en-US', {
		timeZone: 'UTC',
		hour: 'numeric',
		minute: '2-digit',
		hour12,
	}).format(date);
	return formattedTime;
}
