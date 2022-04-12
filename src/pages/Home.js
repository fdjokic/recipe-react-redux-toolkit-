import React from "react";
import styled from "styled-components";

import Loading from "../components/Loading";

import Slider1 from "../components/Slider1";
import RandomRecipe from "../components/RandomRecipe";
import VeggieSlider from "../components/VeggieSlider";
import Search from "../components/Search";

const Home = () => {
  return (
    <Wrapper>
      <Search />
      <Slider1 />
      <VeggieSlider />
      <RandomRecipe />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: url("/images/table-top.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default Home;
