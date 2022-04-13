import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.7,
    },
  },
};

const Empty = () => {
  return (
    <Wrapper>
      <motion.p variants={variants} initial="initial" animate="animate">
        No meals match your search criteria.
      </motion.p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  margin: 3rem;
  align-items: flex-start;
  height: 50vh;
  p {
    text-align: center;
    background-color: rgba(255, 255, 255, 0.4);
    padding: 0.5rem;
    border-radius: 10px;
  }
  @media only screen and (max-width: 920px) {
    font-size: 1.5rem;
  }
`;
export default Empty;
