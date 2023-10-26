import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface ILayout {
  isAddModalOpen: boolean;
}

const initialState: ILayout = {
  isAddModalOpen: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    openOrCloseModal: (state, action: PayloadAction<string>) => {
      action.payload === "close"
        ? (state.isAddModalOpen = false)
        : (state.isAddModalOpen = true);
    },
  },
});

export const selectIsModalOpen = (state: RootState) =>
  state.layout.isAddModalOpen;

export const { openOrCloseModal } = layoutSlice.actions;

export default layoutSlice.reducer;
