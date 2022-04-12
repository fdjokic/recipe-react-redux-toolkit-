import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  mealPlan: [],
  loading: false,
  error: false,
  targetCalories: 2000,
};

export const getMealPlan = createAsyncThunk(
  "mealPlan/getMealPlan",
  async (url, thunkAPI) => {
    try {
      const response = await axios(url);
      console.log(response);
      return response.data.meals;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const mealPlan = createSlice({
  name: "mealPlan",
  initialState,
  reducers: {
    selectCalories: (state, action) => {
      state.targetCalories = action.payload;
    },
    removePrevious: (state) => {
      state.mealPlan = [];
    },
  },
  extraReducers: {
    [getMealPlan.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getMealPlan.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const exists = localStorage.getItem("meal");
      if (exists) {
        state.mealPlan = payload;
      } else {
        localStorage.setItem("meal", JSON.stringify(payload));
        state.mealPlan = payload;
        console.log(payload);
      }
      state.mealPlan = payload;
    },
    [getMealPlan.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    },
  },
});

export const { removePrevious, selectCalories } = mealPlan.actions;

export default mealPlan.reducer;
