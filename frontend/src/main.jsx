import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import Footer from "../Components/Footer.jsx";
import { ToastProvider } from "../Components/Toast.jsx";
import { ContextProvider } from "../Context/ContextProvider.jsx";
import router from "./router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
    <Footer />
  </ContextProvider>
);
