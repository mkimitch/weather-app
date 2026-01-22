import './Alert.scss'

import { FC, HTMLAttributes, ReactNode } from 'react'

export type AlertVariant = 'error' | 'info' | 'success' | 'warning'

interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
	children: ReactNode
	title?: string
	variant?: AlertVariant
}

const getAlertRole = (variant: AlertVariant): 'alert' | 'status' =>
	variant === 'error' ? 'alert' : 'status'

const Alert: FC<AlertProps> = ({
	children,
	className,
	role,
	title,
	variant = 'error',
	...divProps
}) => {
	const classes = ['alert', `alert--${variant}`, className]
		.filter(Boolean)
		.join(' ')

	const computedRole = role ?? getAlertRole(variant)

	return (
		<div
			{...divProps}
			className={classes}
			role={computedRole}
		>
			{title && <div className='alert__title'>{title}</div>}
			<div className='alert__content'>{children}</div>
		</div>
	)
}

export default Alert
