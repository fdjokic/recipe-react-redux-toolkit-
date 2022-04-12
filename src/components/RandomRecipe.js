import React, { useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Recipe from "./Recipe";
import { getRandomRecipe } from "../features/recipes/recipesSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
};

const RandomRecipe = () => {
  const { randomRecipe } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        className="container"
      >
        <button onClick={() => dispatch(getRandomRecipe())}>
          Get a suprise recipe
        </button>
        {randomRecipe.map((recipe) => {
          return (
            <Link key={recipe.id} to={`recipes/${recipe.id}`}>
              <Recipe recipe={recipe} />
            </Link>
          );
        })}
      </motion.div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border-top: 3px solid black;
  padding: 1rem;
  margin-top: 4rem;
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    button {
      padding: 0.5rem;
      border-radius: 5px;
      font-size: 1.3rem;
      cursor: pointer;
      background: orange;
      border: none;
    }
  }
`;
export default RandomRecipe;
