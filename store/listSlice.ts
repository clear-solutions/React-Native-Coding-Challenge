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
  completedTasks: ITodo[];
  currentFilter: "Date" | "Priority";
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  editingTodoIndex: number | null;
}

const initialState: ListState = {
  ongoingTasks: [],
  completedTasks: [],
  status: "idle",
  currentFilter: "Date",
  error: null,
  editingTodoIndex: null,
};

const listSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setCurrentFilter: (state, action: PayloadAction<"Date" | "Priority">) => {
      state.currentFilter = action.payload;
    },
    createNewTodo: (state, action: PayloadAction<ITodo>) => {
      if (state.currentFilter === "Priority") {
        state.ongoingTasks = addTodoOnPriorityFilter(
          state.ongoingTasks,
          action.payload
        ) as ITodo[];
      } else {
        state.ongoingTasks = [action.payload, ...state.ongoingTasks];
      }
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      let newData = state.ongoingTasks;
      newData[state.editingTodoIndex as number] = action.payload;
      state.ongoingTasks = newData;
    },
    deleteTodo: (
      state,
      action: PayloadAction<Record<string, string | number>>
    ) => {
      const { index, listTitle } = action.payload;
      if (listTitle === "ONGOING") {
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
      state.currentFilter = "Priority";
      state.completedTasks = sortByPriority(state.completedTasks);
      state.ongoingTasks = sortByPriority(state.ongoingTasks);
    },
    filterTasksByDate: (state) => {
      state.currentFilter = "Date";
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
        if (state.currentFilter === "Priority") {
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
export const selectCompletedTasks = (state: RootState) =>
  state.todoList.completedTasks;
  export const selectEditingTodoIndex = (state: RootState) => state.todoList.editingTodoIndex;
export const getListStatus = (state: RootState) => state.todoList.status;
export const getListError = (state: RootState) => state.todoList.error;
export const {
  createNewTodo,
  setCurrentFilter,
  filterTasksByDate,
  filterTasksByPriority,
  deleteTodo,
  updateTodo,
  setEditingTodoIndex,
} = listSlice.actions;

export default listSlice.reducer;
