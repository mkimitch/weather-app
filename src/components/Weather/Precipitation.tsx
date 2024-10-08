import { FC } from 'react'
import type { CurrentWeather } from '../../types/openWeatherAPI'

interface PrecipitationProps {
	current: CurrentWeather
}

const Precipitation: FC<PrecipitationProps> = ({ current }) => {
	const { rain, snow } = current
	return (
		<div className='percipitation'>
			<h2>Current Percipitation</h2>
			{rain && <div>Rain (last 1h): {rain['1h']} mm/h</div>}
			{snow && <div>Snow (last 1h): {snow['1h']} mm/h</div>}
		</div>
	)
}
export default Precipitation
