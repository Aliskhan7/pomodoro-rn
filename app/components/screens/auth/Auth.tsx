import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthFormData } from '@/types/auth.interface'
import { useAuth } from '@/hooks/useAuth'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import Loader from '@/components/ui/layout/Loader'
import Button from '@/components/ui/Button'

const Auth = () => {
	const [isReg, setIsReg] = useState(false)

	const { control, reset, handleSubmit } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	const { setUser } = useAuth()

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		setUser({
			_id: '',
			...data
		})
	}

	const isLoading = false

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View className='items-center justify-center flex-1'>
				<View className='w-3/4'>
					<Text className='text-white text-5xl font-bold text-center'>
						{isReg ? 'Sign up' : 'Sign in'}
					</Text>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<Button>Let's go</Button>
						</>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Auth
