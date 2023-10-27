import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface ILayout {
  isAddModalOpen: boolean;
  isSelecting: boolean;
}

const initialState: ILayout = {
  isAddModalOpen: false,
  isSelecting: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddModalOpen = action.payload;
    },
    setSelecting: (state, action: PayloadAction<boolean>) => {
      state.isSelecting = action.payload; 
    }
  },
});

export const selectIsModalOpen = (state: RootState) =>
  state.layout.isAddModalOpen;
export const isSelecting = (state: RootState) => state.layout.isSelecting;

export const { setModalOpen,setSelecting } = layoutSlice.actions;

export default layoutSlice.reducer;
