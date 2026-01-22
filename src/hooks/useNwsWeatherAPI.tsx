import { useEffect, useState } from 'react'

interface NwsPointsRelativeLocation {
	properties?: {
		city?: string
		state?: string
	}
}

interface NwsPointsProperties {
	forecast?: string
	forecastHourly?: string
	relativeLocation?: NwsPointsRelativeLocation
	timeZone?: string
}

interface NwsPointsResponse {
	properties: NwsPointsProperties
}

export interface NwsForecastPeriod {
	detailedForecast?: string
	endTime: string
	icon: string
	isDaytime: boolean
	name: string
	number: number
	shortForecast: string
	startTime: string
	temperature: number
	temperatureUnit: string
	windDirection: string
	windSpeed: string
}

interface NwsForecastProperties {
	periods: NwsForecastPeriod[]
}

interface NwsForecastResponse {
	properties: NwsForecastProperties
}

export interface NwsWeatherData {
	dailyPeriods: NwsForecastPeriod[]
	hourlyPeriods: NwsForecastPeriod[]
	location?: {
		city?: string
		state?: string
	}
	timeZone?: string
}

interface NwsWeatherApiState {
	data: NwsWeatherData | null
	error: string | null
	loading: boolean
}

const useNwsWeatherAPI = (
	latitude: string | undefined,
	longitude: string | undefined
): NwsWeatherApiState => {
	const [data, setData] = useState<NwsWeatherData | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const controller = new AbortController()

		const fetchData = async () => {
			try {
				setLoading(true)
				setError(null)

				const pointsResponse = await fetch(
					`https://api.weather.gov/points/${latitude},${longitude}`,
					{
						headers: { Accept: 'application/geo+json' },
						signal: controller.signal,
					}
				)

				if (!pointsResponse.ok) {
					throw new Error(
						pointsResponse.status === 404
							? 'NWS weather is only available for US locations.'
							: `Failed to fetch NWS location data (${pointsResponse.status})`
					)
				}

				const pointsData = (await pointsResponse.json()) as NwsPointsResponse
				const forecastUrl = pointsData.properties.forecast
				const forecastHourlyUrl = pointsData.properties.forecastHourly

				if (!forecastUrl || !forecastHourlyUrl) {
					throw new Error('NWS forecast URLs are missing for this location.')
				}

				const [forecastResponse, forecastHourlyResponse] = await Promise.all([
					fetch(forecastUrl, {
						headers: { Accept: 'application/geo+json' },
						signal: controller.signal,
					}),
					fetch(forecastHourlyUrl, {
						headers: { Accept: 'application/geo+json' },
						signal: controller.signal,
					}),
				])

				if (!forecastResponse.ok) {
					throw new Error(
						`Failed to fetch NWS forecast (${forecastResponse.status})`
					)
				}

				if (!forecastHourlyResponse.ok) {
					throw new Error(
						`Failed to fetch NWS hourly forecast (${forecastHourlyResponse.status})`
					)
				}

				const forecastData =
					(await forecastResponse.json()) as NwsForecastResponse
				const forecastHourlyData =
					(await forecastHourlyResponse.json()) as NwsForecastResponse

				const dailyPeriods = forecastData.properties?.periods ?? []
				const hourlyPeriods = forecastHourlyData.properties?.periods ?? []

				setData({
					dailyPeriods,
					hourlyPeriods,
					location: pointsData.properties.relativeLocation?.properties,
					timeZone: pointsData.properties.timeZone,
				})
			} catch (err: any) {
				if (err.name !== 'AbortError') {
					setError(err.message || 'An unknown error occurred')
					setData(null)
				}
			} finally {
				setLoading(false)
			}
		}

		const openWeatherApiKey = localStorage.getItem('openweather_api_key')
		const shouldUseNws = !openWeatherApiKey

		if (shouldUseNws && latitude && longitude) {
			fetchData()
		} else {
			setData(null)
			setError(null)
			setLoading(false)
		}

		return () => controller.abort()
	}, [latitude, longitude])

	return { data, error, loading }
}

export default useNwsWeatherAPI
