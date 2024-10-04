import './Search.scss'

import { FC, FocusEvent, KeyboardEvent, useState } from 'react'

import { DirectGeocodingResponse } from '../../types/openWeatherAPI'
import Geolocation from '../Geolocation/Geolocation'
import useDebounce from '../../hooks/useDebounce'
import useGeocodingAPI from '../../hooks/useGeocodingAPI'
import { useNavigate } from 'react-router-dom'

const Search: FC = () => {
	const navigate = useNavigate()
	const [query, setQuery] = useState('')
	const [activeIndex, setActiveIndex] = useState<number>(-1)
	const [isOpen, setIsOpen] = useState(false)

	const debouncedQuery = useDebounce(query, 500)
	const { data, error, loading } = useGeocodingAPI(debouncedQuery)

	const handleSearchInputChange = (value: string) => {
		setQuery(value)
		setActiveIndex(-1)
		setIsOpen(true)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (data && data.length > 0) {
			switch (e.key) {
				case 'ArrowDown':
					setActiveIndex(prevIndex => (prevIndex + 1) % data.length)
					break
				case 'ArrowUp':
					setActiveIndex(
						prevIndex => (prevIndex - 1 + data.length) % data.length
					)
					break
				case 'Enter':
					if (activeIndex >= 0 && activeIndex < data.length) {
						selectLocation(data[activeIndex])
					}
					break
				case 'Escape':
					setIsOpen(false)
					break
				default:
					break
			}
		}
	}

	const selectLocation = ({
		country,
		lat,
		lon,
		name,
		state,
	}: DirectGeocodingResponse) => {
		navigate(`/weather/${lat}/${lon}`, {
			state: { name, state, country },
		})
		setIsOpen(false)
	}

	const handleBlur = (e: FocusEvent<HTMLFormElement>) => {
		setTimeout(() => setIsOpen(false), 200)
	}

	return (
		<section className='search'>
			<form
				onBlur={handleBlur}
				role='search'
			>
				<label
					className='sr-only'
					htmlFor='search'
				>
					Enter location
				</label>
				<div className='search-wrapper'>
					<input
						aria-activedescendant={
							activeIndex >= 0 ? `result-${activeIndex}` : undefined
						}
						aria-describedby='search-desc'
						aria-haspopup='listbox'
						autoComplete='off'
						id='search'
						onChange={e => handleSearchInputChange(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder='Enter location'
						role='searchbox'
						type='search'
						value={query}
					/>
					<Geolocation />
				</div>

				{error && <div>{error}</div>}
				{isOpen && (
					<ul
						id='popup'
						role='listbox'
					>
						{loading && query && <li className='ellipses'>Loading</li>}
						{data &&
							data.map(({ name, state, country, lat, lon }, index) => (
								<li
									aria-selected={activeIndex === index}
									id={`result-${index}`}
									key={`${lat}${lon}`}
									onClick={() =>
										selectLocation({ name, state, country, lat, lon })
									}
									role='option'
								>
									{country && (
										<span className={`fi fi-${country.toLowerCase()}`}></span>
									)}
									{[name, state, country].filter(Boolean).join(', ')}
								</li>
							))}
					</ul>
				)}
				<span
					className='sr-only'
					id='search-desc'
				>
					Search results will appear below
				</span>
			</form>
		</section>
	)
}

export default Search
