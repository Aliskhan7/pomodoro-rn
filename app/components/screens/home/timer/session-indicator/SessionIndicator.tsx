import React, { FC } from 'react'
import { View } from 'react-native'
import cn from 'clsx'
import { AntDesign } from '@expo/vector-icons'
import { sessionCount } from '@/components/screens/home/timer/time.constants'
import { ITimerOptions } from '@/components/screens/home/timer/timer.interface'

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

					{(index + 1) % 2 === 0 && index + 1 !== sessionCount && (
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
					)}

					{index + 1 !== sessionCount && (
						<View
							className={cn(
								'h-0.5 bg-[#2c2b3c]',
								{
									'bg-primary opacity-70': index + 2 <= currentSession
								},
								isSmallIndicator ? 'w-5' : 'w-7'
							)}
						/>
					)}
				</View>
			))}
		</View>
	)
}

export default SessionIndicator
