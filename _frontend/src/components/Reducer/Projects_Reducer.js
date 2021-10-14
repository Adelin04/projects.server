import {
  ADD_PROJECT,
  DELETE_PROJECT,
  EDIT_DONE,
  FETCH_PROJECTS,
  DONE_PROJECTS,
  REMOVE_PROJECT,
  CHANGE_PATH_USER_IMAGE,
} from "../Reducer/Action";

export const projects_reducer = (state, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        isLoading: action.isLoading,
        isAuth: action.isAuth,
      };
    case ADD_PROJECT:
      return { ...state, projects: action.payload };
    case EDIT_DONE:
      return { ...state, projects: action.payload };
    case DONE_PROJECTS:
      return { ...state, projects: action.payload };
    case DELETE_PROJECT:
      return { ...state, projects: action.payload };
    case REMOVE_PROJECT:
      return { ...state, projects: action.payload };
    case CHANGE_PATH_USER_IMAGE:
      return { ...state };
    default:
      return state;
  }
  //throw new Error(`No matching "${action.type}" - action type`);
};

/* export default projects_reducer; */
