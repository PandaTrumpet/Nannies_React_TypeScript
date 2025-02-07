import { RootState } from "../store";

export const nanniesSelectors = (state: RootState) => state.nannies.nannies;
export const nannieById = (state: RootState) => state.nannies.nannie;
