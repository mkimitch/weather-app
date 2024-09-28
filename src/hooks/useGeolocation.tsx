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

	const success = (position: GeolocationPosition): void =>
		setGeolocation(position)

	const handleError = (err: GeolocationPositionError): void => {
		setError(`${err.message} (${err.code})`)
		console.error(`Error getting user's location (${err.code}): ${err.message}`)
	}

	const getGeolocation = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(success, handleError, options)
		} else {
			setError(ERROR_MESSAGE)
			console.warn(ERROR_MESSAGE)
		}
	}

	return { geolocation, error, getGeolocation }
}

export default useGeolocation
