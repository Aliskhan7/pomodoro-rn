import React, { createContext, Dispatch, SetStateAction } from 'react'
import { View } from 'react-native'
import { IUser } from '@/types/user.interface'

export type TypeUserState = IUser | null

interface IContext {
	user: IUser
	setUser: Dispatch<SetStateAction<TypeUserState>>
}

export const AuthContext = createContext({} as IContext)
const AuthProvider = () => {
	return <View></View>
}

export default AuthProvider
