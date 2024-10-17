import React, { useState } from 'react'
import { View } from 'react-native'
import { useForm } from 'react-hook-form'
import { IAuthFormData } from '@/types/auth.interface'

const Auth = () => {
	const [isReg, setIsReg] = useState(false)

	const { control, reset, handleSubmit } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	return <View></View>
}

export default Auth
