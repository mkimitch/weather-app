import React, { FC } from 'react'

import type { Alert } from '../../types/openWeatherAPI'

interface WeatherAlertsProps {
	alerts: Alert[]
}

const WeatherAlerts: FC<WeatherAlertsProps> = ({ alerts }) => {
	return (
		<div>
			{alerts.map((alert, index) => {
				const { description, end, event, sender_name, start } = alert
				return (
					<div key={index}>
						<div>{event}</div>
						<div>From: {sender_name}</div>
						<div>Start: {new Date(start * 1000).toLocaleString()}</div>
						<div>End: {new Date(end * 1000).toLocaleString()}</div>
						<div>{description}</div>
					</div>
				)
			})}
		</div>
	)
}
export default WeatherAlerts
