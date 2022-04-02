import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getMealImage } from "../features/recipes/mealPlan/mealplanSlice";
import Loading from "./Loading";
import MiniLoading from "./MiniLoading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoIosTimer } from "react-icons/io";
import { GiMeal } from "react-icons/gi";

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

  // if (loading) {
  //   return <Loading />;
  // }
  // if (!imageUrl) {
  //   return <MiniLoading />;
  // }
  console.log(imageUrl);
  return (
    <Wrapper>
      <div className="container">
        <div className="img-container">
          <LazyLoadImage
            effect="blur"
            className="img-class"
            src={imageUrl}
            alt={title}
          />
        </div>
        <h4 className="title">{title}</h4>
        <p>
          {servings} servings <GiMeal className="icon" />
        </p>
        <span>
          {time}min. <IoIosTimer className="icon" />
        </span>
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
    width: 250px;
  }
  .img-container {
    max-width: 250px;
    height: 180px;
  }
  .img-class {
    max-width: 250px;
    object-fit: contain;

    border-radius: 10px;
    border: 3px solid orange;
    background-color: orange;
  }
  .title {
    width: 90%;
    border-bottom: 2px solid grey;
    padding: 0.3rem;
    text-align: center;
    color: brown;
  }
  span {
    display: flex;
    align-items: center;
  }
  .icon {
    color: orange;
    font-size: 1.2rem;
    margin-left: 0.5rem;
  }
  p {
    display: flex;
    align-items: center;
  }
`;
export default MealPlanComponent;
