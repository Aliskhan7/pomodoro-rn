import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { AntDesign, Entypo, Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { AppConstants } from '@/app.constants'
import {
	EnumStatus,
	ITimerOptions
} from '@/components/screens/home/timer/timer.interface'
import CircleTimer from '@/components/screens/home/timer/CircleTimer'
import SessionIndicator from '@/components/screens/home/timer/session-indicator/SessionIndicator'
import Actions from '@/components/screens/home/timer/actions/Actions'

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
						currentBreak: 0
					}))
				}}
				className='opacity-40 self-end'
			>
				<Entypo name='ccw' size={30} color='#2c2b3c' />
			</Pressable>

			<View className='self-center items-center'>
				<CircleTimer setTimer={setTimer} timer={timer} />
				<SessionIndicator currentSession={timer.currentSession} currentBreak={timer.currentBreak}/>
				<Actions/>
		</View>
	)
}

export default Timer
