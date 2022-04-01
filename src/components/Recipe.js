import React from "react";
import styled from "styled-components";

const Recipe = ({ recipe }) => {
  const { title, image } = recipe;

  return (
    <Wrapper>
      <img src={image} alt={title} />
      <h3>{`${title.length > 30 ? title.slice(0, 30) : title}`}</h3>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  img {
    height: 13rem;
    border-radius: 10px;
  }
`;
export default Recipe;
