import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import BottomTabNavigator from './BottomTabNavigator'

const Stack = createNativeStackNavigator()

const Navigation: FC = () => {
	return (
		<Stack.Navigator initialRouteName='Root'>
			<Stack.Screen
				name='Root'
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	)
}

export default Navigation
