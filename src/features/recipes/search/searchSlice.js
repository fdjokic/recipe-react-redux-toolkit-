import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const initialState = {
  query: "",
  results: [],
  loading: false,
  error: null,
  diet: "",
  cuisine: "",
};

export const searchRecipes = createAsyncThunk(
  "search/searchRecipes",
  async (url, thunkAPI) => {
    try {
      const response = await axios(url);
      console.log(response);
      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleValues: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  },
  extraReducers: {
    [searchRecipes.pending]: (state) => {
      state.loading = true;
    },
    [searchRecipes.fulfilled]: (state, { payload }) => {
      state.results = payload;
      state.loading = false;
    },
    [searchRecipes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    },
  },
});
export const { handleValues } = searchSlice.actions;

export default searchSlice.reducer;
