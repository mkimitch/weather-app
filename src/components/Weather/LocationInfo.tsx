import React, { FC } from 'react'

import type { Location } from '../../types/openWeatherAPI'

interface LocationProps extends Location {
	name?: string
	state?: string
	country?: string
}

const LocationInfo: FC<LocationProps> = ({
	country,
	lat,
	lon,
	name,
	state,
	timezone_offset,
	timezone,
}) => {
	return (
		<div className='location-info'>
			<h2>Location Details</h2>
			<div>Name: {[name, state, country].filter(Boolean).join(', ')}</div>
			<div>Latitude: {lat}</div>
			<div>Longitude: {lon}</div>
			<div>Timezone: {timezone}</div>
			<div>Timezone Offset: {timezone_offset / 3600} hours</div>
		</div>
	)
}
export default LocationInfo
