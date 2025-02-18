import { createSlice } from "@reduxjs/toolkit";
import { getAllData, getNannieById, getNannies } from "./operation";
type Reviews = {
  comment: string;
  rating: number;
  reviewer: string;
};
interface INannie {
  id?: string;
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
interface IniatialState {
  nannies: INannie[];
  nanniesLength: number | null;
  favouriteNannies: INannie[];
  nannie: INannie | null;
  loading: boolean;
  error: string | null;
  lastKey: string | null;
}
const initialState: IniatialState = {
  nannies: [],
  nanniesLength: null,
  favouriteNannies: JSON.parse(
    localStorage.getItem("favouriteNannies") || "[]"
  ),
  lastKey: null,
  nannie: null,
  loading: false,
  error: null,
};
const nanniesSlice = createSlice({
  name: "nannies",
  initialState,
  reducers: {
    addToFavoriteNannies(state, action) {
      const isFavourite = state.favouriteNannies.some(
        (nannie) => nannie.id === action.payload.id
      );
      if (!isFavourite) {
        state.favouriteNannies.push(action.payload);
        localStorage.setItem(
          "favouriteNannies",
          JSON.stringify(state.favouriteNannies)
        );
      }
    },
    deleteFromVafourite(state, action) {
      state.favouriteNannies = state.favouriteNannies.filter(
        (nannie) => nannie.id !== action.payload.id
      );
      localStorage.setItem(
        "favouriteNannies",
        JSON.stringify(state.favouriteNannies)
      );
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getNannies.fulfilled, (state, action) => {
        state.loading = false;
        // Если startKey равен null, значит, это новый запрос (например, при смене сортировки)
        if (!action.meta.arg.startKey) {
          state.nannies = action.payload.data;
        } else {
          // Это подгрузка: объединяем уже загруженные данные с новыми
          const combined = [...state.nannies, ...action.payload.data];

          // Убираем дубликаты по id
          state.nannies = combined.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.id === item.id)
          );
        }
        state.lastKey = action.payload.lastKey;
      })

      .addCase(getNannieById.fulfilled, (state, action) => {
        state.nannie = action.payload;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.nanniesLength = action.payload.total;
      });
  },
});

export default nanniesSlice.reducer;
export const { addToFavoriteNannies, deleteFromVafourite } =
  nanniesSlice.actions;
