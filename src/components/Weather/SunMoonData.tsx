import type { CurrentWeather, Daily } from '../../types/openWeatherAPI'
import React, { FC } from 'react'
import DateTime from '../DateTime/DateTime'

interface SunMoonDataProps {
	current: CurrentWeather
	daily: Daily[]
	timezone: string
}

const SUNRISE = 'sunrise'
const SUNSET = 'sunset'
const MOONRISE = 'moonrise'
const MOONSET = 'moonset'

const moonIcons = [
	'wi-moon-new',
	'wi-moon-waxing-crescent-1',
	'wi-moon-waxing-crescent-2',
	'wi-moon-waxing-crescent-3',
	'wi-moon-waxing-crescent-4',
	'wi-moon-waxing-crescent-5',
	'wi-moon-waxing-crescent-6',
	'wi-moon-first-quarter',
	'wi-moon-waxing-gibbous-1',
	'wi-moon-waxing-gibbous-2',
	'wi-moon-waxing-gibbous-3',
	'wi-moon-waxing-gibbous-4',
	'wi-moon-waxing-gibbous-5',
	'wi-moon-waxing-gibbous-6',
	'wi-moon-full',
	'wi-moon-waning-gibbous-1',
	'wi-moon-waning-gibbous-2',
	'wi-moon-waning-gibbous-3',
	'wi-moon-waning-gibbous-4',
	'wi-moon-waning-gibbous-5',
	'wi-moon-waning-gibbous-6',
	'wi-moon-third-quarter',
	'wi-moon-waning-crescent-1',
	'wi-moon-waning-crescent-2',
	'wi-moon-waning-crescent-3',
	'wi-moon-waning-crescent-4',
	'wi-moon-waning-crescent-5',
	'wi-moon-waning-crescent-6',
]

const SunMoonData: FC<SunMoonDataProps> = ({ current, daily, timezone }) => {
	const { sunrise, sunset } = current
	const { moon_phase, moonrise, moonset } = daily[0]

	const getFormattedMoonPhaseString = (moonPhase: number) => {
		if (moonPhase === 0 || moonPhase === 1) {
			return 'New Moon'
		} else if (moonPhase > 0 && moonPhase < 0.25) {
			return 'Waxing Crescent'
		} else if (moonPhase === 0.25) {
			return 'First Quarter'
		} else if (moonPhase > 0.25 && moonPhase < 0.5) {
			return 'Waxing Gibbous'
		} else if (moonPhase === 0.5) {
			return 'Full Moon'
		} else if (moonPhase > 0.5 && moonPhase < 0.75) {
			return 'Waning Gibbous'
		} else if (moonPhase === 0.75) {
			return 'Third Quarter'
		} else if (moonPhase > 0.75 && moonPhase < 1) {
			return 'Waning Crescent'
		}
	}
	const getDateTimeElement = (dt: number) => (
		<DateTime
			datetime={new Date(dt * 1000)}
			options={{ timeStyle: 'medium', timeZone: timezone }}
		/>
	)

	const getMoonIcon = (moonPhase: number) => {
		const index = Math.round(moonPhase * 27)
		const moonPhaseString = getFormattedMoonPhaseString(moonPhase)
		return (
			<span
				aria-label={moonPhaseString}
				className={`wi small ${moonIcons[index]}`}
				role='img'
				title={moonPhaseString}
			></span>
		)
	}

	return (
		<div className='sun-moon'>
			<h2>Sun & Moon</h2>
			<div>
				<span
					aria-label={SUNRISE}
					className={`wi small wi-${SUNRISE}`}
					role='img'
					title={SUNRISE}
				></span>{' '}
				{getDateTimeElement(sunrise)}
			</div>
			<div>
				{' '}
				<span
					aria-label={SUNSET}
					className={`wi small wi-${SUNSET}`}
					role='img'
					title={SUNSET}
				></span>{' '}
				{getDateTimeElement(sunset)}
			</div>
			<div>
				{' '}
				<span
					aria-label={MOONRISE}
					className={`wi small wi-${MOONRISE}`}
					role='img'
					title={MOONRISE}
				></span>{' '}
				{getDateTimeElement(moonrise)}
			</div>
			<div>
				{' '}
				<span
					aria-label={MOONSET}
					className={`wi small wi-${MOONSET}`}
					role='img'
					title={MOONSET}
				></span>{' '}
				{getDateTimeElement(moonset)}
			</div>
			<div>Moon Phase: {getMoonIcon(moon_phase)}</div>
		</div>
	)
}
export default SunMoonData
