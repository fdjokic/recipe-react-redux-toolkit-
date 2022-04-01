import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Login from "./pages/Login";
import { getRecipes } from "./features/recipes/recipesSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MealPlan from "./pages/MealPlan";

import "./App.css";
import Loading from "./components/Loading";

function App() {
  const { loading } = useSelector((store) => store.mealPlan);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="mealplan" element={<MealPlan />} />

            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
