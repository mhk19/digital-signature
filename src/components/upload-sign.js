import React, { useState } from "react";
import upload_icon from "../assets/images/upload.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerProf } from "../api/authApi";
import { setCookie } from "../utils/handleCookies";

const UploadSign = () => {
  let navigate = useNavigate();
  const registerProfileStore = useSelector((state) => state.registerProfile);
  const [file, setFile] = useState();
  const getFile = () => {
    var files = document.getElementById("files").files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };
  const profSignUp = () => {
    registerProf(
      registerProfileStore.email,
      registerProfileStore.password,
      registerProfileStore.name,
      file
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
    <div className="flex flex-col mt-6 items-center p-6 font-[Poppins] text-[#333333]">
      <div className="font-bold text-lg">Upload your Signature</div>
      <label htmlFor="files">
        <div className="border border-dashed flex flex-col items-center w-32 py-12 mt-6 cursor-pointer">
          <img className="" src={upload_icon} alt="Upload" />
          Browse
        </div>
      </label>
      <input
        id="files"
        type="file"
        style={{ visibility: "hidden" }}
        onChange={getFile}
        accept="image/*"
      />
      {file ? <div>{file.name}</div> : null}
      <button
        className="w-1/2 bg-[#1D88E3] mt-6 h-8 text-white border rounded"
        onClick={profSignUp}
      >
        Go to dashboard
      </button>
    </div>
  );
};

export default UploadSign;
