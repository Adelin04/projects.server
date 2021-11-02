import {
  ADD_PROJECT,
  DELETE_PROJECT,
  EDIT_DONE,
  FETCH_PROJECTS,
  FETCH_FINISHED_PROJECTS,
  DONE_PROJECTS,
  REMOVE_PROJECT,
  CHANGE_PATH_USER_IMAGE,
  ERROR,
} from "../Reducer/Action";

export const Projects_reducer = (state, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        projectsList: action.payload,
        isLoading_Projects: action.isLoading_Projects,
      };
    case ADD_PROJECT:
      return { ...state, projectsList: action.payload };
    case EDIT_DONE:
      return { ...state, projectsList: action.payload };
    case DONE_PROJECTS:
      return { ...state, projectsList: action.payload };
    case FETCH_FINISHED_PROJECTS:
      return {
        ...state,
        finishedProjectsList: action.payload,
      };
    case DELETE_PROJECT:
      return { ...state, projectsList: action.payload };
    case REMOVE_PROJECT:
      return { ...state, projectsList: action.payload };
    case CHANGE_PATH_USER_IMAGE:
      return { ...state };
    default:
      return state;
  }
  //throw new Error(`No matching "${action.type}" - action type`);
};

