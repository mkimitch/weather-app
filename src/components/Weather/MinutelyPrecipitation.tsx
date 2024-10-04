import './MinutelyPrecipitation.scss'

import { FC } from 'react'

import type { Minutely } from '../../types/openWeatherAPI'
import { someTruthy } from '../../utils/utils'
import DateTime from '../DateTime/DateTime'

interface PrecipitationProps {
	minutely: Minutely[]
}

const MinutelyPrecipitation: FC<PrecipitationProps> = ({ minutely }) => {
	const checkForSomePrecip = someTruthy(minutely?.filter(m => m.precipitation))

	return (
		<>
			{minutely && (
				<div className='minutely'>
					<h2>Minute-by-minute precipitation forecast</h2>
					<div
						className='scroll-container'
						tabIndex={0}
					>
						{checkForSomePrecip ? (
							<div className='scroll-item'>
								No precipitation expected in the next hour.
							</div>
						) : (
							minutely.map(minute => (
								<div
									className='scroll-item'
									key={minute.dt}
								>
									<div className='value'>{minute.precipitation} mm</div>
									<DateTime
										datetime={new Date(minute.dt * 1000)}
										options={{ timeStyle: 'short' }}
									/>
								</div>
							))
						)}
					</div>
				</div>
			)}
		</>
	)
}
export default MinutelyPrecipitation
