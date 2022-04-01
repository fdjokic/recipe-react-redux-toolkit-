import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { GiCampCookingPot } from "react-icons/gi";

const NavBar = () => {
  return (
    <Navbar>
      <nav>
        <Link to="/" className="logo">
          <h2>Homechef</h2>
        </Link>
        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive ? "link active" : "link";
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => {
            return isActive ? "link active" : "link";
          }}
        >
          About Us
        </NavLink>
        <NavLink
          to="/mealplan"
          className={({ isActive }) => {
            return isActive ? "link active" : "link";
          }}
        >
          Meal-Plan
        </NavLink>
        <GiCampCookingPot className="sidebar-icon" />

        <Link to="/login" className="login">
          Login/Sign Up
        </Link>
      </nav>
      <div className="text">
        <h1>Let's cook!</h1>
        <p>Choose Your Recepe Now!</p>
      </div>
    </Navbar>
  );
};
const Navbar = styled.nav`
  border: 5px solid #f6f6f6;

  border-radius: 10px;
  background-image: url("images/recipe_background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 40vh;
  nav {
    font-family: "Lobster", cursive;
    padding: 0.5rem;
    font-size: 1.2rem;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .sidebar-icon {
    display: none;
  }

  .logo {
    h2 {
      background-color: yellow;
    }

    color: black;
    text-decoration: none;
    background-color: yellow;
    padding: 0.6rem;
    border-radius: 5px;
  }
  .text {
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 20%;
    left: 10%;
    padding: 0.5rem;
    border-radius: 10px;
    h1 {
      color: white;
      font-size: 4rem;
      background-color: transparent;
    }
    p {
      background-color: transparent;
      font-size: 2rem;
      color: white;
    }
  }
  .link {
    text-decoration: none;
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.4rem;
    border-radius: 5px;
  }
  .active {
    color: white;
    border-bottom: 3px solid yellow;
  }
  .login {
    background-color: white;
    color: black;
    text-decoration: none;
    padding: 0.4rem;
    width: 7rem;
    text-align: center;
    border-radius: 15px;
  }
  @media only screen and (max-width: 1200px) {
    .text {
      h1 {
        font-size: 3.5rem;
      }
      p {
        font-size: 1.5rem;
      }
    }
  }
  @media only screen and (max-width: 992px) {
    .login {
      font-size: 1.5rem;
      width: fit-content;
    }
    .logo {
      font-size: 1.5rem;
      padding: 0.4rem;
    }
    .text {
      h1 {
        font-size: 3rem;
      }
      p {
        font-size: 1.3rem;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    height: 40vh;
    .text {
      top: 20%;
      left: 10%;
    }
    nav {
      justify-content: space-between;
    }
    .text {
      h1 {
        font-size: 2.5rem;
      }
      p {
        font-size: 1.2rem;
      }
    }
    .link {
      display: none;
    }
    .sidebar-icon {
      display: block;
      background: black;
      padding: 0.3rem;
      border-radius: 50%;
      font-size: 2rem;
      color: white;
      cursor: pointer;
      animation-name: bounce;
      animation-iteration-count: infinite;
      animation-duration: 2s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    .login {
      font-size: 1rem;
      width: fit-content;
    }
    .logo {
      font-size: 1rem;
      padding: 0.4rem;
    }
    @keyframes bounce {
      0% {
        transform: translateY(0);
      }
      25% {
        color: orange;
      }

      50% {
        transform: translateY(10px);
      }

      75% {
        color: red;
      }

      100% {
        transform: translateY(0);
      }
    }
  }
  @media only screen and (max-width: 653px) {
    .logo {
      font-size: 0.8rem;
    }
    .sidebar-icon {
      font-size: 1.5rem;
    }
    .login {
      font-size: 0.8rem;
    }
    .text {
      h1 {
        font-size: 2rem;
      }
      p {
        font-size: 1rem;
      }
    }
  }
`;

export default NavBar;
