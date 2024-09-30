import './HourlyForecast.scss'

import type { Hourly, Unit } from '../../types/openWeatherAPI'
import React, { FC } from 'react'
import DateTime from '../DateTime/DateTime'

interface HourlyProps {
	hourly: Hourly[]
	timezone: string
	units: Unit
}

const HourlyForecast: FC<HourlyProps> = ({ hourly, timezone, units }) => {
	return (
		<div className='hourly'>
			<h2>Hourly Forecast</h2>
			<div
				className='scroll-container'
				tabIndex={0}
			>
				{hourly.slice(0, 24).map(hour => {
					const { dt, temp, weather } = hour
					return (
						<div
							className={`scroll-item`}
							key={dt}
						>
							<DateTime
								datetime={new Date(dt * 1000)}
								options={{ hour: 'numeric', hour12: true, timeZone: timezone }}
							/>
							<div
								aria-hidden={true}
								title={`weather[0].description`}
								className={`wi big wi-owm-${weather[0].id}`}
							></div>
							<div>
								{Math.round(temp)} {units === 'metric' ? '°C' : '°F'}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
export default HourlyForecast
