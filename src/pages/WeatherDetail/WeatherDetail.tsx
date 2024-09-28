import './WeatherDetail.scss'

import type {
	OneCallResponse,
	OpenWeatherAPI,
} from '../../types/openWeatherAPI'
import React, { FC, useEffect, useState } from 'react'

import AdditionalInfo from '../../components/Weather/AdditionalInfo'
import CurrentWeather from '../../components/Weather/CurrentWeather'
import DailyForecast from '../../components/Weather/DailyForecast'
import HourlyForecast from '../../components/Weather/HourlyForecast'
import LocationInfo from '../../components/Weather/LocationInfo'
import SunMoonData from '../../components/Weather/SunMoonData'
import WindInfo from '../../components/Weather/WindInfo'
import useOpenWeatherAPI from '../../hooks/useOpenWeatherAPI'
import { useParams } from 'react-router-dom'

// import Precipitation from '../../components/Weather/Precipitation'

// import WeatherAlerts from '../../components/Weather/WeatherAlerts'

const units = 'imperial'

const WeatherDetail: FC = () => {
	const { latitude, longitude } = useParams()
	const { data, error, loading }: OpenWeatherAPI = useOpenWeatherAPI(
		latitude,
		longitude
	)

	if (!data || loading || error || Object.keys(data).length === 0) {
		return (
			<div>{loading ? 'Loading...' : error ? `Error: ${error}` : null}</div>
		)
	}

	const {
		alerts,
		current,
		daily,
		hourly,
		lat,
		lon,
		minutely,
		timezone_offset,
		timezone,
	}: OneCallResponse = data as OneCallResponse

	return (
		<div className='weather-detail'>
			{data && (
				<>
					<section className='card current-weather'>
						<h2>Current Weather</h2>
						<CurrentWeather
							current={current}
							units={units}
						/>
					</section>
					<section className='card secondary-info'>
						<h2>Sun & Moon</h2>
						<SunMoonData
							current={current}
							daily={daily}
						/>
						<LocationInfo {...{ lat, lon, timezone, timezone_offset }} />
					</section>
					<section className='card tertiary-info'>
						<h2>Wind</h2>
						<WindInfo
							current={current}
							units={units}
						/>
						<h2>Additional Info</h2>
						<AdditionalInfo
							current={current}
							units={units}
						/>
					</section>
					<section className='card daily-forecast'>
						<h2>Daily Forecast</h2>
						<DailyForecast
							daily={daily}
							units={units}
						/>
					</section>
					{hourly && (
						<section className='card hourly-forecast'>
							<h2>Hourly Forecast</h2>
							<HourlyForecast
								hourly={hourly}
								units={units}
							/>
						</section>
					)}
				</>
			)}
		</div>
	)
}

export default WeatherDetail
