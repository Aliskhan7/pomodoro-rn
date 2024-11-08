import React, { FC } from 'react'
import cn from 'clsx'
import { sessionCount } from '@/components/screens/home/timer/time.constants'
import { View } from 'react-native'
import { IPointProps } from '@/components/screens/home/timer/session-indicator/session-indicator.interface'

const WorkPoint: FC<IPointProps> = ({
	currentSession,
	index,
	isSmallIndicator
}) => {
	return (
		<View
			className={cn(
				'rounded-full border-[3px]',
				index + 1 === currentSession
					? 'bg-[#1e1c2e] border-[#523fc0]'
					: 'bg-[#2c2b3c] border-transparent',
				{
					'bg-primary opacity-70':
						index + 1 <= sessionCount && index + 1 !== currentSession
				},
				isSmallIndicator ? 'w-[15px] h-[15px]' : 'w-5 h-5'
			)}
		/>
	)
}

export default WorkPoint
