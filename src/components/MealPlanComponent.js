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

// const noPhoto =
//   "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

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
  const [noPhoto, setNoPhoto] = useState("");

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

    const timeout = setTimeout(() => {
      setNoPhoto(
        "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"
      );
    }, 2000);
    return () => clearTimeout(timeout);
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
            src={imageUrl || noPhoto}
            alt={title}
          />
        </div>
        <h3 className="title">{title}</h3>
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
  background-color: transparent;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 250px;
    background-color: transparent;
  }
  .img-container {
    max-width: 250px;
    max-height: 270px;
    min-height: 200px;
    min-width: 250px;

    background-color: transparent;
  }
  .img-class {
    max-width: 250px;
    min-width: 250px;
    object-fit: cover;
    max-height: 170px;
    border-radius: 10px;
    border: 4px solid brown;
    background-color: brown;
  }
  .title {
    background-color: transparent;
    width: 90%;
    border-bottom: 2px solid grey;
    padding: 0.3rem;
    text-align: center;
    color: brown;
  }
  span {
    background-color: transparent;

    display: flex;
    align-items: center;
  }
  .icon {
    color: orange;
    font-size: 1.2rem;
    margin-left: 0.5rem;
    background-color: transparent;
  }
  p {
    background-color: transparent;

    display: flex;
    align-items: center;
  }
`;
export default MealPlanComponent;
