import type { CurrentWeather, Unit } from '../../types/openWeatherAPI'
import React, { FC } from 'react'

interface AdditionalInfoProps {
	current: CurrentWeather
	units: Unit
}

const AdditionalInfo: FC<AdditionalInfoProps> = ({ current, units }) => {
	const { clouds, dew_point, uvi, visibility } = current
	return (
		<div>
			<p>UV Index: {uvi}</p>
			<p>Visibility: {visibility} meters</p>
			<p>
				Dew Point: {dew_point} {units === 'metric' ? '°C' : '°F'}
			</p>
			<p>Cloudiness: {clouds}%</p>
		</div>
	)
}

export default AdditionalInfo
