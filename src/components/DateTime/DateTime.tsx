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

	return (
		<time
			dateTime={date.toISOString()}
			title={date.toLocaleString(locales, {
				dateStyle: 'full',
				timeStyle: 'long',
			})}
		>
			<span aria-hidden>{date.toLocaleString(locales, options)}</span>
			<span className='sr-only'>
				{date.toLocaleString(locales, { dateStyle: 'full', timeStyle: 'full' })}
			</span>
		</time>
	)
}

export default DateTime
