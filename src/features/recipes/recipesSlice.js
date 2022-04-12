import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const complexSearch =
  "https://api.spoonacular.com/recipes/complexSearch?apiKey=";
const url = `${complexSearch}${API_KEY}`;

const initialState = {
  recipes: [],
  randomRecipe: [],
  veggie: [],
  loading: false,
  error: null,
  cardOpen: false,
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
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const getVeggie = createAsyncThunk(
  "recipes/getVeggie",
  async (_, thunkAPI) => {
    try {
      const response = await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&tags=vegetarian`
      );
      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getRandomRecipe = createAsyncThunk(
  "recipes/getRandomRecipe",
  async (_, thunkAPI) => {
    try {
      const response = await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      return response.data.recipes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
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
      const exists = localStorage.getItem("slider");
      if (exists) {
        state.recipes = payload;
      } else {
        localStorage.setItem("slider", JSON.stringify(payload));
        state.recipes = payload;
        console.log(payload);
      }
      state.loading = false;
    },
    [getRecipes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    },
    [getVeggie.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getVeggie.fulfilled]: (state, { payload }) => {
      const exists = localStorage.getItem("veggie");
      if (exists) {
        state.veggie = payload;
      } else {
        localStorage.setItem("veggie", JSON.stringify(payload));
        state.veggie = payload;
        console.log(payload);
      }
      state.loading = false;
    },
    [getVeggie.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    },
    [getRandomRecipe.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getRandomRecipe.fulfilled]: (state, { payload }) => {
      state.randomRecipe = payload;
      state.loading = true;
      state.error = null;
    },
    [getRandomRecipe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    },
  },
});

export default recipesSlice.reducer;
