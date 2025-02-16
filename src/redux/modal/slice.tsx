import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType: "login" | "register" | "appointment" | null;
  modalData: {
    photo?: string;
    name?: string;
  } | null;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  modalData: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalWindow: (
      state,
      action: PayloadAction<{
        modalType: ModalState["modalType"];
        modalData?: { photo?: string; name: string } | null;
      }>
    ) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.modalData = action.payload.modalData || null;
    },
    closeModalWindow: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalData = null;
    },
  },
});

export const { openModalWindow, closeModalWindow } = modalSlice.actions;
export default modalSlice.reducer;
