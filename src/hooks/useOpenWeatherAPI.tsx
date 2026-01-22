import { useEffect, useState } from 'react'
import type { OneCallResponse, OpenWeatherAPI } from '../types/openWeatherAPI'

const useOpenWeatherAPI = (
	latitude: string | undefined,
	longitude: string | undefined
): OpenWeatherAPI => {
	const [apiKey, setApiKey] = useState<string | null>(() =>
		localStorage.getItem('openweather_api_key')
	)
	const [data, setData] = useState<OneCallResponse | {}>({})
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>(undefined)

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

		const fetchData = async (resolvedApiKey: string) => {
			try {
				setLoading(true)
				setError(undefined)
				const exclude = ''
				const units = 'imperial'
				const lang = 'en-US'
				const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=${units}&lang=${lang}&appid=${resolvedApiKey}`
				const response = await fetch(url, { signal: controller.signal })

				if (!response.ok) {
					const errorPayload = await response.json().catch(() => null)
					const apiMessage =
						errorPayload &&
						typeof errorPayload === 'object' &&
						'message' in errorPayload
							? (errorPayload as { message?: unknown }).message
							: undefined

					const message =
						typeof apiMessage === 'string'
							? apiMessage
							: `Failed to fetch weather data (${response.status})`

					throw new Error(message)
				}

				const data = await response.json()
				setData(data)
			} catch (err: any) {
				if (err.name !== 'AbortError') {
					setError(err.message || 'Something went wrong')
				}
			} finally {
				setLoading(false)
			}
		}

		if (!latitude || !longitude || !apiKey) {
			setData({})
			setError(undefined)
			setLoading(false)
			return () => controller.abort()
		}

		fetchData(apiKey)

		return () => controller.abort()
	}, [latitude, longitude, apiKey])

	return { data, error, loading }
}

export default useOpenWeatherAPI
