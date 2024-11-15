import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import {
	EnumStatus,
	ITimerOptions
} from '@/components/screens/home/timer/timer.interface'
import SessionIndicator from '@/components/screens/home/timer/session-indicator/SessionIndicator'
import Actions from '@/components/screens/home/timer/actions/Actions'
import { sessionCount } from '@/components/screens/home/timer/time.constants'
import CircleTimer from '@/components/screens/home/timer/circle-timer/CircleTimer'

const isSmallIndicator = sessionCount > 7

const Timer = () => {
	const [timer, setTimer] = useState({
		isPlaying: false,
		status: EnumStatus.WORK,
		currentSession: 1,
		currentBreak: 0,
		key: 0
	} as ITimerOptions)

	return (
		<View className='justify-center flex-1'>
			<Pressable
				onPress={() => {
					setTimer(prev => ({
						...prev,
						key: 0,
						isPlaying: false,
						currentSession: 1,
						currentBreak: 0,
						status: EnumStatus.WORK
					}))
				}}
				className='opacity-40 self-end'
			>
				<Entypo name='ccw' size={30} color='#2c2b3c' />
			</Pressable>

			<View className='self-center items-center'>
				<CircleTimer setTimer={setTimer} timer={timer} />
				<SessionIndicator
					currentSession={timer.currentSession}
					currentBreak={timer.currentBreak}
				/>
				<Actions timer={timer} setTimer={setTimer} />
			</View>
		</View>
	)
}

export default Timer
