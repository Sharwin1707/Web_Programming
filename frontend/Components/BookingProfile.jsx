import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";

const BookingProfile = ({ id, image, name }) => {
  const { token } = useStateContext();

  return (
    <div className="bg-[#222222] w-[300px] h-[400px] p-2">
      <h1 className="text-center">{name}</h1>
      <Link to={`/book/${id}`}>
        <div className="h-[300px] overflow-hidden rounded-md">
          <img
            className="w-full h-full object-cover  rounded-md"
            src={image}
            alt=""
          />
        </div>
        <div className="flex justify-center my-2">
          <button className="">Book</button>
        </div>
      </Link>
    </div>
  );
};

export default BookingProfile;
