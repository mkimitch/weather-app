import './WeatherAlerts.scss'

import { FC } from 'react'

import type { Alert } from '../../types/openWeatherAPI'
import DateTime from '../DateTime/DateTime'

interface WeatherAlertsProps {
	alerts: Alert[]
	timezone: string
}

const WeatherAlerts: FC<WeatherAlertsProps> = ({ alerts, timezone }) => {
	return (
		<div className='weather-alerts'>
			<h2>Weather Alerts</h2>
			{alerts.map((alert, index) => {
				const { description, end, event, sender_name, start } = alert
				return (
					<div key={index}>
						<div>{event}</div>
						<div>From: {sender_name}</div>
						<div>
							Start:{' '}
							<DateTime
								datetime={new Date(start * 1000)}
								options={{
									timeStyle: 'medium',
									hour12: true,
									timeZone: timezone,
								}}
							/>
						</div>
						<div>
							End:{' '}
							<DateTime
								datetime={new Date(end * 1000)}
								options={{
									timeStyle: 'medium',
									hour12: true,
									timeZone: timezone,
								}}
							/>
						</div>
						<div>{description}</div>
					</div>
				)
			})}
		</div>
	)
}
export default WeatherAlerts
