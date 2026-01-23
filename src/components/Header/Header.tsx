import './Header.scss'

import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import ApiStatusBadge from './ApiStatusBadge'
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
			<div className='header-actions'>
				<div className='header-status-settings'>
					<ApiStatusBadge />
				</div>
				<ThemeToggle />
			</div>
		</header>
	)
}

export default Header
