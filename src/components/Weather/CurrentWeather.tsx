import type { CurrentWeather, Unit } from '../../types/openWeatherAPI'
import React, { FC } from 'react'

interface CurrentWeatherProps {
	current: CurrentWeather
	units: Unit
}

const CurrentWeather: FC<CurrentWeatherProps> = ({ current, units }) => {
	const { feels_like, humidity, pressure, temp, uvi, visibility, weather } =
		current
	return (
		<div>
			<p>
				Temperature: {temp} {units === 'metric' ? '°C' : '°F'}
			</p>
			<p>
				Feels Like: {feels_like} {units === 'metric' ? '°C' : '°F'}
			</p>
			<div
				aria-hidden={true}
				title={`weather[0].description`}
				className={`wi wi-owm-${weather[0].id}`}
			></div>
			<p>Humidity: {humidity}%</p>
			<p>Pressure: {pressure} hPa</p>
			<p>UV Index: {uvi}</p>
			<p>Visibility: {visibility} meters</p>
		</div>
	)
}
export default CurrentWeather
