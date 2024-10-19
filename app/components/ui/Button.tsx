import React, { FC, PropsWithChildren } from 'react'
import { Pressable, Text } from 'react-native'
import cn from 'clsx'

interface IButton {}

const Button: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className
}) => {
	return (
		<Pressable
			className={cn('self-center mt-3 bg-primary px-8 py-3 rounded', className)}
		>
			<Text className='font-semibold text-white text-xl'>{children}</Text>{' '}
		</Pressable>
	)
}

export default Button
