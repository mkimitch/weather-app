import './Header.scss'

import { Link, useLocation } from 'react-router-dom'
import React, { FC } from 'react'

import ThemeToggle from './ThemeToggle'

const Header: FC = () => {
	const location = useLocation()

	const isHomePage = location.pathname === '/'

	return (
		<header className='header'>
			<Link
				aria-label='Go home'
				className={`${!isHomePage ? 'go-home' : ''}`}
				to='/'
			>
				<h1>Weather App</h1>
			</Link>
			<ThemeToggle />
		</header>
	)
}

export default Header
