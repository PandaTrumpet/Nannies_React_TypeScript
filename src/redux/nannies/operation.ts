import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";

import { database } from "../../firebase";

interface GetNanniesParams {
  startKey: string | null;
  sortOption?:
    | "AtoZ"
    | "ZtoA"
    | "LessThan10"
    | "GreaterThan10"
    | "Popular"
    | "NotPopular"
    | "ShowAll";
}

export const getNannies = createAsyncThunk(
  "nannies/getNannies",
  async (params: GetNanniesParams, thunkAPI) => {
    try {
      const { startKey, sortOption } = params;
      const database = getDatabase();

      const baseRef = ref(database, "/");

      const snapshot = await get(baseRef);

      if (snapshot.exists()) {
        let nanniesArray = Object.keys(snapshot.val()).map((key) => ({
          id: key,
          ...snapshot.val()[key],
        }));

        switch (sortOption) {
          case "AtoZ":
            nanniesArray.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "ZtoA":
            nanniesArray.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "LessThan10":
            nanniesArray.sort((a, b) => a.price_per_hour - b.price_per_hour);
            nanniesArray = nanniesArray.filter(
              (nanny) => nanny.price_per_hour < 10
            );
            break;
          case "GreaterThan10":
            nanniesArray.sort((a, b) => b.price_per_hour - a.price_per_hour);
            nanniesArray = nanniesArray.filter(
              (nanny) => nanny.price_per_hour >= 10
            );
            break;
          case "Popular":
            nanniesArray.sort((a, b) => b.rating - a.rating);
            break;
          case "NotPopular":
            nanniesArray.sort((a, b) => a.rating - b.rating);
            break;
          case "ShowAll":
          default:
            break;
        }

        const pageSize = 3;
        let startIndex = 0;
        if (startKey) {
          const index = nanniesArray.findIndex((item) => item.id === startKey);
          startIndex = index !== -1 ? index + 1 : 0;
        }
        const paginatedData = nanniesArray.slice(
          startIndex,
          startIndex + pageSize
        );
        const newLastKey =
          paginatedData.length > 0
            ? paginatedData[paginatedData.length - 1].id
            : null;

        return {
          data: paginatedData,
          lastKey: newLastKey,
        };
      } else {
        console.log("Нет данных в базе");
        return { data: [], lastKey: null };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getNanniesLength = createAsyncThunk(
  "nannies/getNanniesLength",
  async (_, thunkAPI) => {
    try {
      const database = getDatabase();

      const baseRef = ref(database, "/");

      const snapshot = await get(baseRef);
      let nanniesArray;
      if (snapshot.exists()) {
        nanniesArray = Object.keys(snapshot.val()).map((key) => ({
          id: key,
          ...snapshot.val()[key],
        }));

        return nanniesArray;
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
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

export const getAllData = createAsyncThunk(
  "data/getAllData",
  async (_, thunkAPI) => {
    try {
      const database = getDatabase();

      const baseRef = ref(database, "/");

      const snapshot = await get(baseRef);
      if (snapshot.exists()) {
        const dataObj = snapshot.val();
        const dataArray = Object.keys(dataObj).map((key) => ({
          id: key,
          ...dataObj[key],
        }));

        return {
          data: dataArray,
          total: dataArray.length,
        };
      } else {
        return { data: [], total: 0 };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
