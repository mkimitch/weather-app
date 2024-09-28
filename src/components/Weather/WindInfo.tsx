import type { CurrentWeather, Unit } from '../../types/openWeatherAPI'
import React, { FC } from 'react'

interface WindInfoProps {
	current: CurrentWeather
	units: Unit
}

const WindInfo: FC<WindInfoProps> = ({ current, units }) => {
	const { wind_deg, wind_gust, wind_speed } = current
	return (
		<div className='wind-info'>
			<div>
				Wind Speed: {wind_speed} {units === 'metric' ? 'm/s' : 'mph'}
			</div>
			<div>Wind Direction: {wind_deg}°</div>
			{wind_gust && (
				<div>
					Wind Gust: {wind_gust} {units === 'metric' ? 'm/s' : 'mph'}
				</div>
			)}
		</div>
	)
}
export default WindInfo
