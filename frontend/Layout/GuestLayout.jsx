import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import GuestNavBar from "../Components/GuestNavBar";
import ScrollToTop from "../Components/ScrollTop";
import { useStateContext } from "../Context/ContextProvider";

const GuestLayout = () => {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <ScrollToTop />
      <GuestNavBar />
      <Outlet />
    </div>
  );
};

export default GuestLayout;
