import { FC } from 'react'
import type { CurrentWeather, Unit } from '../../types/openWeatherAPI'

interface CurrentWeatherProps {
	current: CurrentWeather
	timezone: string
	units: Unit
}

const CurrentWeather: FC<CurrentWeatherProps> = ({ current, units }) => {
	const { feels_like, humidity, pressure, temp, uvi, visibility, weather } =
		current
	return (
		<div className='current-weather'>
			<h2>Current Weather</h2>
			<div data-testid='temperature'>
				Temperature: {Math.round(temp)} {units === 'metric' ? '°C' : '°F'}
			</div>
			<div data-testid='feels-like'>
				Feels Like: {Math.round(feels_like)} {units === 'metric' ? '°C' : '°F'}
			</div>
			<div
				aria-hidden={true}
				className={`wi big wi-owm-${weather[0].id}`}
				title={`weather[0].description`}
			></div>
			<div data-testid='humidity'>Humidity: {humidity}%</div>
			<div data-testid='pressure'>Pressure: {pressure} hPa</div>
			<div data-testid='uv-index'>UV Index: {uvi}</div>
			<div data-testid='visibility'>Visibility: {visibility} meters</div>
		</div>
	)
}
export default CurrentWeather
