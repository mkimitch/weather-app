import type { CurrentWeather, Daily } from '../../types/openWeatherAPI'
import React, { FC } from 'react'

interface SunMoonDataProps {
	current: CurrentWeather
	daily: Daily[]
}

const SunMoonData: FC<SunMoonDataProps> = ({ current, daily }) => {
	const { sunrise, sunset } = current
	const { moon_phase, moonrise, moonset } = daily[0]
	return (
		<div>
			<div>Sunrise: {new Date(sunrise * 1000).toLocaleTimeString()}</div>
			<div>Sunset: {new Date(sunset * 1000).toLocaleTimeString()}</div>
			<div>Moonrise: {new Date(moonrise * 1000).toLocaleTimeString()}</div>
			<div>Moonset: {new Date(moonset * 1000).toLocaleTimeString()}</div>
			<div>Moon Phase: {moon_phase}</div>
		</div>
	)
}
export default SunMoonData
