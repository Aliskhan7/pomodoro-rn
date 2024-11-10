import React, { FC, useRef } from 'react'
import {
	EnumStatus,
	ITimerProps
} from '@/components/screens/home/timer/timer.interface'
import ConfettiCannon from 'react-native-confetti-cannon'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {
	breakDuration,
	flowDuration
} from '@/components/screens/home/timer/time.constants'
import TimerInfo from '@/components/screens/home/timer/circle-timer/TimerInfo'
import { useTimer } from '@/components/screens/home/timer/circle-timer/useTimer'

const CircleTimer: FC<ITimerProps> = ({
	timer: { key, isPlaying, status, currentSession },
	setTimer
}) => {
	const confettiRef = useRef<ConfettiCannon>(null)

	const { completeSession } = useTimer({
		setTimer,
		currentSession,
		confettiRef
	})

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
			onComplete={completeSession}
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
