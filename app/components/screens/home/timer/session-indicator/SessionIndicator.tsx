import React, { FC } from 'react'
import { View } from 'react-native'
import { sessionCount } from '@/components/screens/home/timer/time.constants'
import { ITimerOptions } from '@/components/screens/home/timer/timer.interface'
import Line from '@/components/screens/home/timer/session-indicator/Line'
import BreakPoint from '@/components/screens/home/timer/session-indicator/BreakPoint'
import WorkPoint from '@/components/screens/home/timer/session-indicator/WorkPoint'

interface ISessionIndicator
	extends Pick<ITimerOptions, 'currentBreak' | 'currentSession'> {}

const SessionIndicator: FC<ISessionIndicator> = ({
	currentSession,
	currentBreak
}) => {
	const isSmallIndicator = sessionCount > 7
	return (
		<View className='mt-14 flex-row items-center justify-center'>
			{Array.from(Array(sessionCount)).map((_, index) => (
				<View className='flex-row items-center' key={`point ${index}`}>
					<WorkPoint
						isSmallIndicator={isSmallIndicator}
						index={index}
						currentSession={currentSession}
					/>

					<BreakPoint
						isSmallIndicator={isSmallIndicator}
						index={index}
						currentBreak={currentBreak}
					/>

					<Line
						currentSession={currentSession}
						isSmallIndicator={isSmallIndicator}
						index={index}
					/>
				</View>
			))}
		</View>
	)
}

export default SessionIndicator
