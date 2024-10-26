import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { AppConstants } from '@/app.constants'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from '@/components/screens/home/timer/timer.interface'

const flowDuration = 1 * 60
const sessionCount = 7
const breakDuration = 1 * 60

const Timer = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.REST)

	return (
		<View className='justify-center flex-1'>
			<View className='self-center'>
				<Text>{status === EnumStatus.WORK ? '🔥' : '🙃'}</Text>
				<CountdownCircleTimer
					isPlaying={isPlaying}
					duration={flowDuration}
					colors={['#3a3578', '#664ff3']}
					colorsTime={[7, 0]}
					onComplete={() => setIsPlaying(false)}
					size={300}
					strokeWidth={15}
				>
					{({ remainingTime }) => {
						const hours = Math.floor(remainingTime / 3600)
						let minutes: string | number = Math.floor(
							(remainingTime % 3600) / 60
						)
						minutes = minutes < 10 ? '0' + minutes : minutes

						let seconds: string | number = remainingTime % 60
						seconds = seconds < 10 ? '0' + seconds : seconds

						return (
							<Text className='text-white text-6xl font-semibild mt-4'>{`${hours}:${minutes}:${seconds}`}</Text>
						)
					}}
				</CountdownCircleTimer>
				<View className='mt-14 flex-row items-center justify-center'>
					{Array.from(Array(sessionCount)).map((_, index) => (
						<View className='flex-row items-center' key={`point ${index}`}>
							<View className='w-5 h-5 bg-primary rounded-full' />
							{index + 1 !== sessionCount && (
								<View className='w-7 h-0.5 bg-primary' />
							)}
						</View>
					))}
				</View>
			</View>
			<Text>Timer</Text>
			<Pressable
				onPress={() => setIsPlaying(!isPlaying)}
				className={cn(
					'self-center mt-10 bg-primary w-[65px] h-[65px] rounded-full items-center justify-center',
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
		</View>
	)
}

export default Timer
