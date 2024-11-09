import React, { FC, useRef } from 'react'
import {
	EnumStatus,
	ITimerProps
} from '@/components/screens/home/timer/timer.interface'
import ConfettiCannon from 'react-native-confetti-cannon'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {
	breakDuration,
	flowDuration,
	sessionCount
} from '@/components/screens/home/timer/time.constants'
import TimerInfo from '@/components/screens/home/timer/circle-timer/TimerInfo'

const CircleTimer: FC<ITimerProps> = ({
	timer: { key, isPlaying, status, currentSession },
	setTimer
}) => {
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
			{({ remainingTime }) => (
				<TimerInfo
					status={status}
					confettiRef={confettiRef}
					remainingTime={remainingTime}
				/>
			)}
		</CountdownCircleTimer>
	)
}

export default CircleTimer
