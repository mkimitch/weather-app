import type { CurrentWeather, Minutely } from '../../types/openWeatherAPI'
import React, { FC } from 'react'

interface PrecipitationProps {
	current: CurrentWeather
	minutely: Minutely[]
}

const Precipitation: FC<PrecipitationProps> = ({ current, minutely }) => {
	const { rain, snow } = current
	return (
		<div>
			{rain && <div>Rain (last 1h): {rain['1h']} mm</div>}
			{snow && <div>Snow (last 1h): {snow['1h']} mm</div>}
			{minutely && (
				<div>
					<div>Minute-by-minute precipitation forecast:</div>
					{minutely.slice(0, 60).map((minute, index) => (
						<div key={index}>
							{new Date(minute.dt * 1000).toLocaleTimeString()}:{' '}
							{minute.precipitation} mm
						</div>
					))}
				</div>
			)}
		</div>
	)
}
export default Precipitation
