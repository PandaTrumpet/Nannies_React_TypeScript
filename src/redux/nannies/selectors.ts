import { RootState } from "../store";

export const nanniesSelectors = (state: RootState) => state.nannies.nannies;
export const nannieById = (state: RootState) => state.nannies.nannie;
export const lastKey = (state: RootState) => state.nannies.lastKey;
export const favoriteNannies = (state: RootState) =>
  state.nannies.favouriteNannies;
