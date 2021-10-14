import React, { useEffect, useReducer } from "react";
import { URL_HEROKU } from "../_Utils/Dependency";
import { projects_reducer } from "../Reducer/Projects_Reducer";
import { FETCH_PROJECTS } from "../Reducer/Action";

const ProjectsContext = React.createContext();

const ProjectsProvider = ({ children }) => {
  const initialState = {
    projects: [],
    isAuth: false,
    isLoading: true,
  };

  const [projects, dispatch] = useReducer(projects_reducer, initialState);

  const fetchProjects = async () => {
    await fetch(`${URL_HEROKU}/get/projects`)
      .then((response) => response.json())
      .then((data) => {
        console.log("useEffect ProjectsInfo -> ", data);
        if (data)
          if (data.succes) {
            dispatch({
              type: FETCH_PROJECTS,
              payload: data,
              isAuth: data.succes,
              isLoading: false,
            });
          } else {
            dispatch({
              type: FETCH_PROJECTS,
              isAuth: data.succes,
              isLoading: false,
            });
          }
      })
      .catch((err) => console.log(err.toString()));
  };

  useEffect(() => {
    /* fetchProjects(); */
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, dispatch }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider, ProjectsContext };
