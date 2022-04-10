import React, { useEffect, useTransition } from "react";
import styled from "styled-components";
import Recipe from "../components/Recipe";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../features/recipes/recipesSlice";

const Home = () => {
  const { recipes } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  return (
    <Wrapper>
      <Splide
        className="recipes"
        options={{
          perPage: 5,

          breakpoints: {
            1500: {
              perPage: 4,
            },
            1150: {
              perPage: 3,
            },
            875: {
              perPage: 2,
            },
            580: {
              perPage: 1,
            },
          },
          rewind: true,
          width: "95vw",
          gap: "2.5rem",
          arrows: false,
        }}
      >
        {recipes.map((recipe) => {
          return (
            <SplideSlide className="slide" key={recipe.id}>
              <Recipe recipe={recipe} />
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: url("/images/table-top.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding: 4rem;

  .recipes {
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.6);

    height: 20rem;
    display: flex;
    align-items: center;
  }
  #splide01 {
    background-color: rgba(246, 239, 233, 0.4);
  }
  .splide__track {
    background: transparent;
  }
  .splide__list {
    gap: 1rem;
    li {
      width: 20rem;
    }
  }
  .splide__pagination {
    background: transparent;
  }
  .splide__pagination li {
    background: transparent;
  }
  .splide__pagination__page {
    color: black;
    background-color: black;
  }
  .splide__pagination__page.is-active {
    background-color: green;
  }

  /* .splide__arrow.splide__arrow--prev {
    background-color: white;
  }
  .splide__arrow.splide__arrow--next {
    background-color: white;
  } */
`;
export default Home;
