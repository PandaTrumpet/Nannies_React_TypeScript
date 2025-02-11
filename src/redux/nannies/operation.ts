import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDatabase,
  ref,
  get,
  query,
  orderByKey,
  startAt,
  limitToFirst,
} from "firebase/database";

import { database } from "../../firebase";
// export const getNannies = createAsyncThunk(
//   "nannies/getNannies",
//   async (_, thunkAPI) => {
//     try {
//       const dbRef = ref(database);
//       const snapshot = await get(child(dbRef, "/"));
//       if (snapshot.exists()) {
//         const nannies = snapshot.val();
//         // console.log(nannies);
//         return nannies;
//       } else {
//         console.log("No data available");
//       }
//     } catch (error) {
//       thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const getNannies = createAsyncThunk(
  "nannies/getNannies",
  async (startKey: string | null, thunkAPI) => {
    try {
      const database = getDatabase();
      let q = query(ref(database, "/"), orderByKey(), limitToFirst(3)); // Загружаем 3 элемента

      if (startKey) {
        q = query(
          ref(database, "/"),
          orderByKey(),
          startAt(startKey),
          limitToFirst(4)
        );
      }

      const snapshot = await get(q);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const nanniesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        return {
          data: nanniesArray.slice(startKey ? 1 : 0),
          lastKey: nanniesArray.at(-1)?.id,
        };
      } else {
        return { data: [], lastKey: null };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
export const getNannieById = createAsyncThunk<
  INannie,
  number,
  { rejectValue: string }
>("nannies/getNannieById", async (id, thunkAPI) => {
  try {
    const userRef = ref(database, `/${id}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return thunkAPI.rejectWithValue("No such user");
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
