import React, { useEffect } from "react";
import { getMealPlan } from "../features/recipes/mealPlan/mealplanSlice";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import styled from "styled-components";
import MealPlanComponent from "../components/MealPlanComponent";

const MealPlan = () => {
  const {
    targetCalories,
    mealPlan = {},
    loading,
  } = useSelector((store) => store.mealPlan);
  const dispatch = useDispatch();

  const { monday: { meals = [] } = {} } = mealPlan;

  useEffect(() => {
    dispatch(getMealPlan());
  }, []);

  if (loading) {
    return <Loading />;
  }
  const weekPlan = Object.keys(mealPlan);
  console.log(mealPlan);

  // let dataMeals = [];

  // const something = newResults.map(({ meals }) => {
  //   return meals;
  // });
  // console.log(something);
  // for (const { meals } of newResults) {
  //   dataMeals.push({
  //     meals,
  //   });
  // }
  // console.log(dataMeals);
  return (
    <Wrapper>
      <section className="monday">
        {meals.map((item) => {
          return <MealPlanComponent item={item} key={item.id} />;
        })}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MealPlan;
