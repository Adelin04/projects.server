import {
  CHANGE_PATH_USER_IMAGE,
  FETCH_USER_LOGGED,
  SET_CAPITALIZE_USER_PROFILE,
  SET_AUTH,
  SET_USERLOGGED_INFO,
  AUTH_CHECKER,
} from "../Reducer/Action";

export const User_Reducer = (state, action) => {
  switch (action.type) {
    case FETCH_USER_LOGGED:
      return { ...state, userInfo: action.payload };
    case SET_USERLOGGED_INFO:
      return { ...state, userLoggedInfo: action.payload };
    case SET_AUTH:
      return { ...state, isAuth: action.payload }, console.log("state", state);
    case SET_CAPITALIZE_USER_PROFILE:
      return { ...state, capitalizeUserProfile: action.payload };
    default:
      return state;
  }
};
