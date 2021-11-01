import React, { useReducer, useEffect, createContext } from "react";
import { URL_HEROKU } from "../_Utils/Dependency";
import { User_Reducer } from "../Reducer/User_Reducer";
import {
  SET_AUTH,
  SET_CAPITALIZE_USER_PROFILE,
  SET_USERLOGGED_INFO
} from "../Reducer/Action";

const UserContext = createContext();

const initialState = {
  isAuth: false,
  userLoggedInfo: [],
  capitalizeUserProfile: ""
};
const UserProvider = ({ children }) => {
  const [userLogged, dispatch_user] = useReducer(User_Reducer, initialState);

  const fetchUserInfo = async token => {
    await fetch(`${URL_HEROKU}/auth/authChecker`, {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        const { succes, userProfile, capitalizeUser } = data;
        dispatch_user({ type: SET_AUTH, payload: succes });
        dispatch_user({ type: SET_USERLOGGED_INFO, payload: userProfile });
        dispatch_user({
          type: SET_CAPITALIZE_USER_PROFILE,
          payload: capitalizeUser
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      fetchUserInfo(localStorage.getItem("token"));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogged, dispatch_user }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
