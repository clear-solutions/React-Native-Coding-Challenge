import { ITask } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const TODOS_STORAGE_KEY = 'todos'

export const fetchInitialData = createAsyncThunk<ITask[]>(
	'todos/fetchInitialData',
	async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos')
		if (!response.ok) {
			throw new Error('Failed to fetch initial data')
		}
		const data = await response.json()
		const storageData = await AsyncStorage.getItem(TODOS_STORAGE_KEY)

		if (storageData) {
			return JSON.parse(storageData)
		}

		return data
	}
)

const initialState: ITask[] = []

export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.unshift(action.payload)
			saveTodosToStorage(state)
		},
		toggleTodo: (state, action) => {
			const todo = state.find(task => task.id === action.payload.id)
			if (todo) {
				todo.completed = !todo.completed
				saveTodosToStorage(state)
			}
		},
		deleteTodo: (state, action) => {
			const index = state.findIndex(task => task.id === action.payload.id)
			if (index !== -1) {
				state.splice(index, 1)
				saveTodosToStorage(state)
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchInitialData.fulfilled, (state, action) => {
			return action.payload
		})
	},
})

const saveTodosToStorage = (todos: ITask[]) => {
	AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
		.then(() => console.log('Tasks saved to AsyncStorage'))
		.catch(error => console.error('Error saving tasks to AsyncStorage:', error))
}

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions

export default todosSlice.reducer
