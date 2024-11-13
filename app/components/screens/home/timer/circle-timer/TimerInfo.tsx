import React, { FC, RefObject } from 'react'
import { ITimerOptions } from '@/components/screens/home/timer/timer.interface'
import { Text, View } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'
import { useTimerTime } from '@/components/screens/home/timer/circle-timer/useTimerTime'

interface ITimerInfo extends Pick<ITimerOptions, 'status'> {
	remainingTime: number
	confettiRef: RefObject<ConfettiCannon>
}

const formatTime = (number: number) => (number < 10 ? '0' + number : number)

const TimerInfo: FC<ITimerInfo> = ({ remainingTime, confettiRef, status }) => {
	const { seconds, minutes } = useTimerTime(remainingTime, status)
	return (
		<View className='mt-5'>
			<ConfettiCannon
				autoStart={false}
				ref={confettiRef}
				count={200}
				origin={{ x: -10, y: 0 }}
			/>
			<Text className='text-white text-6xl font-semibild mt-4'>{`${formatTime(minutes)}:${formatTime(seconds)}`}</Text>
			<Text className='text-center text-2xl text-white mt-0.5'>{status}</Text>
		</View>
	)
}

export default TimerInfo
