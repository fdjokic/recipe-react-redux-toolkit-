import React, { useEffect, useState } from "react";
import { getMealPlan } from "../features/recipes/mealPlan/mealplanSlice";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import MealPlanComponent from "../components/MealPlanComponent";
import {
  removePrevious,
  selectCalories,
} from "../features/recipes/mealPlan/mealplanSlice";

const MealPlan = () => {
  const {
    targetCalories,
    handleCalories,
    mealPlan = {},
    loading,
  } = useSelector((store) => store.mealPlan);
  const dispatch = useDispatch();
  const [calories, setCalories] = useState(2000);

  useEffect(() => {
    dispatch(
      getMealPlan(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.REACT_APP_API_KEY}&timeFrame=day&targetCalories=${calories}`
      )
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      getMealPlan(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.REACT_APP_API_KEY}&timeFrame=day&targetCalories=${calories}`
      )
    );
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <label htmlFor="calories">Your wanted meal per calories</label>
        <input
          className="calories"
          placeholder="Number of Calories"
          type="number"
          min={300}
          max={4000}
          name="calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <div className="day-container">
          <h2>Select your meal</h2>
          <section className="day">
            {mealPlan.map((item) => {
              return <MealPlanComponent item={item} key={item.id} />;
            })}
          </section>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  min-height: 100vh;
  /* background: url("images/mealplan-pattern.png"); */
  background: url("images/table2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  label {
    background: transparent;
    text-align: center;
    font-size: 2rem;
    margin: 1rem auto;
    color: orange;
    border-radius: 10px;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.8);
  }
  h2 {
    padding: 0.5rem;
    background: transparent;
  }
  .calories {
    padding: 0.6rem;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    border: none;
    color: white;
    margin: 1rem auto;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
  }

  .day-container {
    opacity: 0.9;

    background-color: rgba(255, 255, 255, 0.8);
    min-height: 400px;
    width: 60vw;
    border-radius: 15px;
    margin-top: 2rem;
    margin-bottom: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      padding-top: 1rem;

      color: #e75480;
      border-bottom: 3px solid #e75480;
      background-color: transparent;
      text-transform: capitalize;
    }
  }
  .day {
    padding: 0.4rem;
    background-color: transparent;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 2rem;
  }
`;

export default MealPlan;
