import { RefObject, useEffect } from 'react'
import { sessionCount } from '@/components/screens/home/timer/time.constants'
import {
	EnumStatus,
	ITimerOptions,
	ITimerProps
} from '@/components/screens/home/timer/timer.interface'
import ConfettiCannon from 'react-native-confetti-cannon'

interface IUseEffectTimer
	extends Pick<ITimerProps, 'setTimer'>,
		Pick<ITimerOptions, 'currentSession' | 'status'> {
	confettiRef: RefObject<ConfettiCannon>
}

export const useEffectTimer = ({
	setTimer,
	currentSession,
	confettiRef,
	status
}: IUseEffectTimer) => {
	useEffect(() => {
		if (currentSession === sessionCount) {
			confettiRef.current?.start()
			setTimer(prev => ({ ...prev, status: EnumStatus.COMPLETED }))
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
	}, [currentSession])

	useEffect(() => {
		if (status === EnumStatus.REST) {
			setTimer(prev => ({
				...prev,
				status: EnumStatus.REST,
				currentSession: prev.currentSession + 1
			}))
		}
	}, [status])
}
