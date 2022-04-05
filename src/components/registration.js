import React from "react";
import { useDispatch } from "react-redux";
import { SetRegisterProfile } from "../actions/registerACtions";
import "../styles/registration.css";

const Register = (props) => {
  var dispatch = useDispatch();
  const handleSignUp = () => {
    var name = document.getElementById("register-name").value;
    if (name === "") alert("Full Name can't be empty");
    var email = document.getElementById("register-email").value;
    if (email === "") alert("Email can't be empty");
    var password = document.getElementById("register-pass").value;
    if (password === "") alert("Password can't be empty");
    var cpass = document.getElementById("register-cpass").value;
    if (cpass !== password)
      alert("Password and Confirm Password should be same");
    else {
      dispatch(
        SetRegisterProfile({ name: name, email: email, password: password })
      );
      props.handleSignUp();
    }
  };
  return (
    <div className="outer-container">
      <div className="form-register">
        <div className="form-label">Full Name</div>
        <input
          id="register-name"
          className="input-box"
          placeholder="Enter your full name"
        ></input>
        <div className="form-label">Email</div>
        <input
          id="register-email"
          className="input-box"
          placeholder="Enter your email address"
        ></input>
        <div className="form-label">Password</div>
        <input
          id="register-pass"
          className="input-box"
          placeholder="Enter your password"
          type="password"
        ></input>
        <div className="form-label">Confirm Password</div>
        <input
          id="register-cpass"
          className="input-box"
          placeholder="Retype your password"
          type="password"
        ></input>
        <button className="btn-register" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
