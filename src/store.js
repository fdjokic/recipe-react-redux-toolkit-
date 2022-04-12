import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./features/recipes/recipesSlice";
import mealPlanReducer from "./features/recipes/mealPlan/mealplanSlice";
import searchReducer from "./features/recipes/search/searchSlice";

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    mealPlan: mealPlanReducer,
    search: searchReducer,
  },
});
