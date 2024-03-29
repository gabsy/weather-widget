import type { Meta, StoryObj } from '@storybook/react';
import WeatherWidget from './WeatherWidget';

const meta = {
	title: 'Components/WeatherWidget',
	component: WeatherWidget,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		lat: { control: 'number', defaultValue: null, description: 'Latitude' },
		lon: {
			control: 'number',
			defaultValue: null,
			description: 'Longitude',
		},
		city: {
			control: 'text',
			default: 'Cluj-Napoca',
			description: 'City name',
		},
		apiUrl: { control: 'text', description: 'API URL' },
		apiKey: { control: 'text', description: 'API Key' },
		units: {
			control: 'select',
			options: ['metric', 'imperial'],
			description: 'Units type (metric or imperial)',
		},
	},
} satisfies Meta<typeof WeatherWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variants
export const Default: Story = {
	args: {
		lat: null,
		lon: null,
		city: 'Cluj-Napoca',
		apiKey: import.meta.env.VITE_WW_API_KEY,
		apiUrl: import.meta.env.VITE_WW_API_URL,
		units: 'metric',
	},
};

export const WithCoordinates: Story = {
	args: {
		lat: 47.4979,
		lon: 19.0402,
		city: '',
		apiKey: import.meta.env.VITE_WW_API_KEY,
		apiUrl: import.meta.env.VITE_WW_API_URL,
		units: 'metric',
	},
};

export const WithDifferentUnits: Story = {
	args: {
		lat: null,
		lon: null,
		city: 'Cluj-Napoca',
		apiKey: import.meta.env.VITE_WW_API_KEY,
		apiUrl: import.meta.env.VITE_WW_API_URL,
		units: 'imperial',
	},
};
