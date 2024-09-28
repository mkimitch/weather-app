import type { Hourly, Unit } from '../../types/openWeatherAPI'
import React, { FC } from 'react'

interface HourlyProps {
	hourly: Hourly[]
	units: Unit
}

const HourlyForecast: FC<HourlyProps> = ({ hourly, units }) => {
	return (
		<div className='overflow-x-auto'>
			{hourly.slice(0, 24).map((hour, index) => {
				const { dt, temp, weather } = hour
				return (
					<div
						key={index}
						className='inline-block text-center mr-4'
					>
						<div>{new Date(dt * 1000).toLocaleTimeString()}</div>
						<img
							src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
							alt='Weather icon'
						/>
						<div>
							{temp} {units === 'metric' ? '°C' : '°F'}
						</div>
					</div>
				)
			})}
		</div>
	)
}
export default HourlyForecast
