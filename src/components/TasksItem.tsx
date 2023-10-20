import React, { FC } from 'react'

import { Pressable } from 'react-native'

import { ITask } from '@/types'
import theme, { AnimatedBox, Box, Text } from '@/utils/theme'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import {
	FadeInLeft,
	FadeInRight,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

interface TaskProps {
	task: ITask
	toggleTaskStatus: (taskId: number, type: 'delete' | 'toggle') => void
}

const TaskItem: FC<TaskProps> = ({ task, toggleTaskStatus }) => {
	const offset = useSharedValue(0.8)
	const checkmarkIconSize = useSharedValue(0.8)

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ scale: withSpring(offset.value) }],
		}
	})

	const checkMarkIconStyles = useAnimatedStyle(() => {
		return {
			transform: [{ scale: withSpring(checkmarkIconSize.value) }],
			opacity: task.completed ? offset.value : 0,
		}
	})

	const handleToggleTaskStatus = () => {
		toggleTaskStatus(task.id, 'toggle')
		console.log('Toggling task:', task)
	}

	const deleteTask = () => {
		toggleTaskStatus(task.id, 'delete')
		console.log('Deleting task:', task)
	}

	return (
		<AnimatedBox entering={FadeInRight} exiting={FadeInLeft}>
			<Box
				p='3.5'
				bg='lightGray'
				borderRadius='rounded-5xl'
				flexDirection='row'
				alignItems='center'
				justifyContent='space-between'
				flexWrap='wrap'
			>
				<Box flexDirection='row' alignItems='center'>
					<AnimatedBox
						style={[animatedStyles]}
						flexDirection='row'
						alignItems='center'
					>
						<Pressable onPress={handleToggleTaskStatus}>
							<Box
								height={26}
								width={26}
								bg={task.completed ? 'gray9' : 'gray300'}
								borderRadius='rounded-xl'
								alignItems='center'
								justifyContent='center'
							>
								{task.completed && (
									<AnimatedBox style={[checkMarkIconStyles]}>
										<Ionicons name='ios-checkmark' size={20} color='white' />
									</AnimatedBox>
								)}
							</Box>
						</Pressable>
					</AnimatedBox>
					<Box px='3' flex={1}>
						<Text variant='textBase'>{task.title}</Text>
					</Box>

					<Pressable onPress={deleteTask}>
						<MaterialCommunityIcons
							name='delete'
							size={24}
							color={theme.colors.rose500}
						/>
					</Pressable>
				</Box>
			</Box>
		</AnimatedBox>
	)
}

export default TaskItem
