import React, { FC, useEffect, useState } from 'react'
import { View } from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { useNavigationContainerRef } from '@react-navigation/native'

const Navigation: FC = () => {
	const { user } = useAuth()

	const [currentRoute, setCurrentRoute] = useState<string | undefined>(
		undefined
	)

	const navRef = useNavigationContainerRef()

	useEffect(() => {
		setCurrentRoute(navRef.getCurrentRoute()?.name)

		const listener = navRef.addListener('state', () => {
			setCurrentRoute(navRef.getCurrentRoute()?.name)
		})
		return () => {
			navRef.removeListener('state', listener)
		}
	}, [])

	return <View></View>
}

export default Navigation
