import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { searchRecipes } from "../features/recipes/search/searchSlice";
import { handleValues } from "../features/recipes/search/searchSlice";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { diets } from "../assets/constants";
import { cuisines } from "../assets/constants";
import recipesSlice from "../features/recipes/recipesSlice";
import Empty from "./Empty";

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 1, delay: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Search = () => {
  const dispatch = useDispatch();
  const {
    query = "",
    results = [],
    cuisine,
    diet,
    loading,
  } = useSelector((store) => store.search);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      searchRecipes(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}&diet=${diet}&cuisine=${cuisine}`
      )
    );
  };
  if (loading) {
    return <Loading />;
  }
  console.log(cuisine);

  console.log(diet);
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "cuisine") {
      value = e.target.dataset.cuisine;
      if (value === "All") {
        value = "";
      }
    }
    if (name === "diet") {
      value = e.target.dataset.diet;
      if (value === "All") {
        value = "";
      }
    }

    dispatch(handleValues({ name, value }));
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
        <h4>Diets</h4>
        <section>
          <div className="diets">
            {diets.map((item, idx) => {
              return (
                <button
                  name="diet"
                  data-diet={item.name}
                  key={idx}
                  onClick={handleChange}
                  className={item.name === diet ? "active" : "diets-btn"}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </section>
        <h4>Cuisines</h4>
        <section>
          <div className="cuisine">
            {cuisines.map((item, idx) => {
              return (
                <button
                  name="cuisine"
                  data-cuisine={item.name}
                  key={idx}
                  onClick={handleChange}
                  className={item.name === cuisine ? "active" : "cuisine-btn"}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </section>
        {results.length > 1 || (!query && results.length > 1) ? (
          <div className="container">
            {results.map((recipe) => {
              const { id, title, image } = recipe;
              return (
                <motion.article
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="card"
                  key={id}
                >
                  <LazyLoadImage
                    effect="blur"
                    className="img-class"
                    src={
                      image ||
                      "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"
                    }
                    alt={title}
                  />

                  <h3>{title}</h3>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <Empty />
        )}
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
      padding: 0.5rem;
      border-radius: 5px;
      outline: none;
      border: none;
      cursor: pointer;
    }
  }
  h4 {
    text-align: center;

    margin: 0.4rem;
    padding: 0.3rem;
    width: 5rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }
  section {
    width: 50vw;
    margin: 0 auto;
    max-width: 100%;
    height: 50px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .diets,
  .cuisine {
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow-x: scroll;
    white-space: nowrap;
    scrollbar-width: none;
    scroll-behavior: smooth;
  }
  .diets::-webkit-scrollbar {
    display: none;
  }
  .cuisine::-webkit-scrollbar {
    display: none;
  }
  .diets-btn {
    background-color: green;
    width: 4rem;
    min-width: fit-content;
  }
  .cuisine-btn {
    background-color: yellow;
    width: 4rem;
    min-width: fit-content;
  }
  .active {
    background: black;
    color: white;
  }
  .container {
    margin: 3rem auto;
    display: flex;
    justify-content: center;
    max-width: 100%;
    flex-wrap: wrap;
    gap: 3rem;
    border-radius: 20px;
  }
  .card {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    width: 20rem;
    height: 20rem;
    font-size: 0.8rem;
    text-align: center;
    padding: 0.3rem;
    width: 17rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 0.4rem;
    img {
      height: 14rem;
      border: 3px solid brown;
      background-color: brown;
      width: 15rem;

      object-fit: cover;
      border-radius: 13px;
    }
    h3 {
    }
  }

  input {
    width: 20rem;
    padding: 0.4rem;
    margin: 1rem;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    font-size: 1.2rem;
    outline: none;
  }
  @media only screen and (max-width: 1000px) {
    section {
      width: 80vw;
    }
  }
  @media only screen and (max-width: 720px) {
    section {
      width: 95vw;
    }
  }
`;
export default Search;
