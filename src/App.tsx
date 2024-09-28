import './styles/global.scss'

import React, { FC } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import HomePage from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import WeatherDetail from './pages/WeatherDetail/WeatherDetail'

const App: FC = () => {
	return (
		<div className='weather-app'>
			<Router>
				<Header />
				<main className='main'>
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
