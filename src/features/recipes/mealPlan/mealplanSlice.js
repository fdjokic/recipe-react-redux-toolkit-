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
      const {
        mealPlan: { targetCalories },
      } = thunkAPI.getState();
      const response = await axios(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.REACT_APP_API_KEY}&targetCalories=${targetCalories}`
      );
      console.log(mealPlan);
      return response.data.week;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const mealPlan = createSlice({
  name: "mealPlan",
  initialState,
  reducers: {},
  extraReducers: {
    [getMealPlan.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getMealPlan.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.mealPlan = payload;
    },
    [getMealPlan.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    },
  },
});

export default mealPlan.reducer;
