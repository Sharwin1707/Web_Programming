import axios from "axios";
import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  isGuest: true,
  setUser: () => {},
  setToken: () => {},
  setIsGuest: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [isGuest, setIsGuest] = useState(true);

  // if(token){
  //   axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/users/find`)
  //   .then((response) => {
  //     console.log(response)
  //   })
  // }

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    }
    else{
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        isGuest,
        setUser,
        setToken,
        setIsGuest
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
