import React from "react";

const CatagoryCard = (props) => {
  return (
    <div className="hover:bg-red-500 w-28 h-28 hover:cursor-pointer hover:text-white leading-4 tracking-widest my-16   ">
      <div className="flex-col justify-center align-middle text-center mt-7 ">
        <h1 className="">{props.img}</h1>
        <h1 className="text-center mt-4">{props.name}</h1>
      </div>
    </div>
  );
};

export default CatagoryCard;
