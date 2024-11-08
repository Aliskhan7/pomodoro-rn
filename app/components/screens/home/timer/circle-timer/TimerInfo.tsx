import React, { FC, RefObject } from 'react'
import {
	EnumStatus,
	ITimerProps
} from '@/components/screens/home/timer/timer.interface'
import { flowDuration } from '@/components/screens/home/timer/time.constants'
import { Text, View } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'

interface ITimerInfo extends Pick<ITimerProps, 'setTimer'> {
	remainingTime: number
	confettiRef: RefObject<ConfettiCannon>
}

const TimerInfo: FC<ITimerInfo> = ({ remainingTime, confettiRef }) => {
	let minutes: string | number = Math.floor(remainingTime / 60)
	let seconds: string | number = remainingTime % 60

	if (status === EnumStatus.REST) {
		minutes = Math.floor(remainingTime / 60)
		seconds = flowDuration % 60
	}

	minutes = minutes < 10 ? '0' + minutes : minutes
	seconds = seconds < 10 ? '0' + seconds : seconds

	return (
		<View className='mt-5'>
			<ConfettiCannon
				autoStart={false}
				ref={confettiRef}
				count={200}
				origin={{ x: -10, y: 0 }}
			/>
			<Text className='text-white text-6xl font-semibild mt-4'>{`${minutes}:${seconds}`}</Text>
			<Text className='text-center text-2xl text-white mt-0.5'>{status}</Text>
		</View>
	)
}

export default TimerInfo
