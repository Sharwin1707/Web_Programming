import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";

const ArtistCard = ({ id, image, name }) => {
  const {token} = useStateContext()

  return (
    <div className="bg-[#222222] w-[300px] h-[400px] p-2">
      <Link to={token ? `/artistprofile/${id}` : `/guest/artistprofile/${id}`}>
        <div className="h-[300px] overflow-hidden rounded-md">
          <img
            className="w-full h-full object-cover  rounded-md"
            src={image}
            alt=""
          />
        </div>
        <h1 className="text-center text-xl mt-7">{name}</h1>
      </Link>
    </div>
  );
};

export default ArtistCard;
