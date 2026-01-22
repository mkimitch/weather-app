import { useState } from 'react'

const ERROR_MESSAGE = 'Geolocation is not supported by this browser.'

const useGeolocation = () => {
	const [geolocation, setGeolocation] = useState<GeolocationPosition | null>(
		null
	)
	const [error, setError] = useState<string | null>(null)

	const options = {
		enableHighAccuracy: true,
		maximumAge: 60_000,
		timeout: 60_000,
	}

	const success = (position: GeolocationPosition): void => {
		setError(null)
		setGeolocation(position)
	}

	const handleError = (err: GeolocationPositionError): void => {
		setGeolocation(null)
		setError(`${err.message} (${err.code})`)
		if (process.env.NODE_ENV !== 'production') {
			console.error(
				`Error getting user's location (${err.code}): ${err.message}`
			)
		}
	}

	const getGeolocation = () => {
		setError(null)
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(success, handleError, options)
		} else {
			setGeolocation(null)
			setError(ERROR_MESSAGE)
			if (process.env.NODE_ENV !== 'production') {
				console.warn(ERROR_MESSAGE)
			}
		}
	}

	return { geolocation, error, getGeolocation }
}

export default useGeolocation
