import React from "react";

const RequestCol = ({ name, title }) => {
  return (
    <button className="w-full bg-[#1d88e30d] flex justify-between items-center p-6 font-[Poppins] text-[#666666] h-10 my-4">
      <div>{name}</div>
      <div>{title}</div>
      <div className="text-[#1D88E3]">View Request &#8594;</div>
    </button>
  );
};

export default RequestCol;
