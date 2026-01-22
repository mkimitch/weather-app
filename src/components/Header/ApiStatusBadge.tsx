import { FC, useEffect, useState } from 'react'

type WeatherApiProvider = 'nws' | 'openweather'

const OPENWEATHER_API_KEY_STORAGE_KEY = 'openweather_api_key'

const getWeatherApiProvider = (apiKey: string | null): WeatherApiProvider =>
	apiKey ? 'openweather' : 'nws'

const ApiStatusBadge: FC = () => {
	const [provider, setProvider] = useState<WeatherApiProvider>(() =>
		getWeatherApiProvider(localStorage.getItem(OPENWEATHER_API_KEY_STORAGE_KEY))
	)

	useEffect(() => {
		const handleApiKeyChange = () => {
			setProvider(
				getWeatherApiProvider(
					localStorage.getItem(OPENWEATHER_API_KEY_STORAGE_KEY)
				)
			)
		}

		window.addEventListener('openweather_api_key_updated', handleApiKeyChange)
		window.addEventListener('storage', handleApiKeyChange)

		return () => {
			window.removeEventListener(
				'openweather_api_key_updated',
				handleApiKeyChange
			)
			window.removeEventListener('storage', handleApiKeyChange)
		}
	}, [])

	const label = provider === 'openweather' ? 'OpenWeather' : 'NWS'
	const scope = provider === 'openweather' ? 'Global' : 'US-only'
	const description =
		provider === 'openweather'
			? 'Using OpenWeather for weather data (global coverage)'
			: 'Using National Weather Service for weather data (US-only)'

	return (
		<div
			aria-label={description}
			className={`api-status api-status--${provider}`}
			role='status'
			title={description}
		>
			<span
				aria-hidden={true}
				className='api-status__dot'
			/>
			<span className='api-status__label'>{label}</span>
			<span
				aria-hidden={true}
				className='api-status__scope'
			>
				{scope}
			</span>
		</div>
	)
}

export default ApiStatusBadge
