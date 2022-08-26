import React from "react";
import "../styles/login.css";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/handleCookies";

const Login = () => {
  var navigate = useNavigate();
  const loginBtn = () => {
    var loginEmail = document.getElementById("email").value;
    if (loginEmail === "") alert("Email can't be empty");
    var loginPass = document.getElementById("pass").value;
    if (loginPass === "") alert("Password can't be empty");
    else
      login(loginEmail, loginPass)
        .then((res) => {
          setCookie("token", res.token);
          navigate("/dashboard");
        })
        .catch((err) => {
          alert("Error in logging in", err);
        });
  };
  return (
    <div className="outer-container">
      <div className="heading">Log in to your account</div>
      <div className="form-login">
        <div className="form-label">Email</div>
        <input
          id="email"
          className="input-box"
          placeholder="Enter your email address"
          onChange={() => {}}
        ></input>
        <div className="form-label">Password</div>
        <input
          id="pass"
          className="input-box"
          placeholder="Enter your password"
          type="password"
        ></input>
        <button
          className="btn-login"
          onClick={() => {
            loginBtn();
          }}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
