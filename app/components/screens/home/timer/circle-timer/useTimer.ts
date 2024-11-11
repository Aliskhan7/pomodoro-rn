import { ITimerProps } from '@/components/screens/home/timer/timer.interface'
import { useCallback } from 'react'

interface IUserTimer extends Pick<ITimerProps, 'setTimer'> {}

export const useTimer = ({ setTimer }: IUserTimer) => {
	const completeSession = useCallback(() => {
		setTimer(prev => ({ ...prev, isPlaying: false, key: prev.key + 1 }))
		setTimer(prev => ({ ...prev, key: prev.key + 1 }))
	}, [])
	return { completeSession }
}
