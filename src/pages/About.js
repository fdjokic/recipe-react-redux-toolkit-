import React, { useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import MapComponent from "../components/MapComponent";

const About = () => {
  const refForm = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        refForm.current,
        process.env.REACT_APP_USER_TOKEN
      )
      .then(
        () => {
          alert("Message successfully sent!");
          window.location.reload(false);
        },
        () => {
          alert("Failed to send the message, please try again.");
        }
      );
  };

  return (
    <Wrapper>
      <form ref={refForm} onSubmit={sendEmail} className="contact-form">
        <label>Name</label>
        <input type="text" name="name" required placeholder="Your name" />
        <label>Email</label>
        <input type="email" name="email" required placeholder="Your email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" required />
      </form>
      <MapComponent />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  min-height: 80vh;
  background: url("images/table-top.jpg");
  background-size: cover;
  color: white;
  label {
    background: transparent;
    text-align: center;
  }
  .contact-form {
    display: flex;
    border-radius: 5px;
    background: transparent;
    flex-direction: column;
    justify-content: space-around;
    width: 25rem;
    margin: 1rem 0 1rem 0;
    height: 30rem;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 0.7rem;

    input[type="text"],
    input[type="email"] {
      width: 80%;
      border: none;
      height: 50px;
      font-size: 16px;
      background: transparent;
      color: white;
      padding: 0 20px;
      box-sizing: border-box;
      border: 1px solid black;
      border-radius: 5px;
      outline: none;
      margin: 0 auto;
    }

    input[type="submit"] {
      /* cursor: pointer;
      margin: 1rem auto;
      width: 50%;
      padding: 0.3rem;
      border-radius: 5px;
      background: url("images/mealplan-pattern.png");
      background-size: cover;
      border: none;
      font-size: 1.3rem; */

      background-image: linear-gradient(
        to right,
        #1a2980 0%,
        #26d0ce 51%,
        #1a2980 100%
      );

      margin: 10px auto;
      padding: 5px;
      width: 50%;
      text-align: center;
      text-transform: uppercase;
      transition: 0.5s;
      background-size: 200% auto;
      color: white;
      border: none;

      box-shadow: 0 0 20px #eee;
      border-radius: 10px;
      display: block;
    }
    input[type="submit"]:hover {
      background-position: right center; /* change the direction of the change here */
      color: #fff;
      text-decoration: none;
    }
    textarea {
      outline: none;
      max-width: 100%;
      max-height: 15rem;
      height: 15rem;
      width: 80%;
      margin: 0 auto;
      min-height: 15rem;
      border: none;
      background: rgba(0, 0, 0, 0.7);
      font-size: 16px;
      color: #fff;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 10px;
    }
  }
`;
export default About;
