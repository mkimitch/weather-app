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
			{alerts.map(alert => {
				const { description, end, event, sender_name, start } = alert
				return (
					<section key={`${start}-${end}`}>
						<header>
							<h3>{event}</h3>
							<div>
								From{' '}
								<DateTime
									datetime={new Date(start * 1000)}
									options={{
										dateStyle: 'medium',
										hour12: true,
										timeStyle: 'short',
										timeZone: timezone,
									}}
								/>{' '}
								until{' '}
								<DateTime
									datetime={new Date(end * 1000)}
									options={{
										dateStyle: 'medium',
										hour12: true,
										timeStyle: 'short',
										timeZone: timezone,
									}}
								/>
							</div>
						</header>
						<div>Issued by {sender_name}</div>
						<div className='description'>{description}</div>
					</section>
				)
			})}
		</div>
	)
}
export default WeatherAlerts
