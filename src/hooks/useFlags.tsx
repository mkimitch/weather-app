import { useEffect, useState } from 'react'

const useFlags = (countries: string[]) => {
	const [flagIcons, setFlagIcons] = useState<{ [key: string]: string }>({})

	const loadFlagIcon = async (countryCode: string) => {
		if (!countryCode) return
		try {
			const flagModule = await import(
				`flag-icons/flags/4x3/${countryCode.toLowerCase()}.svg`
			)
			setFlagIcons(prev => ({ ...prev, [countryCode]: flagModule.default }))
		} catch (error) {
			console.error('Error loading flag icon for', countryCode, error)
		}
	}

	useEffect(() => {
		countries.forEach(country => {
			if (country && !flagIcons[country]) {
				loadFlagIcon(country)
			}
		})
	}, [countries])

	return flagIcons
}

export default useFlags
