import React, { FC } from 'react'
import { ActivityIndicator } from 'react-native'
import { AppConstants } from '@/app.constants'

const Loader: FC = () => {
	return <ActivityIndicator color={AppConstants.primary} size='large' />
}

export default Loader
