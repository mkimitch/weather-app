import { useEffect, useState } from 'react'

const useCurrentDateTime = (): Date => {
	const [dateTime, setDateTime] = useState(() => new Date())

	useEffect(() => {
		const timer = setInterval(() => {
			setDateTime(prev => {
				const now = new Date()
				return prev.getSeconds() !== now.getSeconds() ? now : prev
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	return dateTime
}

export default useCurrentDateTime
