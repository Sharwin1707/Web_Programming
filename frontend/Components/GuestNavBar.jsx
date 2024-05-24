import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faBars,
  faUser,
  faSignOut,
  faBell,
  faMusic,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../Context/ContextProvider";

const GuestNavBar = () => {
  const [dropDownVisibility, setDropDownVisibility] = useState(false);
  const [navVisibility, setNavVisibility] = useState(false);


  const shopDropdown = () => {
    setDropDownVisibility(!dropDownVisibility);
  };

  const showNav = () => {
    setNavVisibility(!navVisibility);
  };
  return (
    <header className="h-16 flex justify-around items-center py-2">
      <div>
        <h1 className="w-max ml-8 text-white text-2xl">MM LABELS</h1>
      </div>

      <nav className="hidden xl:flex gap-10 justify-center items-center ">
        <Link
          to="/guest"
          className="nav-link px-2 py-1 text-white text-xl text-center"
        >
          Home
        </Link>
        <Link
          to="/guest/artist"
          className="nav-link px-2 py-1 text-white text-xl text-center"
        >
          Artist
        </Link>
        <Link
          to="/guest/event"
          className="nav-link px-2 py-1 text-white text-xl text-center"
        >
          Events
        </Link>

        <div className="shop-hover">
          <div className="py-3">
            <button className="flex items-center gap-2 nav-link px-2 py-1 text-white text-xl text-center cursor-pointer">
              Shop
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </div>

          <div className="shop-dropdown absolute top-14 flex  flex-col p-2 gap-1 bg-gray-800 rounded-md z-10">
            <Link to={"/guest/shop"} className=" px-2 py-1 rounded-md hover:bg-black">
              Merchandise
            </Link>
          </div>
        </div>
        <Link
          to="/guest/forum"
          className="nav-link px-2 py-1 text-white text-xl text-center"
        >
          Forum
        </Link>

        <Link to={"/guest/login"}>
          <button className="red px-6 py-2 rounded-sm hover:bg-red-600">
            Login
          </button>
        </Link>
      </nav>

      <div className="menu-btn xl:hidden sm:block">
        <div className="py-4 px-8">
          <FontAwesomeIcon onClick={showNav} icon={faBars} size="2x" />
        </div>

        <div className="menu-nav absolute left-0 w-full top-16 flex justify-center  flex-col bg-blue-gray-800 p-4 rounded-md">
          <Link
            to="/guest"
            className="nav-link px-2 py-1 text-white text-xl text-center"
          >
            Home
          </Link>
          <Link
            to="/guest/artist"
            className="nav-link px-2 py-1 text-white text-xl text-center"
          >
            Artist
          </Link>

          <Link
            to="/guest/event"
            className="nav-link px-2 py-1 text-white text-xl text-center"
          >
            Events
          </Link>
          <Link
            to="/guest/forum"
            className="nav-link px-2 py-1 text-white text-xl text-center"
          >
            Forum
          </Link>

          <div className="shop-hover">
            <button
              className=" w-full flex justify-center items-center gap-2 nav-link px-2 py-1 text-white text-xl text-center cursor-pointer"
              onClick={showNav}
            >
              Shop
              <FontAwesomeIcon icon={faCaretDown} />
            </button>

            <div className="shop-dropdown w-full flex flex-col justify-center items-center">
              <Link
                to={"/guest/shop"}
                className=" px-2 py-1 rounded-md hover:bg-black"
              >
                Merchandise
              </Link>
            </div>
          </div>

          <Link to={"/guest/login"}>
            <button className="red px-6 py-2 rounded-sm hover:bg-red-600">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default GuestNavBar;
