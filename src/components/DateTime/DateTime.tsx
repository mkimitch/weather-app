import React, { FC } from 'react'

interface DateTimeProps {
	datetime: Date | string | number
	locales?:
		| Intl.UnicodeBCP47LocaleIdentifier
		| Intl.UnicodeBCP47LocaleIdentifier[]
	options?: Intl.DateTimeFormatOptions
}

const DateTime: FC<DateTimeProps> = ({
	datetime,
	locales = 'en-US',
	options = {},
}) => {
	if (!datetime) return null

	const date = new Date(datetime)
	const { timeZone } = options
	const formattedDate = date.toLocaleString(locales, { ...options })
	const fullDateTitle = date.toLocaleString(locales, {
		dateStyle: 'full',
		timeStyle: 'long',
		timeZone,
	})

	return (
		<time
			dateTime={date.toISOString()}
			title={fullDateTitle}
		>
			{formattedDate}
		</time>
	)
}

export default DateTime
