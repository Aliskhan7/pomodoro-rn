import React, { FC } from 'react'
import cn from 'clsx'
import { playShadow } from '@/components/screens/home/timer/actions/button-shadow'
import { Foundation } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import {
	ITimerOptions,
	ITimerProps
} from '@/components/screens/home/timer/timer.interface'

interface IPlayButton
	extends Omit<ITimerProps, 'timer'>,
		Pick<ITimerOptions, 'isPlaying'> {}

export const PlayButton: FC<IPlayButton> = ({ setTimer, isPlaying }) => {
	return (
		<Pressable
			onPress={() =>
				setTimer(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
			}
			className={cn(
				' bg-primary w-[65px] h-[65px] rounded-full items-center justify-center',
				{
					'pl-1.5': !isPlaying
				}
			)}
			style={playShadow}
		>
			<Foundation name={isPlaying ? 'pause' : 'play'} color='white' size={44} />
		</Pressable>
	)
}
