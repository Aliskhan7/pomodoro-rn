import {
	EnumStatus,
	ITimerOptions,
	ITimerProps
} from '@/components/screens/home/timer/timer.interface'
import { sessionCount } from '@/components/screens/home/timer/time.constants'
import { RefObject, useCallback } from 'react'
import ConfettiCannon from 'react-native-confetti-cannon'

interface IUserTimer
	extends Pick<ITimerProps, 'setTimer'>,
		Pick<ITimerOptions, 'currentSession'> {
	confettiRef: RefObject<ConfettiCannon>
}

export const useTimer = ({
	setTimer,
	currentSession,
	confettiRef
}: IUserTimer) => {
	const completeSession = useCallback(() => {
		const isAllSessionsCompleted = currentSession === sessionCount
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
	}, [currentSession, status])
	return { completeSession }
}
