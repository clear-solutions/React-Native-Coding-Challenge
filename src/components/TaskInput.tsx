import { TaskInputProps } from '@/types'
import { Box, Text } from '@/utils/theme'
import React, { FC } from 'react'
import { Pressable, TextInput } from 'react-native'

const TaskInput: FC<TaskInputProps> = ({
	placeholder,
	buttonText,
	value,
	onChangeText,
	onSubmitEditing,
}) => (
	<Box
		bg='lightGray'
		px='4'
		py='3.5'
		borderRadius='rounded-5xl'
		flexDirection='row'
		justifyContent='space-between'
	>
		<TextInput
			placeholder={placeholder}
			style={{
				paddingVertical: 8,
				paddingHorizontal: 8,
				fontSize: 16,
				width: '65%',
			}}
			maxLength={36}
			textAlignVertical='center'
			value={value}
			onChangeText={onChangeText}
			onSubmitEditing={onSubmitEditing}
		/>
		<Box flexDirection='row' alignItems='center'>
			<Pressable onPress={onSubmitEditing}>
				<Box
					bg='sky400'
					flexDirection='row'
					alignItems='center'
					p='2'
					borderRadius='rounded-xl'
				>
					<Text>{buttonText}</Text>
				</Box>
			</Pressable>
		</Box>
	</Box>
)

export default TaskInput
