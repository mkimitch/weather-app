import { useState, useEffect } from 'react'

const useGeocodingAPI = (query: string) => {
	const [data, setData] = useState<any[] | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
				const response = await fetch(
					`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
				)

				if (!response.ok) {
					throw new Error('Failed to fetch location data')
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

		if (query) {
			fetchData()
		}
	}, [query])

	return { data, error, loading }
}

export default useGeocodingAPI
