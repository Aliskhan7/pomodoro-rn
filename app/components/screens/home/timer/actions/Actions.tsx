import React from 'react'
import { Pressable, View } from 'react-native'
import { Entypo, Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { AppConstants } from '@/app.constants'

const Actions = () => {
	return (
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
	)
}

export default Actions
