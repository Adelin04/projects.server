import React, { useReducer, useEffect, createContext, useState } from "react";
import { URL_HEROKU } from "../_Utils/Dependency";
import { User_Reducer } from "../Reducer/User_Reducer";
import {
  FETCH_USER_LOGGED,
  SET_CAPITALIZE_USER_PROFILE,
  SET_AUTH,
  SET_USERLOGGED_INFO,
} from "../Reducer/Action";
// import { useCookies } from "react-cookie";

const UserContext = createContext();

const initialState = {
  isAuth: false,
  userLoggedInfo: [],
  capitalizeUserProfile: null,
};
const UserProvider = ({ children }) => {
  const [userLogged, dispatch] = useReducer(User_Reducer, initialState);

  const fetchUserInfo = async (token) => {
    await fetch(`${URL_HEROKU}/auth/authChecker`, {
      headers: { authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        const { succes, userProfile } = data;
        // initialState.isAuth = succes;
        // initialState.userLoggedInfo = userProfile;
        dispatch({ type: SET_AUTH, payload: succes });
        dispatch({ type: SET_USERLOGGED_INFO, payload: userProfile });
        console.log("useEffect Userinfo -> ", data);
        console.log("useEffect isAuth -> ", initialState.isAuth);
        console.log("useEffect userLogged -> ", userLogged);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      fetchUserInfo(localStorage.getItem("token"));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogged, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
