import './Header.scss'

import { Link, useLocation } from 'react-router-dom'

import { FC } from 'react'
import ThemeToggle from './ThemeToggle'

const Header: FC = () => {
	const location = useLocation()

	const isHomePage = location.pathname === '/'

	return (
		<header className='header'>
			<nav>
				<Link
					className={`${!isHomePage ? 'go-home' : ''}`}
					to='/'
				>
					<h1>Weather App</h1>
				</Link>
			</nav>
			<ThemeToggle />
		</header>
	)
}

export default Header
