import useCurrentDateTime from './useCurrentDateTime'

interface FormatOptions {
	monthFormat?: 'long' | 'short' | 'numeric'
	hourFormat?: '12' | '24'
}

const useFormattedDateTime = (options: FormatOptions = {}) => {
	const { monthFormat = 'long', hourFormat = '12' } = options
	const dateTime = useCurrentDateTime()

	const getPeriod = (hours: number) => (hours >= 12 ? 'pm' : 'am')

	const formatDateTime = (date: Date) => {
		const hours = date.getHours()
		const formattedHour = hourFormat === '12' ? hours % 12 || 12 : hours

		return {
			day: date.getDate(),
			hour: formattedHour,
			minute: date.getMinutes(),
			month: date.toLocaleString('default', { month: monthFormat }),
			period: hourFormat === '12' ? getPeriod(hours) : '',
			second: date.getSeconds(),
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			year: date.getFullYear(),
		}
	}

	return formatDateTime(dateTime)
}

export default useFormattedDateTime
