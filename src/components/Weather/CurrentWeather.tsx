import type { CurrentWeather, Unit } from '../../types/openWeatherAPI'
import React, { FC } from 'react'

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
			<div>
				Temperature: {Math.round(temp)} {units === 'metric' ? '°C' : '°F'}
			</div>
			<div>
				Feels Like: {Math.round(feels_like)} {units === 'metric' ? '°C' : '°F'}
			</div>
			<div
				aria-hidden={true}
				className={`wi big wi-owm-${weather[0].id}`}
				title={`weather[0].description`}
			></div>
			<div>Humidity: {humidity}%</div>
			<div>Pressure: {pressure} hPa</div>
			<div>UV Index: {uvi}</div>
			<div>Visibility: {visibility} meters</div>
		</div>
	)
}
export default CurrentWeather
