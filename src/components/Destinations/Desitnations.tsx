import './Destinations.scss'

import React, { FC } from 'react'

import { Link } from 'react-router-dom'

const popularLocations = [
	{
		country: 'US',
		lat: '40.7127281',
		lon: '-74.0060152',
		name: 'New York',
	},
	{
		country: 'GB',
		lat: '51.5073219',
		lon: '-0.1276474',
		name: 'London',
	},
	{
		country: 'JP',
		lat: '35.6828387',
		lon: '139.7594549',
		name: 'Tokyo',
	},
	{
		country: 'IN',
		lat: '19.0785451',
		lon: '72.878176',
		name: 'Mumbai',
	},
	{
		country: 'AU',
		lat: '-33.8698439',
		lon: '151.2082848',
		name: 'Sydney',
	},
	{
		country: 'AE',
		lat: '25.2653471',
		lon: '55.2924914',
		name: 'Dubai',
	},
	{
		country: 'BR',
		lat: '-22.9110137',
		lon: '-43.2093727',
		name: 'Rio de Janeiro',
	},
	{
		country: 'FR',
		lat: '-16.504346650000002',
		lon: '-151.73668863927236',
		name: 'Bora Bora',
	},
]

const Destinations: FC = () => {
	return (
		<section className='destinations'>
			<h2>Popular Destinations</h2>
			<ul className='destinations-list'>
				{popularLocations.map(({ country, lat, lon, name }) => (
					<li
						className='card'
						key={`${lat}${lon}`}
					>
						<span className={`fi fi-${country.toLowerCase()}`}>
							<Link to={`/weather/${lat}/${lon}`}>{name}</Link>
						</span>
					</li>
				))}
			</ul>
		</section>
	)
}

export default Destinations
