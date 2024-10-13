import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { TypeNav } from '@/components/ui/layout/bottom-menu/menu.interface'
import { menuData } from '@/components/ui/layout/bottom-menu/menu.data'
import MenuItem from '@/components/ui/layout/bottom-menu/MenuItem'

interface IBottomMenu {
	nav: TypeNav
	currentRoute?: string
}
const BottomMenu: FC<IBottomMenu> = ({ currentRoute, nav }) => {
	return (
		<View>
			{menuData.map(item => (
				<MenuItem />
			))}
			<Text>Bottom</Text>
		</View>
	)
}

export default BottomMenu
