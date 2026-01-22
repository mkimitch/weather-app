import { FC, useState } from 'react'

import Alert from '../Alert/Alert'

interface SettingsProps {
	onClose?: () => void
}

const Settings: FC<SettingsProps> = ({ onClose }) => {
	const [apiKey, setApiKey] = useState(
		localStorage.getItem('openweather_api_key') || ''
	)
	const [statusMessage, setStatusMessage] = useState<string | null>(null)
	const [statusVariant, setStatusVariant] = useState<
		'success' | 'info' | 'warning' | 'error'
	>('info')

	const notifyApiKeyUpdated = () => {
		window.dispatchEvent(new Event('openweather_api_key_updated'))
	}

	const handleSave = () => {
		const trimmedApiKey = apiKey.trim()
		if (!trimmedApiKey) {
			localStorage.removeItem('openweather_api_key')
			setApiKey('')
			setStatusVariant('info')
			setStatusMessage('API key cleared. Using NWS (US-only).')
			notifyApiKeyUpdated()
			return
		}

		localStorage.setItem('openweather_api_key', trimmedApiKey)
		setApiKey(trimmedApiKey)
		setStatusVariant('success')
		setStatusMessage('API key saved.')
		notifyApiKeyUpdated()
	}

	const handleClear = () => {
		localStorage.removeItem('openweather_api_key')
		setApiKey('')
		setStatusVariant('info')
		setStatusMessage('API key cleared. Using NWS (US-only).')
		notifyApiKeyUpdated()
	}

	return (
		<div className='settings'>
			<div>
				<h2>Settings</h2>
				{onClose ? (
					<button
						onClick={onClose}
						type='button'
					>
						Close
					</button>
				) : null}
			</div>
			{statusMessage ? (
				<Alert
					title='Settings'
					variant={statusVariant}
				>
					{statusMessage}
				</Alert>
			) : null}
			<input
				onChange={e => setApiKey(e.target.value)}
				placeholder='Enter your OpenWeather API Key'
				type='password'
				value={apiKey}
			/>
			<div>
				<button
					onClick={handleSave}
					type='button'
				>
					Save API Key
				</button>
				<button
					onClick={handleClear}
					type='button'
				>
					Clear
				</button>
			</div>
		</div>
	)
}

export default Settings
