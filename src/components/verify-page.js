import React, { useState } from "react";
import { verifyDocument } from "../api/verifyApi";
import upload_icon from "../assets/images/upload.svg";

const VerifyPage = () => {
  const [file, setFile] = useState();
  const [status, setStatus] = useState('');
  const [approverList, setApproverList] = useState([]);
  const getFile = () => {
    var files = document.getElementById("files").files;
    if (files.length > 0) {
      setFile(files[0]);
      setStatus('');
    }
  };

  const verify = () => {
    if (!file) alert("Please select file first");
    verifyDocument(file)
      .then((res) => {
        console.log(res);
        setStatus('Approved by');
        setApproverList(JSON.parse(res));
      })
      .catch((err) => {
        console.log(err);
        setStatus('Not Approved')
        setApproverList([]);
      });
  };

  return (
    <div className="flex flex-col mt-6 items-center p-6 font-[Poppins] text-[#333333]">
      <div className="font-bold text-lg">Upload your File</div>
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
        accept=".pdf"
      />
      {file ? <div>{file.name}</div> : null}
      <button
        className="w-1/4 bg-[#1D88E3] mt-6 h-8 text-white border rounded"
        onClick={verify}
      >
        Verify
      </button>
      <div className="text-lg mt-6">{status}</div>
      <ul>
          {approverList.map((user) => <li>{user.name + " (" + user.email +")"}</li> )}
      </ul>
    </div>
  );
};

export default VerifyPage;
