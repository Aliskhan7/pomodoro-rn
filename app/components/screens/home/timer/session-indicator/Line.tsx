import React, { FC } from 'react'
import { View } from 'react-native'
import cn from 'clsx'
import { sessionCount } from '@/components/screens/home/timer/time.constants'
import { IPointProps } from '@/components/screens/home/timer/session-indicator/session-indicator.interface'

const Line: FC<IPointProps> = ({ currentSession, index, isSmallIndicator }) => {
	if (index + 1 !== sessionCount) return null
	return (
		<View
			className={cn(
				'h-0.5 bg-[#2c2b3c]',
				{
					'bg-primary opacity-70': index + 2 <= currentSession
				},
				isSmallIndicator ? 'w-5' : 'w-7'
			)}
		/>
	)
}

export default Line
