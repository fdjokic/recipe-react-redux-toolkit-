import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./features/recipes/recipesSlice";
import mealPlanReducer from "./features/recipes/mealPlan/mealplanSlice";

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    mealPlan: mealPlanReducer,
  },
});
