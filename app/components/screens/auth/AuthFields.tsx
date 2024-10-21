import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { validEmail } from '@/components/screens/auth/email.rgx'
import { Text, TextInput, View } from 'react-native'
import cn from 'clsx'
import { IAuthFormData } from '@/types/auth.interface'

const AuthFields: FC<{ control: Control<IAuthFormData> }> = ({ control }) => {
	return (
		<>
			<Controller
				name='email'
				control={control}
				rules={{
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Your Email is invalid'
					}
				}}
				render={({
					field: { value, onChange, onBlur },
					fieldState: { error }
				}) => (
					<>
						<View
							className={cn(
								'rounded bg-[#272541] border pb-4 pt-2.5 px-4 my-2',
								!!error ? 'border-red-500' : 'border-transparent'
							)}
						>
							<TextInput
								onChangeText={onChange}
								autoCapitalize='none'
								value={value}
								onBlur={onBlur}
								placeholder='Enter email'
								className='text-white text-lg'
							/>
						</View>
						{error && <Text className='text-red-500'> {error?.message}</Text>}
					</>
				)}
			/>

			<Controller
				name='email'
				control={control}
				rules={{
					required: 'Password is required',
					minLength: {
						value: 6,
						message: 'Password must be min 6 symbols'
					}
				}}
				render={({
					field: { value, onChange, onBlur },
					fieldState: { error }
				}) => (
					<>
						<View
							className={cn(
								'rounded bg-[#272541] border pb-4 pt-2.5 px-4 my-2',
								!!error ? 'border-red-500' : 'border-transparent'
							)}
						>
							<TextInput
								onChangeText={onChange}
								autoCapitalize='none'
								value={value}
								onBlur={onBlur}
								placeholder='Enter password'
								className='text-white text-lg'
								secureTextEntry
							/>
						</View>
						{error && <Text className='text-red-500'> {error?.message}</Text>}
					</>
				)}
			/>
		</>
	)
}

export default AuthFields
