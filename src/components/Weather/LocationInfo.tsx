import React, { FC } from 'react'

import type { Location } from '../../types/openWeatherAPI'

const LocationInfo: FC<Location> = ({
	lat,
	lon,
	timezone_offset,
	timezone,
}) => {
	return (
		<div>
			<div>Latitude: {lat}</div>
			<div>Longitude: {lon}</div>
			<div>Timezone: {timezone}</div>
			<div>Timezone Offset: {timezone_offset} seconds</div>
		</div>
	)
}
export default LocationInfo
