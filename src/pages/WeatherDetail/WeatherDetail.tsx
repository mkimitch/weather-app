import './WeatherDetail.scss'

import type {
	OneCallResponse,
	OpenWeatherAPI,
} from '../../types/openWeatherAPI'
import React, { FC, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import AdditionalInfo from '../../components/Weather/AdditionalInfo'
import CurrentWeather from '../../components/Weather/CurrentWeather'
import DailyForecast from '../../components/Weather/DailyForecast'
import HourlyForecast from '../../components/Weather/HourlyForecast'
import LocationInfo from '../../components/Weather/LocationInfo'
import MinutelyPrecipitation from '../../components/Weather/MinutelyPrecipitation'
import Precipitation from '../../components/Weather/Precipitation'
import SunMoonData from '../../components/Weather/SunMoonData'
import WeatherAlerts from '../../components/Weather/WeatherAlerts'
import WindInfo from '../../components/Weather/WindInfo'
import { someTruthy } from '../../utils/utils'
import useOpenWeatherAPI from '../../hooks/useOpenWeatherAPI'
import useReverseGeocodingAPI from '../../hooks/useReverseGeocodingAPI'

const units = 'imperial'

const WeatherDetail: FC = () => {
	const { latitude, longitude } = useParams()
	const location = useLocation()
	const { name, state, country } = location.state || {}

	const [geoData, setGeoData] = useState({
		name: name || null,
		state: state || null,
		country: country || null,
	})

	const { data, error, loading }: OpenWeatherAPI = useOpenWeatherAPI(
		latitude,
		longitude
	)
	const {
		data: reverseGeoData,
		error: geoError,
		loading: geoLoading,
	} = useReverseGeocodingAPI(latitude, longitude)

	useEffect(() => {
		if (reverseGeoData && reverseGeoData.length > 0) {
			setGeoData(prev => ({
				...prev,
				name: prev.name || reverseGeoData[0].name,
				state: prev.state || reverseGeoData[0].state,
				country: prev.country || reverseGeoData[0].country,
			}))
		}
	}, [reverseGeoData])

	if (loading || geoLoading) {
		return <div>Loading...</div>
	}

	if (error || geoError) {
		return (
			<div>
				{error ? `Weather API Error: ${error}` : null}
				{geoError ? `Geocoding API Error: ${geoError}` : null}
			</div>
		)
	}

	if (!data || Object.keys(data).length === 0) {
		return <div>No data available.</div>
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

	const currentPrecipitation = someTruthy(current.rain, current.snow)

	return (
		<div className='weather-detail'>
			{data && (
				<>
					{alerts && (
						<section className='card grid-1'>
							<WeatherAlerts {...{ alerts, timezone }} />
						</section>
					)}
					<section className='card grid-2'>
						<CurrentWeather {...{ current, timezone, units }} />
					</section>
					<section className='card grid-3'>
						<SunMoonData {...{ current, daily, timezone }} />
						<AdditionalInfo {...{ current, units }} />
						{currentPrecipitation && <Precipitation {...{ current }} />}
					</section>
					<section className='card grid-4'>
						<WindInfo {...{ current, units }} />
						<LocationInfo
							{...{ ...geoData, lat, lon, timezone, timezone_offset }}
						/>
					</section>
					<section className='card grid-5'>
						<DailyForecast {...{ daily, timezone, units }} />
					</section>
					<section className='card grid-6'>
						<HourlyForecast {...{ hourly, timezone, units }} />
					</section>
					<section className='card grid-7'>
						<MinutelyPrecipitation {...{ minutely, timezone }} />
					</section>
				</>
			)}
		</div>
	)
}

export default WeatherDetail
