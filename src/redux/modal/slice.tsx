import { createSlice } from "@reduxjs/toolkit";
interface ModalState {
  isOpen: boolean;
}
const initialState: ModalState = {
  isOpen: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalWindow: (state) => {
      state.isOpen = true;
    },
    closeModalWindow: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModalWindow, closeModalWindow } = modalSlice.actions;
export default modalSlice.reducer;
