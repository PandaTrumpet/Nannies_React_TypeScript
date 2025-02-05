import { RootState } from "../store";

export const selectOpenModal = (state: RootState) => state.modal.isOpen;
