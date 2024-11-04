import React, { Dispatch, FC, SetStateAction, useRef } from 'react'
import {
	EnumStatus,
	ITimerOptions
} from '@/components/screens/home/timer/timer.interface'
import { Text, View } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {
	breakDuration,
	flowDuration,
	sessionCount
} from '@/components/screens/home/timer/time.constants'

const CircleTimer: FC<{
	timer: ITimerOptions
	setTimer: Dispatch<SetStateAction<ITimerOptions>>
}> = ({ timer: { key, isPlaying, status, currentSession }, setTimer }) => {
	const isAllSessionsCompleted = currentSession === sessionCount
	const confettiRef = useRef<ConfettiCannon>(null)

	return (
		<CountdownCircleTimer
			key={key}
			isPlaying={isPlaying}
			duration={status === EnumStatus.REST ? breakDuration : flowDuration}
			colors={['#3a3578', '#664ff3']}
			colorsTime={[
				status === EnumStatus.REST ? breakDuration : flowDuration,
				0
			]}
			trailColor='#2f2f4c'
			onComplete={() => {
				setTimer(prev => ({ ...prev, isPlaying: false }))
				// setCurrentSession(prev => prev + 1)
				// setStatus(EnumStatus.REST)

				if (isAllSessionsCompleted) {
					confettiRef.current?.start()
					setTimer(prev => ({ ...prev, status: EnumStatus.COMPLETED }))
				}

				setTimer(prev => ({ ...prev, key: prev.key + 1 }))

				if (status === EnumStatus.REST) {
					setTimer(prev => ({
						...prev,
						status: EnumStatus.REST,
						currentSession: prev.currentSession + 1
					}))
				}

				if (sessionCount % 2 === 0) {
					setTimer(prev => ({
						...prev,
						status: EnumStatus.REST,
						currentBreak: prev.currentBreak + 1
					}))
				} else {
					setTimer(prev => ({
						...prev,
						currentSession: prev.currentSession + 1
					}))
				}
			}}
			size={300}
			strokeWidth={15}
			// onUpdate={remainingTime => {
			// 	if (!!remainingTime) setStatus(EnumStatus.WORK)
			// }}
		>
			{({ remainingTime }) => {
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
						<Text className='text-center text-2xl text-white mt-0.5'>
							{status}
						</Text>
					</View>
				)
			}}
		</CountdownCircleTimer>
	)
}

export default CircleTimer
