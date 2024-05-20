import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ShopItem = ({ image, name, price, ratingStar, type }) => {
  // Create an array of star elements based on the ratingStar prop
  const stars = [];
  for (let i = 0; i < ratingStar; i++) {
    stars.push(
      <FontAwesomeIcon key={i} icon={faStar} color="white" size="lg" />
    );
  }

  return (
    <Link to={`/shop/${name}`}>
      <div className={`filter-item w-56 m-4 ${type}`}>
        <div className="w-full h-60  overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt="Shop Item"
          />
        </div>
        <div className="text-center my-1">{name}</div>
        <div className="flex justify-center gap-1 my-2">
          {stars.map((star, index) => (
            <div key={index}>{star}</div>
          ))}
        </div>
        <h1 className="text-center">RM {price}</h1>
      </div>
    </Link>
  );
};

export default ShopItem;
