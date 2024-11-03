import React, { useRef, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { AntDesign, Entypo, Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { AppConstants } from '@/app.constants'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from '@/components/screens/home/timer/timer.interface'
import ConfettiCannon from 'react-native-confetti-cannon'

const flowDuration = 1 * 60
const sessionCount = 7
const breakDuration = 1 * 60

const isSmallIndicator = sessionCount > 7

const Timer = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.REST)
	const [currentSession, setCurrentSession] = useState<number>(1)
	const [currentBreak, setCurrentBreak] = useState<number>(0)
	const [key, setKey] = useState(0)

	// useEffect(() => {
	// 	if (isPlaying && status === EnumStatus.REST) {
	// 		setKey(prev => prev + 1)
	// 	}
	// }, [isPlaying])

	const isAllSessionsCompleted = currentSession === sessionCount

	const confettiRef = useRef<ConfettiCannon>(null)

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
						setIsPlaying(false)
						// setCurrentSession(prev => prev + 1)
						// setStatus(EnumStatus.REST)

						if (isAllSessionsCompleted) {
							confettiRef.current?.start()
							setStatus(EnumStatus.COMPLETED)
						}

						setKey(prev => prev + 1)

						if (status === EnumStatus.REST) {
							setStatus(EnumStatus.WORK)
							setCurrentSession(prev => prev + 1)
						}

						if (sessionCount % 2 === 0) {
							setStatus(EnumStatus.REST)
							setCurrentBreak(prev => prev + 1)
						} else {
							setCurrentSession(prev => prev + 1)
						}
					}}
					size={300}
					strokeWidth={15}
					// onUpdate={remainingTime => {
					// 	if (!!remainingTime) setStatus(EnumStatus.WORK)
					// }}
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
								<ConfettiCannon
									autoStart={false}
									ref={confettiRef}
									count={200}
									origin={{ x: -10, y: 0 }}
								/>
								<Text className='text-white text-6xl font-semibild mt-4'>{`${minutes}:${seconds}`}</Text>
								<Text className='text-center text-2xl text-white mt-0.5'>
									{status}
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
