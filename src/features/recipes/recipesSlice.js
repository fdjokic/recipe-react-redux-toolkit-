import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const complexSearch =
  "https://api.spoonacular.com/recipes/complexSearch?apiKey=";
const url = `${complexSearch}${API_KEY}`;

const initialState = {
  recipes: [],
  loading: false,
  error: null,
};

export const getRecipes = createAsyncThunk(
  "recipes/getRecipes",
  async (_, thunkAPI) => {
    try {
      const response = await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: {
    [getRecipes.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getRecipes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.recipes = payload;
    },
    [getRecipes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    },
  },
});

export default recipesSlice.reducer;
