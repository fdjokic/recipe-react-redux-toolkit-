import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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

const RecipePopUp = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [noPhoto, setNoPhoto] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cardOpen, setCardOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=false`
    )
      .then((response) => {
        setLoading(true);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setInstructions(data.instructions);
        setImageUrl(data.image);
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
      });

    const timeout = setTimeout(() => {
      setNoPhoto(
        "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"
      );
    }, 2000);
    return () => clearTimeout(timeout);
  }, [id]);

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(instructions),
  });

  console.log(instructions);
  return (
    <Wrapper>
      <Link className="link" to="/">
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
      </Link>
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
  .link {
    text-decoration: none;
    color: orange;
  }
  * {
    background: transparent;
  }
`;

export default RecipePopUp;
