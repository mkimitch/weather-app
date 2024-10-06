import { FC, useEffect } from 'react'

import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import useGeolocation from '../../hooks/useGeolocation'

const Geolocation: FC = () => {
	const navigate = useNavigate()
	const { geolocation, error, getGeolocation } = useGeolocation()

	const handleButtonClick = () => getGeolocation()

	useEffect(() => {
		if (geolocation?.coords) {
			const { latitude, longitude } = geolocation.coords
			navigate(`/weather/${latitude}/${longitude}`)
		}
	}, [geolocation, navigate])

	return (
		<>
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
			{error && <div>{error}</div>}
		</>
	)
}

export default Geolocation
