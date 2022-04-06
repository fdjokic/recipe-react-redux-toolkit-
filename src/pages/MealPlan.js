import React, { useEffect } from "react";
import { getMealPlan } from "../features/recipes/mealPlan/mealplanSlice";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import styled from "styled-components";
import MealPlanComponent from "../components/MealPlanComponent";
import { removePrevious } from "../features/recipes/mealPlan/mealplanSlice";

const MealPlan = () => {
  const {
    targetCalories,
    handleCalories,
    mealPlan = {},
    loading,
  } = useSelector((store) => store.mealPlan);
  const dispatch = useDispatch();

  const { monday: { meals: mondayMeals = [] } = {} } = mealPlan;
  const { tuesday: { meals: tuesdayMeals = [] } = {} } = mealPlan;
  const { wednesday: { meals: wednesdayMeals = [] } = {} } = mealPlan;
  const { thursday: { meals: thursdayMeals = [] } = {} } = mealPlan;
  const { friday: { meals: fridayMeals = [] } = {} } = mealPlan;
  const { saturday: { meals: saturdayMeals = [] } = {} } = mealPlan;
  const { sunday: { meals: sundayMeals = [] } = {} } = mealPlan;

  useEffect(() => {
    dispatch(getMealPlan());
    return () => dispatch(removePrevious());
  }, []);

  // if (loading) {
  //   return <Loading />;
  // }
  const weekPlan = Object.keys(mealPlan);
  console.log(mealPlan);
  // const handleChange = (e) => {
  //   let value = e.target.value;
  // };

  return (
    <Wrapper>
      <label htmlFor="calories"></label>
      <div className="day-container">
        <h1>{weekPlan[0]}</h1>
        <section className="day">
          {mondayMeals.map((item) => {
            return <MealPlanComponent item={item} key={item.id} />;
          })}
        </section>
      </div>
      <div className="day-container">
        <h1>{weekPlan[1]}</h1>
        <section className="day">
          {tuesdayMeals.map((item) => {
            return <MealPlanComponent item={item} key={item.id} />;
          })}
        </section>
      </div>
      <div className="day-container">
        <h1>{weekPlan[2]}</h1>
        <section className="day">
          {wednesdayMeals.map((item) => {
            return <MealPlanComponent item={item} key={item.id} />;
          })}
        </section>
      </div>
      <div className="day-container">
        <h1>{weekPlan[3]}</h1>
        <section className="day">
          {thursdayMeals.map((item) => {
            return <MealPlanComponent item={item} key={item.id} />;
          })}
        </section>
      </div>
      <div className="day-container">
        <h1>{weekPlan[4]}</h1>
        <section className="day">
          {fridayMeals.map((item) => {
            return <MealPlanComponent item={item} key={item.id} />;
          })}
        </section>
      </div>
      <div className="day-container">
        <h1>{weekPlan[5]}</h1>
        <section className="day">
          {saturdayMeals.map((item) => {
            return <MealPlanComponent item={item} key={item.id} />;
          })}
        </section>
      </div>
      <div className="day-container">
        <h1>{weekPlan[6]}</h1>
        <section className="day">
          {sundayMeals.map((item) => {
            return <MealPlanComponent item={item} key={item.id} />;
          })}
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  /* background: url("images/mealplan-pattern.png"); */
  background: url("images/table2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  .day-container {
    opacity: 0.9;

    background-color: rgba(255, 255, 255, 0.8);
    min-height: 400px;
    width: 60vw;
    border-radius: 15px;
    margin-top: 2rem;
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
