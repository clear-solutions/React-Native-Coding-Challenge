import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITodos } from '../../types/Todo';

const initialState: ITodos[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodos[]>) => {
      return [...state, ...action.payload];
    },
    completeTodo: (state, action: PayloadAction<number[]>) => {
      const ids = action.payload;
      ids.forEach((id: number) => {
        const todoIndex = state.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
          state[todoIndex].completed = true;
        }
      });
    },
    undoTodo: (state, action: PayloadAction<number[]>) => {
      const ids = action.payload;
      ids.forEach((id: number) => {
        const todoIndex = state.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
          state[todoIndex].completed = false;
        }
      });
    },
    searchTodo: (state, action: PayloadAction<string>) => {
      const wordToFilter = action.payload;
      return state.filter((todo) =>
        todo.title.toLowerCase().includes(wordToFilter),
      );
    },
  },
});

export const { addTodo, completeTodo, undoTodo, searchTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
