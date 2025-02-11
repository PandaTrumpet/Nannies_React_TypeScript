import { createSlice } from "@reduxjs/toolkit";
import { getNannieById, getNannies } from "./operation";
type Reviews = {
  comment: string;
  rating: number;
  reviewer: string;
};
interface INannie {
  about: string;
  avatar_url: string;
  birthday: string;
  characters: string[];
  education: string;
  experience: string;
  kids_age: string;
  location: string;
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: Reviews[];
}
interface IIniatialState {
  nannies: INannie[];
  nannie: INannie | null;
  loading: boolean;
  error: string | null;
  lastKey: null;
}
const initialState: IIniatialState = {
  nannies: [],
  lastKey: null,
  nannie: null,
  loading: false,
  error: null,
};
const nanniesSlice = createSlice({
  name: "nannies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNannies.fulfilled, (state, action) => {
        state.loading = false;
        state.nannies = [...state.nannies, ...action.payload.data];
        state.lastKey = action.payload.lastKey;
      })
      .addCase(getNannieById.fulfilled, (state, action) => {
        state.nannie = action.payload;
      });
  },
});

export default nanniesSlice.reducer;
