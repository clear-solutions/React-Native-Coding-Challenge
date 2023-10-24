import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Client from "../services/client";
import type { RootState } from "./store";
import type { ITodo } from "../types";

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
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ListState = {
  ongoingTasks: [],
  completedTasks: [],
  status: "idle",
  error: null,
};

const listSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodos.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        action.payload.forEach((todo: ITodo) => {
          todo.completed
            ? state.completedTasks.push(todo)
            : state.ongoingTasks.push(todo);
        });
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
export const getListStatus = (state: RootState) => state.todoList.status;
export const getListError = (state: RootState) => state.todoList.error;

export default listSlice.reducer;
