import React, { useEffect, useState } from "react";
import Login from "./login";
import TypeSelection from "./type-selection";
import Register from "./registration";
import UploadSign from "./upload-sign";
import { getCookie } from "../utils/handleCookies";

const AuthPage = () => {
  const [type, setType] = useState("login");
  const [loginHighlightClasses, setLoginHighlightClasses] = useState(
    "border border-[#1D88E3] text-[#1D88E3]"
  );
  const [signupHighlightClasses, setSignupHighlightClasses] = useState(
    "border border-[#99999940] text-[#666666]"
  );

  const setRegisterTypeSelection = () => {
    setType("type-selection");
  };
  const setRegisterForm = () => {
    setLoginHighlightClasses("border border-[#99999940] text-[#666666]");
    setSignupHighlightClasses("border border-[#1D88E3] text-[#1D88E3]");
    setType("register-form");
  };
  const setUploadSign = () => {
    setType("upload-sign");
  };
  const setLogin = () => {
    setLoginHighlightClasses("border border-[#1D88E3] text-[#1D88E3]");
    setSignupHighlightClasses("border border-[#99999940] text-[#666666]");
    setType("login");
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-row left-container h-screen w-5/12 bg-[#1D88E3] justify-end">
        <div className="left-inner-container h-5/6 w-5/6 my-auto shadow-[0_40px_40px_0_rgba(0,0,0,0.3)]" />
      </div>
      <div className="flex flex-row right-outer-container h-screen w-7/12 justify-start">
        <div className="right-inner-container h-5/6 w-5/6 my-auto shadow-[0_40px_40px_0_rgba(0,0,0,0.3)]">
          <div className="flex px-24 mt-24 w-full">
            <button
              className={`flex w-1/2 h-8 font-[Poppins] justify-center items-center font-semibold + ${loginHighlightClasses}`}
              onClick={setLogin}
            >
              Log in
            </button>
            <button
              className={`flex w-1/2 h-8 font-[Poppins] justify-center items-center font-semibold + ${signupHighlightClasses}`}
              onClick={setRegisterForm}
            >
              Sign up
            </button>
          </div>
          {type === "login" ? (
            <Login />
          ) : type === "type-selection" ? (
            <TypeSelection handleProfSignUp={setUploadSign} />
          ) : type === "register-form" ? (
            <Register handleSignUp={setRegisterTypeSelection} />
          ) : type === "upload-sign" ? (
            <UploadSign />
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
