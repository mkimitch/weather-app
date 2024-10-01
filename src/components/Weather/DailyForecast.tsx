import './DailyForecast.scss'

import type { Daily, Unit } from '../../types/openWeatherAPI'
import React, { FC } from 'react'

import DateTime from '../DateTime/DateTime'

interface DailyForecastProps {
	daily: Daily[]
	timezone: string
	units: Unit
}

const DailyForecast: FC<DailyForecastProps> = ({ daily, timezone, units }) => {
	return (
		<div className='daily'>
			<h2>Daily Forecast</h2>
			<div
				className='scroll-container'
				role='list'
				tabIndex={0}
			>
				{daily.map((day, index) => {
					const {
						dt,
						summary,
						temp: { max, min },
						weather,
					} = day

					return (
						<div
							className={`scroll-item`}
							key={dt}
							role='listitem'
						>
							<DateTime
								datetime={new Date(dt * 1000)}
								options={{ dateStyle: 'medium', timeZone: timezone }}
							/>
							<div
								aria-hidden={true}
								className={`wi big wi-owm-${weather[0].id}`}
								title={weather[0].description}
							></div>
							<div>
								<div>
									Max: {Math.round(max)} {units === 'metric' ? '°C' : '°F'}
								</div>
								<div>
									Min: {Math.round(min)} {units === 'metric' ? '°C' : '°F'}
								</div>
							</div>
							<div>{summary}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
export default DailyForecast
