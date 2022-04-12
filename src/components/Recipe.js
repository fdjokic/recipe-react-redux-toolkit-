import React, { useState, useEffect } from "react";
import styled from "styled-components";
//

import { useDispatch, useSelector } from "react-redux";
import { getMealImage } from "../features/recipes/mealPlan/mealplanSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoIosTimer } from "react-icons/io";
import { GiMeal } from "react-icons/gi";
import { motion } from "framer-motion";
import InstructionsCard from "./InstructionsCard";
import RecipePopUp from "./RecipePopUp";

//

const Recipe = ({ recipe }) => {
  const { title, image, id } = recipe;

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [noPhoto, setNoPhoto] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cardOpen, setCardOpen] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=false`
    )
      .then((response) => {
        setLoading(true);
        return response.json();
      })
      .then((data) => {
        setInstructions(data.instructions);
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

  return (
    <Wrapper onClick={() => setCardOpen(!cardOpen)}>
      <img src={image} alt={title} />
      <h3>{`${title.length > 30 ? title.slice(0, 30) : title}`}</h3>
      {cardOpen ? (
        <RecipePopUp instructions={instructions} imageUrl={imageUrl} />
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0.5rem;
  h3 {
    padding: 0.3rem;
    text-align: center;
    color: black;
  }
  img {
    max-height: 13rem;
    border-radius: 10px;
    max-width: 15rem;
  }
`;
export default Recipe;
