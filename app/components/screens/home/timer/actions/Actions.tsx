import React, { FC } from 'react'
import { View } from 'react-native'
import { ITimerProps } from '@/components/screens/home/timer/timer.interface'
import Arrow from '@/components/screens/home/timer/actions/Arrow'
import { PlayButton } from '@/components/screens/home/timer/actions/PlayButton'

const Actions: FC<ITimerProps> = ({
	setTimer,
	timer: { currentSession, isPlaying }
}) => {
	return (
		<View className='flex-row items-center justify-center mt-14'>
			<Arrow
				direction='left'
				setTimer={setTimer}
				currentSession={currentSession}
			/>
			<PlayButton setTimer={setTimer} isPlaying={isPlaying} />
			<Arrow
				direction='right'
				setTimer={setTimer}
				currentSession={currentSession}
			/>
		</View>
	)
}

export default Actions
