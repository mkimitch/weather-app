import { FC, useEffect } from 'react'

import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import useGeolocation from '../../hooks/useGeolocation'

interface GeolocationProps {
	onErrorChange?: (error: string | null) => void
}

const Geolocation: FC<GeolocationProps> = ({ onErrorChange }) => {
	const navigate = useNavigate()
	const { geolocation, error, getGeolocation } = useGeolocation()

	const handleButtonClick = () => getGeolocation()

	useEffect(() => {
		if (geolocation?.coords) {
			const { latitude, longitude } = geolocation.coords
			navigate(`/weather/${latitude}/${longitude}`)
		}
	}, [geolocation, navigate])

	useEffect(() => {
		onErrorChange?.(error)
	}, [error, onErrorChange])

	return (
		<button
			aria-label='Use my location'
			className='geolocation'
			onClick={handleButtonClick}
			type='button'
		>
			<FontAwesomeIcon
				icon={faLocationCrosshairs}
				size='xl'
			/>
		</button>
	)
}

export default Geolocation
