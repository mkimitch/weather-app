import './DailyForecast.scss'

import type { Daily, Unit } from '../../types/openWeatherAPI'
import React, { FC } from 'react'
import DateTime from '../DateTime/DateTime'

interface DailyForecastProps {
	daily: Daily[]
	units: Unit
}

const DailyForecast: FC<DailyForecastProps> = ({ daily, units }) => {
	return (
		<div className='outlook'>
			{daily.map((day, index) => {
				const {
					dt,
					summary,
					temp: { max, min },
					weather,
				} = day
				return (
					<div
						key={index}
						className='day'
					>
						<DateTime
							datetime={new Date(dt * 1000).toLocaleDateString()}
							options={{ dateStyle: 'medium' }}
						/>
						<div
							aria-hidden={true}
							title={`weather[0].description`}
							className={`wi wi-owm-${weather[0].id}`}
						></div>
						<div>
							Max: {max} {units === 'metric' ? '°C' : '°F'}
						</div>
						<div>
							Min: {min} {units === 'metric' ? '°C' : '°F'}
						</div>
						<div>{summary}</div>
					</div>
				)
			})}
		</div>
	)
}
export default DailyForecast
