import React, { FC } from 'react'
import { View } from 'react-native'
import cn from 'clsx'
import { sessionCount } from '@/components/screens/home/timer/time.constants'
import { ITimerOptions } from '@/components/screens/home/timer/timer.interface'
import Line from '@/components/screens/home/timer/session-indicator/Line'
import BreakPoint from '@/components/screens/home/timer/session-indicator/BreakPoint'

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
