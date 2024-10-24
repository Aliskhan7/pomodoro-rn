import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { AppConstants } from '@/app.constants'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const Timer = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	return (
		<View className='justify-center flex-1'>
			<View className='self-center'>
				<CountdownCircleTimer
					isPlaying={isPlaying}
					duration={7}
					colors={['#3a3578', '#664ff3']}
					colorsTime={[7, 0]}
					onComplete={() => setIsPlaying(false)}
					size={300}
					strokeWidth={15}
				>
					{({ remainingTime }) => <Text>{remainingTime}</Text>}
				</CountdownCircleTimer>
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
