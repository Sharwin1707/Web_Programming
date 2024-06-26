import React, { Suspense, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
import { useFetch } from "../Hook/useFetch";

const BookingNotification = () => {
  const { user } = useStateContext();
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/bookings/artistManage/${user._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user._id]);

  return (
    <Link to="/manage">
      <div className="relative">
        <FontAwesomeIcon icon={faBell} />
        {!loading && !error && bookData.length > 0 && (
          <span className="absolute top-0 left-2 bg-red-400 rounded-full w-4 h-4 flex justify-center items-center text-sm">
            {bookData.length}
          </span>
        )}
      </div>
    </Link>
  );
};

const NavBar = ({ onLogout }) => {
  const [dropDownVisibility, setDropDownVisibility] = useState(false);
  const [navVisibility, setNavVisibility] = useState(false);
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("User");
  const navigate = useNavigate();

  const { token, user, setUser, setIsGuest } = useStateContext();

  if (!token) {
    return <Navigate to="/guest" />;
  }

  useEffect(() => {
    if (user) {
      setUserData(user);
      setUserType(user.userType);
      setUsername(user.username);
    }
  }, [user]);

  // const onLogout = () => {
  //   localStorage.removeItem("ACCESS_TOKEN");
  //   setUser(null);
  //   setUserData(null);
  //   setUsername('')
  //   setIsGuest(true)
  //   navigate('/guest');
  // };

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
          to="/"
          className="nav-link px-2 py-1 text-white text-xl text-center"
        >
          Home
        </Link>
        <Link
          to="/artist"
          className="nav-link px-2 py-1 text-white text-xl text-center"
        >
          Artist
        </Link>
        {userType == "Organization" || userType == "Artist" ? (
          <Link
            to="/book"
            className="nav-link px-2 py-1 text-white text-xl text-center"
          >
            Book
          </Link>
        ) : (
          ""
        )}
        <Link
          to="/event"
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
            <Link to={"/shop"} className=" px-2 py-1 rounded-md hover:bg-black">
              Merchandise
            </Link>
            <Link to={"/cart"} className=" px-2 py-1 rounded-md hover:bg-black">
              Cart
            </Link>
            <Link
              to={"/purchasehistory"}
              className=" px-2 py-1 rounded-md hover:bg-black"
            >
              Tracking Order
            </Link>
            {userType == "Artist" ? (
              <Link
                to={"/shopadmin"}
                className=" px-2 py-1 rounded-md hover:bg-black"
              >
                Manage Merchandise
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
        <Link
          to="/forum"
          className="nav-link px-2 py-1 text-white text-xl text-center"
        >
          Forum
        </Link>

        {userType === "Artist" ? (
          <Suspense fallback={<div>...</div>}>
            <BookingNotification/>
          </Suspense>
        ) : (
          ""
        )}

        {username ? (
          <div className="shop-hover flex justify-center items-center gap-3 p-2">
            <div className="relative flex gap-2 justify-center items-center px-4 py-2 border rounded-md">
              {userType === "User" ? <FontAwesomeIcon icon={faUser} /> : ""}
              {userType === "Artist" ? <FontAwesomeIcon icon={faMusic} /> : ""}
              {userType === "Organization" ? (
                <FontAwesomeIcon icon={faBuilding} />
              ) : (
                ""
              )}
              <h1 className="text-md">{username}</h1>

              <div className="shop-dropdown absolute top-12 gap-1 bg-gray-800 rounded-md z-10 flex flex-col">
                <Link to={"/profile"}>
                  <button className="px-4 py-2 hover:bg-blue-gray-600 rounded-md">
                    Profile
                  </button>
                </Link>
                <button
                  onClick={() => onLogout()}
                  className="px-4 py-2 hover:bg-blue-gray-600 rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="red px-6 py-2 rounded-sm hover:bg-red-600">
              Login
            </button>
          </Link>
        )}
      </nav>

      <div className="menu-btn xl:hidden sm:block">
        <div className="py-4 px-8">
          <FontAwesomeIcon onClick={showNav} icon={faBars} size="2x" />
        </div>

        <div className="menu-nav absolute left-0 w-full top-16 flex justify-center  flex-col bg-blue-gray-800 p-4 rounded-md">
          <Link
            to="/"
            className="nav-link px-2 py-1 text-white text-xl text-center"
          >
            Home
          </Link>
          <Link
            to="/artist"
            className="nav-link px-2 py-1 text-white text-xl text-center"
          >
            Artist
          </Link>

          <Link
            to="/book"
            className="nav-link px-2 py-1 text-white text-xl text-center"
          >
            Book
          </Link>

          <Link
            to="/event"
            className="nav-link px-2 py-1 text-white text-xl text-center"
          >
            Events
          </Link>
          <Link
            to="/forum"
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
                to={"/shop"}
                className=" px-2 py-1 rounded-md hover:bg-black"
              >
                Merchandise
              </Link>
              <Link
                to={"/cart"}
                className=" px-2 py-1 rounded-md hover:bg-black"
              >
                Cart
              </Link>
              <Link className=" px-2 py-1 rounded-md hover:bg-black">
                Purchase History
              </Link>
            </div>
          </div>

          {userType === "Artist" ? (
            <Link to={"/manage"}>
              <div>
                <FontAwesomeIcon icon={faBell} />
              </div>
            </Link>
          ) : (
            ""
          )}

          {username ? (
            <div className="shop-hover flex justify-center items-center gap-3 p-2">
              <div className="relative flex gap-2 justify-center items-center px-4 py-2 border rounded-md">
                {userType === "User" ? <FontAwesomeIcon icon={faUser} /> : ""}
                {userType === "Artist" ? (
                  <FontAwesomeIcon icon={faMusic} />
                ) : (
                  ""
                )}
                {userType === "Organization" ? (
                  <FontAwesomeIcon icon={faBuilding} />
                ) : (
                  ""
                )}
                <h1 className="text-md">{username}</h1>

                <div className="shop-dropdown absolute top-12 gap-1 bg-gray-800 rounded-md z-10">
                  <button className="px-4 py-2 hover:bg-blue-gray-600 rounded-md">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className="red px-6 py-2 rounded-sm hover:bg-red-600">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
