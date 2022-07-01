import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./Start.css";

const Start = () => {
  const context = useContext(AuthContext);
  console.log(context);
  const [pageState, changePageState] = useState("start");
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  //   console.log(pageState);
  console.log(formState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const submitLogin = (e) => {
    // e.preventDefault();
    fetch("http://localhost:3001/interactive-comments-section/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        context.login(data); // this sets the context properly, but token is not being saved to local storage, so user state is changed to null upon page refresh
        console.log(context);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  const submitRegister = (e) => {
    // e.preventDefault();
    fetch("http://localhost:3001/interactive-comments-section/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        context.login(data);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  const renderPage = () => {
    if (pageState === "start") {
      return (
        <div className="btns-container">
          <button
            className="login-btn"
            onClick={() => changePageState("login")}
          >
            Log In
          </button>
          <button
            className="register-btn"
            onClick={() => changePageState("register")}
          >
            Register
          </button>
        </div>
      );
    } else if (pageState === "login") {
      return (
        <div className="login-form-container">
          <form className="login-form form">
            <h1>Login</h1>
            <input
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
            ></input>
            <input
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            ></input>
          </form>
          <button onClick={() => submitLogin()}>Submit!</button>
        </div>
      );
    } else if (pageState === "register") {
      return (
        <form className="register-form form">
          <h1>Register</h1>
          <input
            name="first_name"
            id="first_name"
            placeholder="First name"
            onChange={handleChange}
          ></input>
          <input
            name="last_name"
            id="last_name"
            placeholder="Last name"
            onChange={handleChange}
          ></input>
          <input
            name="email"
            id="email"
            onChange={handleChange}
            placeholder="Email address"
          ></input>
          <input
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="Password"
          ></input>
          <button onClick={() => submitRegister()}>Submit!</button>
        </form>
      );
    }
  };
  return <div className="start">{renderPage()}</div>;
};

export default Start;
