import type { OneCallResponse, OpenWeatherAPI } from '../types/openWeatherAPI'
import { useEffect, useState } from 'react'

const useOpenWeatherAPI = (
	latitude: string | undefined,
	longitude: string | undefined
): OpenWeatherAPI => {
	const [data, setData] = useState<OneCallResponse | {}>({})
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>()

	useEffect(() => {
		const controller = new AbortController()

		const fetchData = async () => {
			try {
				setLoading(true)
				const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
				const exclude = 'hourly,minutely'
				const units = 'imperial'
				const lang = 'en-US'
				const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=${units}&lang=${lang}&appid=${apiKey}`
				const response = await fetch(url, { signal: controller.signal })

				if (!response.ok) {
					setError('Failed to fetch weather data')
					console.error('Failed to fetch weather data')
				} else {
					const data = await response.json()
					setData(data)
				}
			} catch (err: any) {
				if (err.name !== 'AbortError') {
					setError(err.message)
				}
			} finally {
				setLoading(false)
			}
		}

		if (latitude && longitude) {
			fetchData()
		}

		return () => controller.abort() // Cleanup if component unmounts or lat/lon change
	}, [latitude, longitude])

	return { data, error, loading }
}

export default useOpenWeatherAPI
