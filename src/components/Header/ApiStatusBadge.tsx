import {
	FC,
	FormEvent,
	KeyboardEvent,
	MouseEvent,
	useEffect,
	useRef,
	useState,
} from 'react'

import './ApiStatusBadge.scss'

type ComponentMode = 'idle' | 'editing' | 'validating'
type WeatherApiProvider = 'nws' | 'openweather'

const OPENWEATHER_API_KEY_STORAGE_KEY = 'openweather_api_key'

const getWeatherApiProvider = (apiKey: string | null): WeatherApiProvider =>
	apiKey ? 'openweather' : 'nws'

const delay = async (milliseconds: number): Promise<void> =>
	new Promise(resolve => {
		setTimeout(resolve, milliseconds)
	})

interface ApiStatusBadgeProps {
	controlsId?: string
	expanded?: boolean
	onApiKeyChange?: (apiKey: string | null) => void
	onClick?: () => void
	validateApiKey?: (apiKey: string) => Promise<boolean>
}

const ApiStatusBadge: FC<ApiStatusBadgeProps> = ({
	controlsId,
	expanded,
	onApiKeyChange,
	onClick,
	validateApiKey,
}) => {
	const [mode, setMode] = useState<ComponentMode>('idle')
	const [provider, setProvider] = useState<WeatherApiProvider>(() =>
		getWeatherApiProvider(localStorage.getItem(OPENWEATHER_API_KEY_STORAGE_KEY))
	)
	const [inputValue, setInputValue] = useState<string>('')
	const [isError, setIsError] = useState<boolean>(false)
	const triggerRef = useRef<HTMLDivElement | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)

	const isToggle = typeof onClick === 'function'
	const isExpanded = isToggle ? Boolean(expanded) : mode !== 'idle'

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

	useEffect(() => {
		if (mode !== 'editing') return
		const focusDelayMs = 50
		void delay(focusDelayMs).then(() => {
			inputRef.current?.focus()
		})
	}, [mode])

	const labelMain = provider === 'openweather' ? 'OpenWeather' : 'NWS'
	const labelSub = provider === 'openweather' ? 'Global' : 'US-only'
	const description =
		provider === 'openweather'
			? 'Using OpenWeather for weather data (global coverage)'
			: 'Using National Weather Service for weather data (US-only)'

	const ariaLabel = isToggle
		? `${description}. Toggle weather API settings.`
		: `${description}. Enter an OpenWeather API key to switch providers.`

	const startInteraction = () => {
		if (isToggle) {
			onClick()
			return
		}

		setMode('editing')
		setIsError(false)
	}

	const cancelEditing = (event: MouseEvent | KeyboardEvent) => {
		event.stopPropagation()
		setMode('idle')
		setInputValue('')
		setIsError(false)
		void delay(0).then(() => {
			triggerRef.current?.focus()
		})
	}

	const defaultValidateApiKey = async (apiKey: string): Promise<boolean> => {
		await delay(250)
		return apiKey.length > 5
	}

	const submitApiKey = async (event: FormEvent) => {
		event.preventDefault()
		const trimmedApiKey = inputValue.trim()
		if (!trimmedApiKey) {
			localStorage.removeItem(OPENWEATHER_API_KEY_STORAGE_KEY)
			window.dispatchEvent(new Event('openweather_api_key_updated'))
			onApiKeyChange?.(null)
			setProvider('nws')
			setMode('idle')
			setInputValue('')
			setIsError(false)
			void delay(0).then(() => {
				triggerRef.current?.focus()
			})
			return
		}

		setMode('validating')

		try {
			const isValid = validateApiKey
				? await validateApiKey(trimmedApiKey)
				: await defaultValidateApiKey(trimmedApiKey)

			if (!isValid) {
				throw new Error('Invalid API key')
			}

			localStorage.setItem(OPENWEATHER_API_KEY_STORAGE_KEY, trimmedApiKey)
			window.dispatchEvent(new Event('openweather_api_key_updated'))
			onApiKeyChange?.(trimmedApiKey)
			setProvider('openweather')
			setMode('idle')
			setInputValue('')
			setIsError(false)
			void delay(0).then(() => {
				triggerRef.current?.focus()
			})
		} catch {
			setMode('editing')
			setIsError(true)
			inputRef.current?.focus()
		}
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (mode !== 'idle') return
		if (event.key !== 'Enter' && event.key !== ' ') return
		event.preventDefault()
		startInteraction()
	}

	return (
		<div
			aria-controls={isToggle ? controlsId : undefined}
			aria-expanded={isExpanded}
			aria-label={ariaLabel}
			className={`pill-container ${mode} ${isError ? 'error-shake' : ''}`}
			data-api-status-badge={true}
			data-expanded={isExpanded ? 'true' : 'false'}
			onClick={mode === 'idle' ? startInteraction : undefined}
			onKeyDown={mode === 'idle' ? handleKeyDown : undefined}
			ref={triggerRef}
			role={mode === 'idle' ? 'button' : undefined}
			tabIndex={mode === 'idle' ? 0 : -1}
			title={ariaLabel}
		>
			<div className='slide-track'>
				<div
					aria-hidden={mode !== 'idle'}
					className='view view-status'
				>
					<div className='status-content'>
						<div
							className={`dot ${
								provider === 'openweather' ? 'green' : 'orange'
							}`}
						/>
						<div className='label-group'>
							<span className='label-main'>{labelMain}</span>
							<span className='label-sub'>{labelSub}</span>
						</div>
					</div>
					<span
						aria-hidden={true}
						className='caret'
					>
						▼
					</span>
				</div>

				<form
					aria-hidden={mode === 'idle'}
					className='view view-form'
					onKeyDown={event => {
						if (event.key !== 'Escape') return
						cancelEditing(event)
					}}
					onSubmit={submitApiKey}
				>
					<input
						aria-invalid={isError}
						className='api-input'
						disabled={mode === 'validating'}
						onChange={event => {
							setInputValue(event.target.value)
							if (isError) setIsError(false)
						}}
						onKeyDown={event => {
							if (event.key !== 'Escape') return
							cancelEditing(event)
						}}
						placeholder='ENTER API KEY'
						ref={inputRef}
						type='password'
						value={inputValue}
					/>

					<div className='actions'>
						{mode === 'validating' ? (
							<span className='label-sub'>...</span>
						) : (
							<>
								<button
									aria-label='Cancel'
									className='btn-icon btn-cancel'
									onClick={cancelEditing}
									type='button'
								>
									✕
								</button>
								<button
									aria-label='Save API Key'
									className='btn-icon btn-save'
									type='submit'
								>
									✓
								</button>
							</>
						)}
					</div>
				</form>
			</div>
		</div>
	)
}

export default ApiStatusBadge
