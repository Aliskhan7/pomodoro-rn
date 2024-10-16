import { Feather } from '@expo/vector-icons'
import { TypeRootStackParamList } from '@/navigation/navigation.types'

export interface IMenuItem {
	iconName: keyof typeof Feather.glyphMap
	path: keyof TypeRootStackParamList
}

export type TypeNav = (
	name: 'Auth' | 'Home' | 'Settings' | 'Profile' | 'Statistics'
) => void
