import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getMealImage } from "../features/recipes/mealPlan/mealplanSlice";

const MealPlanComponent = ({ item }) => {
  const { servings, title, readyInMinutes: time, id } = item;
  const dispatch = useDispatch();
  // const { imageUrl } = useSelector((store) => store.mealPlan);

  // useEffect(() => {
  //   dispatch(
  //     getMealImage(
  //       `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=false`
  //     )
  //   );
  // }, [item.id]);
  const [imageUrl, setImageUrl] = React.useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log("error");
      });
  }, [id]);

  return (
    <Wrapper>
      <div className="container">
        <h4>{title}</h4>
        <img src={imageUrl} alt={title} />
        <p>{servings} servings</p>
        <span>{time}min.</span>
      </div>
      <header />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  header {
    display: flex;
    height: 1px;
    flex-direction: row;
    background-color: black;
    color: black;
  }
`;
export default MealPlanComponent;
