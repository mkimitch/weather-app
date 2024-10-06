import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ThemeToggle.scss'

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FC, useEffect, useState } from 'react'

const ThemeToggle: FC = () => {
	const [theme, setTheme] = useState<string>('dark')

	const applyTheme = (theme: string) => {
		document.body.setAttribute('data-theme', theme)
		localStorage.setItem('theme', theme)
	}

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')

		if (savedTheme) {
			setTheme(savedTheme)
			applyTheme(savedTheme)
		} else {
			const systemPrefersDark = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches

			const preferredTheme = systemPrefersDark ? 'dark' : 'light'
			setTheme(preferredTheme)
			applyTheme(preferredTheme)
		}
	}, [])

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		applyTheme(newTheme)
	}

	return (
		<button
			aria-label={
				theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
			}
			aria-pressed={theme === 'dark'}
			className='theme-toggle'
			onClick={toggleTheme}
		>
			{theme === 'light' ? (
				<FontAwesomeIcon
					icon={faMoon}
					size='xl'
				/>
			) : (
				<FontAwesomeIcon
					icon={faSun}
					size='xl'
				/>
			)}
		</button>
	)
}

export default ThemeToggle
