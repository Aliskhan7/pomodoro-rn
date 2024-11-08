export interface IPointProps {
	isSmallIndicator: boolean
	index: number
	currentSession: number
}

export interface IBreakPoint extends Omit<IPointProps, 'currentSession'> {
	currentBreak: number
}
