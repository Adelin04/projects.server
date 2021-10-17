import {
  SET_CAPITALIZE_USER_PROFILE,
  SET_AUTH,
  SET_USERLOGGED_INFO,
} from "../Reducer/Action";

export const User_Reducer = (state, action) => {
  switch (action.type) {
    case SET_USERLOGGED_INFO:
      return { ...state, userLoggedInfo: action.payload };
    case SET_AUTH:
      return { ...state, isAuth: action.payload };
    case SET_CAPITALIZE_USER_PROFILE:
      return { ...state, capitalizeUserProfile: action.payload };
    default:
      return state;
  }
};
