import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Client from "../services/client";
import type { RootState } from "./store";
import type { ITodo } from "../types";
import {
  addTodoOnPriorityFilter,
  deleteTodoFunction,
  sortByCreationDate,
  sortByPriority,
} from "../services/utils";
import LIST from "../constants/List";
import FILTERS from "../constants/Filters";

export const fetchAllTodos = createAsyncThunk(
  "list/fetchAllTodos",
  async () => {
    try {
      const list = await Client.get("todos");
      return list;
    } catch (error: any) {
      return error.message;
    }
  }
);

interface ListState {
  ongoingTasks: ITodo[];
  selectedOngoing: number[];
  selectedCompleted: number[];
  completedTasks: ITodo[];
  currentFilter: FILTERS;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  editingTodoIndex: number | null;
}

const initialState: ListState = {
  ongoingTasks: [],
  selectedOngoing: [],
  selectedCompleted: [],
  completedTasks: [],
  status: "idle",
  currentFilter: FILTERS.DATE,
  error: null,
  editingTodoIndex: null,
};

const listSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setCurrentFilter: (state, action: PayloadAction<FILTERS>) => {
      state.currentFilter = action.payload;
    },
    createNewTodo: (state, action: PayloadAction<ITodo>) => {
      if (state.currentFilter === FILTERS.PRIORITY) {
        state.ongoingTasks = addTodoOnPriorityFilter(
          state.ongoingTasks,
          action.payload
        ) as ITodo[];
      } else {
        state.ongoingTasks = [action.payload, ...state.ongoingTasks];
      }
    },
    clearSelections: (state) => {
      state.selectedCompleted = [];
      state.selectedOngoing = [];
    },
    selectOrRemoveTask: (
      state,
      action: PayloadAction<{ index: number; listTitle: string }>
    ) => {
      const { listTitle, index } = action.payload;
      if (listTitle === LIST.ONGOING) {
        if (state.selectedOngoing.includes(index)) {
          state.selectedOngoing = state.selectedOngoing.filter(
            (i) => i !== index
          );
          return;
        }
        state.selectedOngoing = [index, ...state.selectedOngoing];
        return;
      }
      if (state.selectedCompleted.includes(index)) {
        state.selectedCompleted = state.selectedCompleted.filter(
          (i) => i !== index
        );
        return;
      }
      state.selectedCompleted = [index, ...state.selectedCompleted];
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      let newData = state.ongoingTasks;
      newData[state.editingTodoIndex as number] = action.payload;
      state.ongoingTasks = newData;
    },
    markAsCompleted: (state, action: PayloadAction<number>) => {
      let todo = state.ongoingTasks[action.payload];

      todo.completed = true;
      if (state.currentFilter === FILTERS.PRIORITY) {
        state.completedTasks = addTodoOnPriorityFilter(
          state.completedTasks,
          todo
        ) as ITodo[];
      } else {
        state.completedTasks = [todo, ...state.completedTasks];
      }
    },
    markAsUncompleted: (state, action: PayloadAction<number>) => {
      let todo = state.completedTasks[action.payload];

      todo.completed = false;
      if (state.currentFilter === FILTERS.PRIORITY) {
        state.ongoingTasks = addTodoOnPriorityFilter(
          state.ongoingTasks,
          todo
        ) as ITodo[];
      } else {
        state.ongoingTasks = [todo, ...state.ongoingTasks];
      }
    },
    deleteTodo: (
      state,
      action: PayloadAction<Record<string, LIST | number>>
    ) => {
      const { index, listTitle } = action.payload;
      if (listTitle === LIST.ONGOING) {
        state.ongoingTasks = deleteTodoFunction(
          state.ongoingTasks,
          index as number
        );
        return;
      }
      state.completedTasks = deleteTodoFunction(
        state.completedTasks,
        index as number
      );
    },
    setEditingTodoIndex: (state, action: PayloadAction<number | null>) => {
      state.editingTodoIndex = action.payload;
    },
    filterTasksByPriority: (state) => {
      state.currentFilter = FILTERS.PRIORITY;
      state.completedTasks = sortByPriority(state.completedTasks);
      state.ongoingTasks = sortByPriority(state.ongoingTasks);
    },
    filterTasksByDate: (state) => {
      state.currentFilter = FILTERS.DATE;
      state.completedTasks = sortByCreationDate(state.completedTasks);
      state.ongoingTasks = sortByCreationDate(state.ongoingTasks);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodos.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        action.payload.forEach((todo: ITodo) => {
          const date = new Date();
          todo = {
            ...todo,
            creationDate: date.getTime(),
            priorityTier: todo.priorityTier ?? 0,
          };
          todo.completed
            ? state.completedTasks.push(todo)
            : state.ongoingTasks.push(todo);
        });
        if (state.currentFilter === FILTERS.PRIORITY) {
          filterTasksByPriority();
        } else {
          filterTasksByDate();
        }
        state.status = "succeeded";
      })
      .addCase(fetchAllTodos.rejected, (state, action) => {
        state.status = "failed";
        state.ongoingTasks = [];
        state.completedTasks = [];
        state.error = action.error.message as string;
      });
  },
});

export const selectOngoingTasks = (state: RootState) =>
  state.todoList.ongoingTasks;
export const selectCurrentFilter = (state: RootState) =>
  state.todoList.currentFilter;
export const selectSelectedOngoing = (state: RootState) =>
  state.todoList.selectedOngoing;
export const selectSelectedCompleted = (state: RootState) =>
  state.todoList.selectedCompleted;
export const selectCompletedTasks = (state: RootState) =>
  state.todoList.completedTasks;
export const selectEditingTodoIndex = (state: RootState) =>
  state.todoList.editingTodoIndex;
export const getListStatus = (state: RootState) => state.todoList.status;
export const getListError = (state: RootState) => state.todoList.error;
export const {
  createNewTodo,
  setCurrentFilter,
  filterTasksByDate,
  filterTasksByPriority,
  deleteTodo,
  updateTodo,
  markAsCompleted,
  markAsUncompleted,
  clearSelections,
  setEditingTodoIndex,
  selectOrRemoveTask,
} = listSlice.actions;

export default listSlice.reducer;
