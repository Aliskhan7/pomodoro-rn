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
import { useEffectTimer } from '@/components/screens/home/timer/circle-timer/useEffectTimer'

const CircleTimer: FC<ITimerProps> = ({
	timer: { key, isPlaying, status, currentSession },
	setTimer
}) => {
	const confettiRef = useRef<ConfettiCannon>(null)

	useEffectTimer({ confettiRef, currentSession, status, setTimer })

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
				setTimer(prev => ({ ...prev, isPlaying: false, key: prev.key + 1 }))
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
