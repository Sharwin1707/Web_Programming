import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../Context/ContextProvider";

const ShopItem = ({ id, image, name, price, ratingStar, type }) => {
  // Create an array of star elements based on the ratingStar prop
  const stars = [];
  for (let i = 0; i < ratingStar; i++) {
    stars.push(
      <FontAwesomeIcon key={i} icon={faStar} color="white" size="lg" />
    );
  }

  const { token } = useStateContext();

  return (
    <Link to={token ? `/shop/${id}` : `/guest/shop/${id}`}>
      <div className={`filter-item bg-[#222222] text-white p-4 rounded-md shadow-md w-56 m-4 ${type} p-2 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}>
        <div className="w-full h-60 overflow-hidden rounded-md">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={name}
          />
        </div>
        <div className="text-center my-1 font-semibold text-lg">{name}</div>
        <div className="flex justify-center gap-1 my-2">
          {stars.map((star, index) => (
            <div key={index}>{star}</div>
          ))}
        </div>
        <h1 className="text-center font-bold">RM {price}</h1>
      </div>
    </Link>
  );
};

export default ShopItem;
