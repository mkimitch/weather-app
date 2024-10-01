import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import React from 'react'
import WeatherDetail from '../pages/WeatherDetail/WeatherDetail'
import mockWeatherData from '../__mocks__/mockWeatherData.json'
import useOpenWeatherAPI from '../hooks/useOpenWeatherAPI'

// Mock React Router hooks
jest.mock('react-router-dom', () => ({
	useParams: () => ({ latitude: '44.7123', longitude: '-93.1689' }),
	useLocation: () => ({
		state: { name: 'New York County', state: 'NY', country: 'US' },
	}),
}))

// Mock custom hooks
jest.mock('../hooks/useOpenWeatherAPI')
jest.mock('../hooks/useReverseGeocodingAPI', () => ({
	__esModule: true,
	default: jest.fn(() => ({
		data: [{ name: 'New York County', state: 'NY', country: 'US' }],
		error: null,
		loading: false,
	})),
}))

describe('WeatherDetail Component', () => {
	it('should render the weather data correctly', () => {
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
})
