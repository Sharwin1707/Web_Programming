import React, { useEffect } from "react";
import { Navigate } from "react-router-dom"; // Import Navigate from 'react-router-dom'
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { useStateContext } from "../Context/ContextProvider";
import axios from "axios";
import ScrollToTop from "../Components/ScrollTop";
import { useToast } from "../Components/Toast";

const DefaultLayout = () => {
  const { token, setUser,setToken, setIsGuest } = useStateContext(); // Use token directly from the context
  console.log(token);

  const {showToastMessage} = useToast()

  const onLogout = () => {
      setUser(null);
      setToken(null);
      setIsGuest(true);
      localStorage.removeItem("ACCESS_TOKEN");
      showToastMessage('You have logged out')
      return <Navigate to="/guest"/>
  }

  useEffect(() => {
    if(token){
      axios
      .get(`${import.meta.env.VITE_SERVER_ENDPOINT}/users/${token}`)
      .then((response) => {
        setUser(response.data);
      });
    }
    
  }, []);

  useEffect(() => {
    if(token){
      axios
      .get(`${import.meta.env.VITE_SERVER_ENDPOINT}/users/${token}`)
      .then((response) => {
        setUser(response.data);
      });
    }
    
  }, [token]);

  // If there's no token, navigate to the guest page
  if (!token) {
    return <Navigate to="/guest" />;
  }

  return (
    <div>
      <ScrollToTop />
      <NavBar onLogout={onLogout}/>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
