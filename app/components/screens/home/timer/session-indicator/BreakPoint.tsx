import React, { FC } from 'react'
import cn from 'clsx'
import { AntDesign } from '@expo/vector-icons'
import { View } from 'react-native'
import { sessionCount } from '@/components/screens/home/timer/time.constants'
import { IBreakPoint } from '@/components/screens/home/timer/session-indicator/session-indicator.interface'

const BreakPoint: FC<IBreakPoint> = ({
	index,
	isSmallIndicator,
	currentBreak
}) => {
	return (index + 1) % 2 === 0 && index + 1 !== sessionCount ? (
		<View
			className={cn(
				'absolute z-30 -top-4',
				isSmallIndicator ? 'left-[17px]' : 'left-[25px'
			)}
		>
			<AntDesign
				name='rest'
				size={isSmallIndicator ? 16 : 12}
				color={index / 2 <= currentBreak ? '#523fc0' : '#2c2b3c'}
			/>
		</View>
	) : null
}

export default BreakPoint
