import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

const instructionsVariants = {
  initial: { y: "-100vh" },
  animate: {
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
};

const InstructionsCard = ({ instructions, imageUrl }) => {
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(instructions),
  });
  console.log(instructions);
  return (
    <Wrapper>
      {!instructions.startsWith("<") ? (
        <motion.article
          variants={instructionsVariants}
          initial="initial"
          animate="animate"
        >
          <img src={imageUrl} alt="recipe-img" />
          <div className="container">
            <p>{instructions}</p>
          </div>
        </motion.article>
      ) : (
        <motion.article
          variants={instructionsVariants}
          initial="initial"
          animate="animate"
        >
          <img src={imageUrl} alt="recipe-img" />
          <div
            className="container"
            style={{ background: "transparent" }}
            dangerouslySetInnerHTML={sanitizedData()}
          ></div>
        </motion.article>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  color: orange;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  margin: 0 auto;
  article {
    display: flex;
    gap: 1.5rem;
    height: 80%;
    width: 90vw;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    overflow: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none;
  }
  .container {
    background: transparent;
    width: 50vw;
    font-size: 1.3rem;
  }
  article::-webkit-scrollbar {
    background-color: orange;
    width: 8px;
  }
  article::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.9);
    border-radius: 8px;
  }
  img {
    height: 25rem;
    width: 25rem;
    border-radius: 10px;
    object-fit: contain;
    border-radius: 10px;
  }
  * {
    background: transparent;
  }
`;

export default InstructionsCard;
