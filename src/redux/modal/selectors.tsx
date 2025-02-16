import { RootState } from "../store";

export const selectOpenModal = (state: RootState) => state.modal.isOpen;
export const selectModalType = (state: RootState) => state.modal.modalType;
export const selectModalData = (state: RootState) => state.modal.modalData;
