import './styles/global.scss'

import {
	BrowserRouter,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'

import { FC, lazy, Suspense } from 'react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

const HomePage = lazy(() => import('./pages/Home/Home'))
const WeatherDetail = lazy(() => import('./pages/WeatherDetail/WeatherDetail'))
const basename = process.env.NODE_ENV === 'production' ? '/weather-app' : ''
const App: FC = () => {
	return (
		<div className='weather-app'>
			<a
				className='sr-only'
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
