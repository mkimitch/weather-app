import { useEffect, useState } from 'react'
import type { DirectGeocodingResponse } from '../types/openWeatherAPI'

interface OpenMeteoGeocodingResult {
	admin1?: string
	country_code: string
	latitude: number
	longitude: number
	name: string
}

interface OpenMeteoGeocodingResponse {
	results?: OpenMeteoGeocodingResult[]
}

interface GeocodingApiState {
	data: DirectGeocodingResponse[] | null
	error: string | null
	loading: boolean
}

const mapOpenMeteoGeocodingResultToDirectGeocodingResponse = (
	result: OpenMeteoGeocodingResult
): DirectGeocodingResponse => ({
	country: result.country_code,
	lat: result.latitude,
	lon: result.longitude,
	name: result.name,
	state: result.admin1,
})

const useGeocodingAPI = (query: string): GeocodingApiState => {
	const [apiKey, setApiKey] = useState<string | null>(() =>
		localStorage.getItem('openweather_api_key')
	)
	const [data, setData] = useState<DirectGeocodingResponse[] | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const handleApiKeyChange = () => {
			setApiKey(localStorage.getItem('openweather_api_key'))
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
		const controller = new AbortController()

		const fetchData = async () => {
			try {
				setLoading(true)
				setError(null)
				const response = await fetch(
					apiKey
						? `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
								query
							)}&limit=5&appid=${apiKey}`
						: `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
								query
							)}&count=5&format=json&language=en&countryCode=US`,
					{ signal: controller.signal }
				)

				if (!response.ok) {
					throw new Error('Failed to fetch location data')
				}

				const rawResult = await response.json()
				const result: DirectGeocodingResponse[] = apiKey
					? (rawResult as DirectGeocodingResponse[])
					: ((rawResult as OpenMeteoGeocodingResponse).results ?? []).map(
							mapOpenMeteoGeocodingResultToDirectGeocodingResponse
						)

				if (result.length === 0) {
					setError('Location not found')
					setData(null)
				} else {
					setData(result)
					setError(null)
				}
			} catch (err: any) {
				if (err.name !== 'AbortError') {
					setError(err.message || 'An unknown error occurred')
					setData(null)
				}
			} finally {
				setLoading(false)
			}
		}

		if (query) {
			fetchData()
		} else {
			setData(null)
			setError(null)
			setLoading(false)
		}

		return () => controller.abort()
	}, [query, apiKey])

	return { data, error, loading }
}

export default useGeocodingAPI
