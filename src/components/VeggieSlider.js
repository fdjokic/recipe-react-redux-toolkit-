import React, { useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { useSelector, useDispatch } from "react-redux";
import { getVeggie } from "../features/recipes/recipesSlice";
import styled from "styled-components";
import Recipe from "./Recipe";
import { Link } from "react-router-dom";

const Slider1 = () => {
  const { veggie } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  console.log(veggie);

  useEffect(() => {
    dispatch(getVeggie());
  }, []);
  return (
    <Wrapper>
      <Splide
        className="recipes"
        options={{
          perPage: 4,
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
          gap: "2.5rem",
          arrows: false,
        }}
      >
        {veggie.map((recipe) => {
          return (
            <SplideSlide className="slide" key={recipe.id}>
              <Link className="link" to={`/recipes/${recipe.id}`}>
                <Recipe recipe={recipe} />
              </Link>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .recipes {
    width: 95vw;
    max-height: 100vh;
    margin: 0 auto;
    max-width: 100%;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    min-height: 20rem;
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
  .link {
    text-decoration: none;
  }
`;

export default Slider1;
