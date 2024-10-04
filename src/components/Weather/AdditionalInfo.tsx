import type { CurrentWeather, Unit } from '../../types/openWeatherAPI'

import { FC } from 'react'

interface AdditionalInfoProps {
	current: CurrentWeather
	units: Unit
}

const AdditionalInfo: FC<AdditionalInfoProps> = ({ current, units }) => {
	const { clouds, dew_point } = current
	return (
		<div className='additional-info'>
			<h2>Additional Info</h2>
			<div>
				Dew Point: {Math.round(dew_point)} {units === 'metric' ? '°C' : '°F'}
			</div>
			<div>Cloudiness: {clouds}%</div>
		</div>
	)
}

export default AdditionalInfo
