import './styles/global.scss'

import { FC, Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

const HomePage = lazy(() => import('./pages/Home/Home'))
const WeatherDetail = lazy(() => import('./pages/WeatherDetail/WeatherDetail'))

const getBasename = (): string | undefined => {
	const baseHref = document.querySelector('base')?.getAttribute('href')

	if (!baseHref) return undefined

	const normalizedBaseHref = baseHref.endsWith('/')
		? baseHref.slice(0, -1)
		: baseHref

	if (normalizedBaseHref === '' || normalizedBaseHref === '/') return undefined

	return normalizedBaseHref
}

const basename = getBasename()

const entryHtmlRedirectPaths = [
	'/404.html',
	'/index.html',
	'/weather-app/404.html',
	'/weather-app/index.html',
] as const

const App: FC = () => {
	return (
		<div className='weather-app'>
			<a
				className='sr-only sr-only-focusable'
				href='#main-content'
			>
				Skip to main content
			</a>
			<BrowserRouter basename={basename}>
				<Header />
				<main
					className='main'
					id='main-content'
					role='main'
					tabIndex={0}
				>
					<Suspense fallback={<div className='ellipses'>Loading</div>}>
						<Routes>
							{entryHtmlRedirectPaths.map(path => (
								<Route
									element={
										<Navigate
											replace
											to='/'
										/>
									}
									key={path}
									path={path}
								/>
							))}
							<Route
								element={<HomePage />}
								path='/'
							/>
							<Route
								element={<WeatherDetail />}
								path='/weather/:latitude/:longitude'
							/>
						</Routes>
					</Suspense>
				</main>
			</BrowserRouter>
			<Footer />
		</div>
	)
}

export default App
