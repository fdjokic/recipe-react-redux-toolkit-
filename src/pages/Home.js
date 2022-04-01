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
          gap: "1rem",
        }}
      >
        {recipes.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <div>
                <Recipe recipe={recipe} />
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f6f6f6;
  .splide {
    position: relative;
  }

  .recipes {
    margin: 4rem auto;
    height: 20rem;
    display: flex;
    align-items: center;
  }

  .splide__pagination__page {
    color: black;
    background-color: black;
  }
  .splide__pagination__page.is-active {
    background-color: green;
  }
  .splide__arrow.splide__arrow--prev {
    background-color: white;
  }
  .splide__arrow.splide__arrow--next {
    background-color: white;
  }
`;
export default Home;
