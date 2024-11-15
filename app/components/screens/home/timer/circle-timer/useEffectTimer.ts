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
		Pick<ITimerOptions, 'currentSession'> {
	confettiRef: RefObject<ConfettiCannon>
}

export const useEffectTimer = ({
	setTimer,
	currentSession,
	confettiRef
}: IUseEffectTimer) => {
	useEffect(() => {
		if (currentSession === sessionCount + 1) {
			confettiRef.current?.start()
			setTimer(prev => ({ ...prev, status: EnumStatus.COMPLETED }))
		}
	}, [currentSession])
}
