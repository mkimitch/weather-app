import React, { FC, FormEvent, useEffect } from 'react'

import useGeolocation from '../../hooks/useGeolocation'
import { useNavigate } from 'react-router-dom'

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
				<i className='fas fa-location-crosshairs'></i>
			</button>
			{error && <div>{error}</div>}
		</>
	)
}

export default Geolocation
