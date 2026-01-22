import './Header.scss'

import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import ApiStatusBadge from './ApiStatusBadge'
import Settings from './Settings'
import ThemeToggle from './ThemeToggle'

const Header: FC = () => {
	const location = useLocation()
	const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
	const settingsContainerRef = useRef<HTMLDivElement | null>(null)

	const isHomePage = location.pathname === '/'

	useEffect(() => {
		setIsSettingsOpen(false)
	}, [location.pathname])

	useEffect(() => {
		if (!isSettingsOpen) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return
			setIsSettingsOpen(false)
		}

		const handleMouseDown = (event: MouseEvent) => {
			const target = event.target as Node | null
			if (!target) return
			if (settingsContainerRef.current?.contains(target)) return
			setIsSettingsOpen(false)
		}

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('mousedown', handleMouseDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('mousedown', handleMouseDown)
		}
	}, [isSettingsOpen])

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
				<ApiStatusBadge />
				<div
					className='header-settings-container'
					ref={settingsContainerRef}
				>
					<button
						aria-controls='header-settings'
						aria-expanded={isSettingsOpen}
						aria-label={isSettingsOpen ? 'Close settings' : 'Open settings'}
						className='header-action-button'
						onClick={() => setIsSettingsOpen(prev => !prev)}
						type='button'
					>
						<FontAwesomeIcon
							icon={faGear}
							size='xl'
						/>
					</button>
					{isSettingsOpen ? (
						<div
							aria-label='Settings'
							className='header-settings'
							id='header-settings'
							role='dialog'
						>
							<Settings onClose={() => setIsSettingsOpen(false)} />
						</div>
					) : null}
				</div>
				<ThemeToggle />
			</div>
		</header>
	)
}

export default Header
