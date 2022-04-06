import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <Wrapper>
      <h1>404 page not found</h1>
      <Link to="/" className="link">
        back home
      </Link>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: 90vh;
  background-image: url("images/food-pattern.jpg");
  background-position: center;
  background-size: contain;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  h1 {
    background-color: transparent;
    color: brown;
    font-size: 2.5rem;
    text-transform: capitalize;
  }
  .link {
    color: white;
    padding: 0.4rem;
    border-radius: 5px;
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.8);

    text-decoration: none;
    text-transform: capitalize;
  }
`;
export default Error;
