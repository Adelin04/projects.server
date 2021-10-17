import React, { useReducer, useEffect, createContext } from "react";
import { URL_HEROKU } from "../_Utils/Dependency";
import { User_Reducer } from "../Reducer/User_Reducer";
import {
  SET_AUTH,
  SET_CAPITALIZE_USER_PROFILE,
  SET_USERLOGGED_INFO,
} from "../Reducer/Action";
// import { useCookies } from "react-cookie";

const UserContext = createContext();

const initialState = {
  isAuth: false,
  userLoggedInfo: [],
  capitalizeUserProfile: "X X",
};
const UserProvider = ({ children }) => {
  const [userLogged, dispatch_user] = useReducer(User_Reducer, initialState);
/*   console.log("user", userLogged); */
  const fetchUserInfo = async (token) => {
    await fetch(`${URL_HEROKU}/auth/authChecker`, {
      headers: { authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        const { succes, userProfile, capitalizeUser } = data;
        // initialState.isAuth = succes;
        // initialState.userLoggedInfo = userProfile;
        dispatch_user({ type: SET_AUTH, payload: succes });
        dispatch_user({ type: SET_USERLOGGED_INFO, payload: userProfile });
        dispatch_user({
          type: SET_CAPITALIZE_USER_PROFILE,
          payload: capitalizeUser,
        });
      })
      .catch((err) => console.log(err));
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
