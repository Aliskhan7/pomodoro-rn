import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TypeRootStackParamList } from './navigation.types'
import { useAuth } from '@/hooks/useAuth'
import { routes } from './routes'
import Auth from '@/components/screens/auth/Auth'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()
const PrivateNavigation: FC = () => {
	const { user } = useAuth()
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: '#1e1c2e'
				}
			}}
		>
			{user ? (
				routes.map(route => {
					return <Stack.Screen key={route.name} {...route} />
				})
			) : (
				<Stack.Screen name='Auth' component={Auth} />
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigation
