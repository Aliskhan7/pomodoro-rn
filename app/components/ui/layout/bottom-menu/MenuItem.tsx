import React, { FC } from 'react'
import { Pressable } from 'react-native'
import { IMenuItem, TypeNav } from './menu.interface'
import { AntDesign } from '@expo/vector-icons'
import { AppConstants } from '@/app.constants'

interface IMenuItemProps {
	item: IMenuItem
	nav: TypeNav
	currentRoute?: string
}

const MenuItem: FC<IMenuItemProps> = ({ currentRoute, nav, item }) => {
	const isActive = currentRoute === item.path
	return (
		<Pressable className='w-[24%] items-center' onPress={() => nav(item.path)}>
			<AntDesign
				name={item.iconName}
				size={26}
				color={isActive ? AppConstants.primary : '#8d8a97'}
			/>
		</Pressable>
	)
}

export default MenuItem
