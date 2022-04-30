import React from "react";
import "../styles/type-selection.css";
import { useSelector } from "react-redux";
import { registerStudent } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/handleCookies";

const TypeSelection = (props) => {
  let navigate = useNavigate();
  const registerProfileStore = useSelector((state) => state.registerProfile);
  const studentSignUp = () => {
    registerStudent(
      registerProfileStore.email,
      registerProfileStore.password,
      registerProfileStore.name
    )
      .then((res) => {
        setCookie("token", res.token);
        return navigate("/dashboard");
      })
      .catch((error) => {
        alert("Error in signing up", error);
      });
  };

  return (
    <div className="outer-container flex flex-row justify-around">
      <button
        className="profile-container border border-[#1d88e340] w-52 h-52 flex items-end justify-center p-1"
        onClick={studentSignUp}
      >
        <div className="type-text">I am a student</div>
      </button>
      <button
        className="profile-container border border-[#1d88e340] w-52 h-52 flex items-end justify-center p-1"
        onClick={props.handleProfSignUp}
      >
        <div className="type-text">I am a professor</div>
      </button>
    </div>
  );
};

export default TypeSelection;
