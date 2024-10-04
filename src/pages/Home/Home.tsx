import './Home.scss'

import { FC } from 'react'

import Destinations from '../../components/Destinations/Desitnations'
import Search from '../../components/Search/Search'

const Home: FC = () => {
	return (
		<div className='home'>
			<Search />
			<Destinations />
		</div>
	)
}

export default Home
