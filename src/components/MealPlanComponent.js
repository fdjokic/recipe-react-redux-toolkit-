import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getMealImage } from "../features/recipes/mealPlan/mealplanSlice";
import Loading from "./Loading";

const noPhoto =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

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
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=false`
    )
      .then((response) => {
        setLoading(true);
        return response.json();
      })
      .then((data) => {
        setImageUrl(data.image);
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
      });
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  console.log(imageUrl);
  return (
    <Wrapper>
      <div className="container">
        <h4>{title}</h4>
        <img src={imageUrl === "" ? <Loading /> : imageUrl} alt={title} />
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
