import React, { FC } from 'react'
import { Entypo } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import {
	ITimerOptions,
	ITimerProps
} from '@/components/screens/home/timer/timer.interface'
import { sessionCount } from '@/components/screens/home/timer/time.constants'

interface IArrow
	extends Omit<ITimerProps, 'timer'>,
		Pick<ITimerOptions, 'currentSession'> {
	direction: 'left' | 'right'
}

const Arrow: FC<IArrow> = ({ setTimer, direction, currentSession }) => {
	return (
		<Pressable
			onPress={() => {
				if (currentSession !== 1 && direction === 'left') {
					setTimer(prev => ({
						...prev,
						currentSession: prev.currentSession - 1,
						key: prev.key - 1,
						isPlaying: false,
						currentBreak:
							currentSession % 2 ? prev.currentBreak - 1 : prev.currentBreak
					}))
				}

				if (currentSession !== sessionCount + 1 && direction === 'right') {
					setTimer(prev => ({
						...prev,
						currentSession: prev.currentSession + 1,
						key: prev.key + 1,
						isPlaying: false,
						currentBreak:
							currentSession % 2 === 0
								? prev.currentBreak + 1
								: prev.currentBreak
					}))
				}
			}}
			className='opacity-50'
		>
			<Entypo name={`chevron-${direction}`} size={30} color='#2c2b3c' />
		</Pressable>
	)
}

export default Arrow
