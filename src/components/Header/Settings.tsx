import { FC, useState } from 'react'

const Settings: FC = () => {
	const [apiKey, setApiKey] = useState(
		localStorage.getItem('openweather_api_key') || ''
	)

	const handleSave = () => {
		localStorage.setItem('openweather_api_key', apiKey)
		alert('API Key saved!')
	}

	return (
		<div className='settings'>
			<h2>Settings</h2>
			<input
				onChange={e => setApiKey(e.target.value)}
				placeholder='Enter your OpenWeather API Key'
				type='text'
				value={apiKey}
			/>
			<button onClick={handleSave}>Save API Key</button>
		</div>
	)
}

export default Settings
