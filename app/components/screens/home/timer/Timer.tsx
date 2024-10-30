import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Entypo, Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { AppConstants } from '@/app.constants'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from '@/components/screens/home/timer/timer.interface'

const flowDuration = 1 * 60
const sessionCount = 7
const breakDuration = 1 * 60

const isSmallIndicator = sessionCount > 7

const Timer = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.REST)
	const [currentSession, setCurrentSession] = useState<number>(1)
	const [key, setKey] = useState(0)

	useEffect(() => {
		if (isPlaying && status === EnumStatus.REST) {
			setKey(prev => prev + 1)
		}
	}, [isPlaying])

	const isAllSessionsCompleted = currentSession === sessionCount

	return (
		<View className='justify-center flex-1'>
			<View className='self-center items-center'>
				<CountdownCircleTimer
					key={key}
					isPlaying={isPlaying}
					duration={flowDuration}
					colors={['#3a3578', '#664ff3']}
					colorsTime={[flowDuration, 0]}
					trailColor='#2f2f4c'
					onComplete={() => {
						setIsPlaying(false)
						setCurrentSession(prev => prev + 1)
						setStatus(EnumStatus.REST)

						if (isAllSessionsCompleted) {
							setStatus(EnumStatus.COMPLETED)
						}
					}}
					size={300}
					strokeWidth={15}
					onUpdate={remainingTime => {
						if (!!remainingTime) setStatus(EnumStatus.WORK)
					}}
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
								<Text className='text-white text-6xl font-semibild mt-4'>{`${minutes}:${seconds}`}</Text>
								<Text className='text-center text-2xl text-white mt-0.5'>
									{status === EnumStatus.WORK ? 'Work' : 'Rest'}
								</Text>
							</View>
						)
					}}
				</CountdownCircleTimer>
				<View className='mt-14 flex-row items-center justify-center'>
					{Array.from(Array(sessionCount)).map((_, index) => (
						<View className='flex-row items-center' key={`point ${index}`}>
							<View
								className={cn(
									'rounded-full border-[3px]',
									index + 1 === currentSession
										? `bg-[#1e1c2e] border-[#523fc0] ${isSmallIndicator ? 'w-[17px] h-[17px]' : 'w-[22px] h-[22px]'}`
										: `bg-[#2c2b3c] border-transparent ${isSmallIndicator ? 'w-[15px] h-[15px]' : 'w-5 h-5'}`,
									{
										'bg-primary opacity-70':
											index + 1 <= sessionCount && index !== currentSession
									}
								)}
							/>
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
			<View className='flex-row items-center justify-center  mt-10'>
				<Pressable onPress={() => {}}>
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
				<Pressable onPress={() => {}}>
					<Entypo name='chevron-right' size={30} color='#2c2b3c' />
				</Pressable>
			</View>
		</View>
	)
}

export default Timer
