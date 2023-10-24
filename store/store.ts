import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";
import layoutReducer from "./layoutSlice";

export const store = configureStore({
  reducer: { todoList: listReducer, layout: layoutReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;