import { useEffect, useState } from 'react'

const useReverseGeocodingAPI = (
	lat: string | undefined,
	lon: string | undefined
) => {
	const [data, setData] = useState<any[] | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
				const response = await fetch(
					`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`
				)

				if (!response.ok) {
					throw new Error('Failed to fetch reverse geocoding data')
				}

				const result = await response.json()

				if (result.length === 0) {
					setError('Location not found')
					setData(null)
				} else {
					setData(result)
					setError(null)
				}
			} catch (err: any) {
				setError(err.message || 'An unknown error occurred')
				setData(null)
			} finally {
				setLoading(false)
			}
		}

		if (lat && lon) {
			fetchData()
		}
	}, [lat, lon])

	return { data, error, loading }
}

export default useReverseGeocodingAPI
