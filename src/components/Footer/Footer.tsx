import './Footer.scss'

import { FC } from 'react'

const Footer: FC = () => {
	return (
		<footer className='footer'>
			Made by Mark Kimitch <span aria-hidden={true}>| </span>
			<a
				aria-label='Weather App GitHub repository'
				href='https://github.com/mkimitch/weather-app'
			>
				<img
					alt=''
					src='https://img.shields.io/badge/GitHub-Repo-blue%3Flogo%3Dgithub?style=flat&amp;logo=github&amp;labelColor=gray&amp;color=blue'
				/>
			</a>
		</footer>
	)
}

export default Footer
