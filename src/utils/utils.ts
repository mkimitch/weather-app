const fahrenheitToCelsius = (f: number): number => (f - 32) * (5 / 9)

const getCssCustomPropertyValue = (cssVariable: string): string | null => {
	const htmlElement = document.querySelector('html')
	if (!htmlElement) {
		return null
	}
	return getComputedStyle(htmlElement).getPropertyValue(cssVariable) ?? null
}

export { fahrenheitToCelsius, getCssCustomPropertyValue }
