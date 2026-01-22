import { useEffect, useState } from 'react'

interface ReverseGeocodingResponse {
	country: string
	name: string
	state?: string
}

interface BigDataCloudReverseGeocodeResponse {
	city?: string
	countryCode?: string
	locality?: string
	principalSubdivision?: string
}

const useReverseGeocodingAPI = (
	lat: string | undefined,
	lon: string | undefined
) => {
	const [apiKey, setApiKey] = useState<string | null>(() =>
		localStorage.getItem('openweather_api_key')
	)
	const [data, setData] = useState<ReverseGeocodingResponse[] | null>(null)
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
						? `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`
						: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
					{ signal: controller.signal }
				)

				if (!response.ok) {
					throw new Error('Failed to fetch reverse geocoding data')
				}

				const rawResult = await response.json()
				const result: ReverseGeocodingResponse[] = apiKey
					? (rawResult as ReverseGeocodingResponse[])
					: [
							{
								country:
									(rawResult as BigDataCloudReverseGeocodeResponse)
										.countryCode ?? '',
								name:
									(rawResult as BigDataCloudReverseGeocodeResponse).city ??
									(rawResult as BigDataCloudReverseGeocodeResponse).locality ??
									'',
								state: (rawResult as BigDataCloudReverseGeocodeResponse)
									.principalSubdivision,
							},
						].filter(({ country, name }) => Boolean(country) || Boolean(name))

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

		if (lat && lon) {
			fetchData()
		} else {
			setData(null)
			setError(null)
			setLoading(false)
		}

		return () => controller.abort()
	}, [lat, lon, apiKey])

	return { data, error, loading }
}

export default useReverseGeocodingAPI
