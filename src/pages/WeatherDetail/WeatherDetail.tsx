import './WeatherDetail.scss'

import { FC, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import type {
	OneCallResponse,
	OpenWeatherAPI,
} from '../../types/openWeatherAPI'

import Alert from '../../components/Alert/Alert'
import DateTime from '../../components/DateTime/DateTime'
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
import useNwsWeatherAPI from '../../hooks/useNwsWeatherAPI'
import useOpenWeatherAPI from '../../hooks/useOpenWeatherAPI'
import useReverseGeocodingAPI from '../../hooks/useReverseGeocodingAPI'
import { someTruthy } from '../../utils/utils'

const units = 'imperial'

const WeatherDetail: FC = () => {
	const { latitude, longitude } = useParams()
	const location = useLocation()
	const { name, state, country } = location.state || {}
	const [openWeatherApiKey, setOpenWeatherApiKey] = useState<string | null>(
		() => localStorage.getItem('openweather_api_key')
	)
	const shouldUseOpenWeather = Boolean(openWeatherApiKey)

	const [geoData, setGeoData] = useState({
		name: name || null,
		state: state || null,
		country: country || null,
	})

	const { data, error, loading }: OpenWeatherAPI = useOpenWeatherAPI(
		shouldUseOpenWeather ? latitude : undefined,
		shouldUseOpenWeather ? longitude : undefined
	)
	const {
		data: reverseGeoData,
		error: geoError,
		loading: geoLoading,
	} = useReverseGeocodingAPI(
		shouldUseOpenWeather ? latitude : undefined,
		shouldUseOpenWeather ? longitude : undefined
	)
	const {
		data: nwsData,
		error: nwsError,
		loading: nwsLoading,
	} = useNwsWeatherAPI(
		shouldUseOpenWeather ? undefined : latitude,
		shouldUseOpenWeather ? undefined : longitude
	)

	useEffect(() => {
		const handleApiKeyChange = () => {
			setOpenWeatherApiKey(localStorage.getItem('openweather_api_key'))
		}

		window.addEventListener('openweather_api_key_updated', handleApiKeyChange)
		window.addEventListener('storage', handleApiKeyChange)

		return () => {
			window.removeEventListener(
				'openweather_api_key_updated',
				handleApiKeyChange
			)
			window.removeEventListener('storage', handleApiKeyChange)
		}
	}, [])

	useEffect(() => {
		if (!shouldUseOpenWeather) return
		if (reverseGeoData && reverseGeoData.length > 0) {
			setGeoData(prev => {
				if (
					prev.name === reverseGeoData[0].name &&
					prev.state === reverseGeoData[0].state
				) {
					return prev
				}
				return {
					...prev,
					name: prev.name || reverseGeoData[0].name,
					state: prev.state || reverseGeoData[0].state,
					country: prev.country || reverseGeoData[0].country,
				}
			})
		}
	}, [reverseGeoData, shouldUseOpenWeather])

	useEffect(() => {
		if (shouldUseOpenWeather) return
		const nwsLocation = nwsData?.location
		if (!nwsLocation) return

		setGeoData(prev => ({
			country: prev.country || 'US',
			name: prev.name || nwsLocation.city || null,
			state: prev.state || nwsLocation.state || null,
		}))
	}, [nwsData, shouldUseOpenWeather])

	if (shouldUseOpenWeather ? loading || geoLoading : nwsLoading) {
		return (
			<div
				className='ellipses'
				data-testid='weather-detail-loading'
			>
				Loading
			</div>
		)
	}

	if (shouldUseOpenWeather ? error || geoError : nwsError) {
		return (
			<div className='weather-detail'>
				<Alert
					className='grid-1'
					data-testid='error'
					title='Unable to load weather data'
				>
					{shouldUseOpenWeather && error ? (
						<div>{`Weather API Error: ${error}`}</div>
					) : null}
					{shouldUseOpenWeather && geoError ? (
						<div>{`Geocoding API Error: ${geoError}`}</div>
					) : null}
					{!shouldUseOpenWeather && nwsError ? (
						<div>{`NWS API Error: ${nwsError}`}</div>
					) : null}
				</Alert>
			</div>
		)
	}

	if (!shouldUseOpenWeather) {
		if (!nwsData) {
			return <div>No data available.</div>
		}

		const currentPeriod = nwsData.hourlyPeriods[0] ?? nwsData.dailyPeriods[0]
		const displayName = [geoData.name, geoData.state, geoData.country]
			.filter(Boolean)
			.join(', ')

		return (
			<div className='weather-detail'>
				<section className='card grid-2'>
					<div className='current-weather'>
						<h2>Current Weather</h2>
						{currentPeriod ? (
							<>
								<div>
									<DateTime
										datetime={currentPeriod.startTime}
										options={{
											hour: 'numeric',
											hour12: true,
											timeZone: nwsData.timeZone,
										}}
									/>
								</div>
								<div>
									Temperature: {Math.round(currentPeriod.temperature)}
									{` °${currentPeriod.temperatureUnit}`}
								</div>
								<div>{currentPeriod.shortForecast}</div>
								{currentPeriod.icon ? (
									<img
										alt={currentPeriod.shortForecast}
										loading='lazy'
										src={currentPeriod.icon}
									/>
								) : null}
								<div>
									Wind: {currentPeriod.windSpeed} {currentPeriod.windDirection}
								</div>
							</>
						) : (
							<div>No data available.</div>
						)}
					</div>
				</section>

				<section className='card grid-4'>
					<div className='location-info'>
						<h2>Location Details</h2>
						<div>Name: {displayName}</div>
						<div>Latitude: {latitude}</div>
						<div>Longitude: {longitude}</div>
						{nwsData.timeZone ? <div>Timezone: {nwsData.timeZone}</div> : null}
					</div>
				</section>

				<section className='card grid-5'>
					<div>
						<h2>Forecast</h2>
						<div
							className='scroll-container'
							role='list'
							tabIndex={0}
						>
							{nwsData.dailyPeriods.slice(0, 14).map(period => (
								<div
									className='scroll-item'
									key={period.number}
									role='listitem'
								>
									<div>{period.name}</div>
									<div>
										{Math.round(period.temperature)}
										{` °${period.temperatureUnit}`}
									</div>
									{period.icon ? (
										<img
											alt={period.shortForecast}
											loading='lazy'
											src={period.icon}
										/>
									) : null}
									<div>{period.shortForecast}</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className='card grid-6'>
					<div>
						<h2>Hourly Forecast</h2>
						<div
							className='scroll-container'
							role='list'
							tabIndex={0}
						>
							{nwsData.hourlyPeriods.slice(0, 24).map(period => (
								<div
									className='scroll-item'
									key={period.number}
									role='listitem'
								>
									<DateTime
										datetime={period.startTime}
										options={{
											hour: 'numeric',
											hour12: true,
											timeZone: nwsData.timeZone,
										}}
									/>
									<div>
										{Math.round(period.temperature)}
										{` °${period.temperatureUnit}`}
									</div>
									{period.icon ? (
										<img
											alt={period.shortForecast}
											loading='lazy'
											src={period.icon}
										/>
									) : null}
									<div>{period.shortForecast}</div>
								</div>
							))}
						</div>
					</div>
				</section>
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
