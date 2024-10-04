import './styles/global.scss'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { FC } from 'react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import HomePage from './pages/Home/Home'
import WeatherDetail from './pages/WeatherDetail/WeatherDetail'

const App: FC = () => {
	return (
		<div className='weather-app'>
			<a
				className='sr-only'
				href='#main-content'
			>
				Skip to main content
			</a>
			<Router>
				<Header />
				<main
					className='main'
					id='main-content'
					role='main'
					tabIndex={0}
				>
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
				</main>
			</Router>
			<Footer />
		</div>
	)
}

export default App
