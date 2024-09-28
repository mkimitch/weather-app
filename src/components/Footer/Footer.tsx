import './Footer.scss'

import React, { FC } from 'react'

const Footer: FC = () => {
	return (
		<footer className='footer'>
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
