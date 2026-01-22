import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import React from 'react'
import mockWeatherData from '../__mocks__/mockWeatherData.json'
import useNwsWeatherAPI from '../hooks/useNwsWeatherAPI'
import useOpenWeatherAPI from '../hooks/useOpenWeatherAPI'
import WeatherDetail from '../pages/WeatherDetail/WeatherDetail'

// Mock React Router hooks
jest.mock('react-router-dom', () => ({
	useParams: () => ({ latitude: '44.7123', longitude: '-93.1689' }),
	useLocation: () => ({
		state: { name: 'New York County', state: 'NY', country: 'US' },
	}),
}))

// Mock custom hooks
jest.mock('../hooks/useOpenWeatherAPI')
jest.mock('../hooks/useNwsWeatherAPI', () => ({
	__esModule: true,
	default: jest.fn(),
}))
jest.mock('../hooks/useReverseGeocodingAPI', () => ({
	__esModule: true,
	default: jest.fn(() => ({
		data: [{ name: 'New York County', state: 'NY', country: 'US' }],
		error: null,
		loading: false,
	})),
}))

describe('WeatherDetail Component', () => {
	beforeEach(() => {
		localStorage.clear()
		;(useOpenWeatherAPI as jest.Mock).mockReset()
		;(useNwsWeatherAPI as jest.Mock).mockReset()
		;(useOpenWeatherAPI as jest.Mock).mockReturnValue({
			data: {},
			error: undefined,
			loading: false,
		})
		;(useNwsWeatherAPI as jest.Mock).mockReturnValue({
			data: null,
			error: null,
			loading: false,
		})
	})

	it('should render the weather data correctly', () => {
		localStorage.setItem('openweather_api_key', 'test-key')

		// Mock weather data as available
		;(useOpenWeatherAPI as jest.Mock).mockReturnValue({
			data: mockWeatherData,
			error: null,
			loading: false,
		})

		render(<WeatherDetail />)

		// Check for temperature using data-testid
		expect(screen.getByTestId('temperature')).toHaveTextContent(
			/Temperature: 66\s?°F/i
		)

		// Check for humidity using data-testid
		expect(screen.getByTestId('humidity')).toHaveTextContent('Humidity: 53%')

		// Check for location
		expect(screen.getByText(/New York County/i)).toBeInTheDocument()
	})

	it('should display a loading message when data is loading', () => {
		localStorage.setItem('openweather_api_key', 'test-key')

		// Mock loading state
		;(useOpenWeatherAPI as jest.Mock).mockReturnValue({
			data: null,
			error: null,
			loading: true,
		})

		const { rerender } = render(<WeatherDetail />)

		// Check for Loading Message using data-testid
		expect(screen.getByTestId('weather-detail-loading')).toBeInTheDocument()

		// Re-mock and rerender with loading complete
		;(useOpenWeatherAPI as jest.Mock).mockReturnValue({
			data: mockWeatherData,
			error: null,
			loading: false,
		})

		rerender(<WeatherDetail />)
	})

	it('should display an error message if there is an API error', () => {
		localStorage.setItem('openweather_api_key', 'test-key')

		// Mock error state
		;(useOpenWeatherAPI as jest.Mock).mockReturnValue({
			data: null,
			error: 'Weather API Error',
			loading: false,
		})

		const { rerender } = render(<WeatherDetail />)

		// Check for Error Message using data-testid
		expect(screen.getByTestId('error')).toBeInTheDocument()

		// Re-mock and rerender without error
		;(useOpenWeatherAPI as jest.Mock).mockReturnValue({
			data: mockWeatherData,
			error: null,
			loading: false,
		})

		rerender(<WeatherDetail />)
	})

	it('should render NWS fallback data when OpenWeather API key is not provided', () => {
		;(useNwsWeatherAPI as jest.Mock).mockReturnValue({
			data: {
				dailyPeriods: [
					{
						detailedForecast: 'Sunny',
						endTime: '2026-01-22T18:00:00-06:00',
						icon: '',
						isDaytime: true,
						name: 'Today',
						number: 1,
						shortForecast: 'Sunny',
						startTime: '2026-01-22T12:00:00-06:00',
						temperature: 55,
						temperatureUnit: 'F',
						windDirection: 'NW',
						windSpeed: '5 mph',
					},
				],
				hourlyPeriods: [
					{
						detailedForecast: 'Clear',
						endTime: '2026-01-22T13:00:00-06:00',
						icon: '',
						isDaytime: true,
						name: 'Noon',
						number: 1,
						shortForecast: 'Clear',
						startTime: '2026-01-22T12:00:00-06:00',
						temperature: 55,
						temperatureUnit: 'F',
						windDirection: 'NW',
						windSpeed: '5 mph',
					},
				],
				location: { city: 'Minneapolis', state: 'MN' },
				timeZone: 'America/Chicago',
			},
			error: null,
			loading: false,
		})

		render(<WeatherDetail />)

		expect(useOpenWeatherAPI).toHaveBeenCalledWith(undefined, undefined)
		expect(useNwsWeatherAPI).toHaveBeenCalledWith('44.7123', '-93.1689')
		expect(screen.getByText(/Wind:\s*5 mph NW/i)).toBeInTheDocument()
		expect(screen.queryByTestId('temperature')).not.toBeInTheDocument()
	})

	it('should display an error message if NWS returns an error', () => {
		;(useNwsWeatherAPI as jest.Mock).mockReturnValue({
			data: null,
			error: 'NWS API Error',
			loading: false,
		})

		render(<WeatherDetail />)

		expect(screen.getByTestId('error')).toBeInTheDocument()
		expect(
			screen.getByText(/NWS API Error: NWS API Error/i)
		).toBeInTheDocument()
	})
})
