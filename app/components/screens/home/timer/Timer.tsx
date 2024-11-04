import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { AntDesign, Entypo, Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { AppConstants } from '@/app.constants'
import {
	EnumStatus,
	ITimerOptions
} from '@/components/screens/home/timer/timer.interface'
import CircleTimer from '@/components/screens/home/timer/CircleTimer'

const isSmallIndicator = sessionCount > 7

const Timer = () => {
	const [timer, setTimer] = useState({
		isPlaying: false,
		status: EnumStatus.WORK,
		currentSession: 1,
		currentBreak: 0,
		key: 0
	} as ITimerOptions)

	return (
		<View className='justify-center flex-1'>
			<Pressable
				onPress={() => {
					setKey(0)
					setIsPlaying(false)
					setCurrentSession(1)
					setCurrentBreak(0)
				}}
				className='opacity-40 self-end'
			>
				<Entypo name='ccw' size={30} color='#2c2b3c' />
			</Pressable>

			<View className='self-center items-center'>
				<CircleTimer />
				<View className='mt-14 flex-row items-center justify-center'>
					{Array.from(Array(sessionCount)).map((_, index) => (
						<View className='flex-row items-center' key={`point ${index}`}>
							<View
								className={cn(
									'rounded-full border-[3px]',
									index + 1 === currentSession
										? 'bg-[#1e1c2e] border-[#523fc0]'
										: 'bg-[#2c2b3c] border-transparent',
									{
										'bg-primary opacity-70':
											index + 1 <= sessionCount && index + 1 !== currentSession
									},
									isSmallIndicator ? 'w-[15px] h-[15px]' : 'w-5 h-5'
								)}
							/>

							{(index + 1) % 2 === 0 && index + 1 !== sessionCount && (
								<View
									className={cn(
										'absolute z-30 -top-4',
										isSmallIndicator ? 'left-[17px]' : 'left-[25px'
									)}
								>
									<AntDesign
										name='rest'
										size={isSmallIndicator ? 16 : 12}
										color={index / 2 <= currentBreak ? '#523fc0' : '#2c2b3c'}
									/>
								</View>
							)}

							{index + 1 !== sessionCount && (
								<View
									className={cn(
										'h-0.5 bg-[#2c2b3c]',
										{
											'bg-primary opacity-70': index + 2 <= currentSession
										},
										isSmallIndicator ? 'w-5' : 'w-7'
									)}
								/>
							)}
						</View>
					))}
				</View>
			</View>

			<View className='flex-row items-center justify-center mt-14'>
				<Pressable
					onPress={() => {
						if (currentSession !== 1) {
							setCurrentSession(prev => prev - 1)
							setKey(prev => prev - 1)
							setIsPlaying(false)

							currentSession % 2 && setCurrentBreak(prev => prev - 1)
						}
					}}
					className='opacity-50'
				>
					<Entypo name='chevron-left' size={30} color='#2c2b3c' />
				</Pressable>

				<Pressable
					onPress={() => setIsPlaying(!isPlaying)}
					className={cn(
						' bg-primary w-[65px] h-[65px] rounded-full items-center justify-center',
						{
							'pl-1.5': !isPlaying
						}
					)}
					style={{
						shadowColor: AppConstants.primary,
						shadowOffset: {
							width: 0,
							height: 3
						},
						shadowOpacity: 0.6,
						shadowRadius: 8,

						elevation: 20
					}}
				>
					<Foundation
						name={isPlaying ? 'pause' : 'play'}
						color='white'
						size={44}
					/>
				</Pressable>
				<Pressable
					onPress={() => {
						if (currentSession !== sessionCount + 1) {
							setCurrentSession(prev => prev + 1)
							setKey(prev => prev + 1)
							setIsPlaying(false)
							currentSession % 2 === 0 && setCurrentBreak(prev => prev + 1)
						}
					}}
					className='opacity-50'
				>
					<Entypo name='chevron-right' size={30} color='#2c2b3c' />
				</Pressable>
			</View>
		</View>
	)
}

export default Timer
