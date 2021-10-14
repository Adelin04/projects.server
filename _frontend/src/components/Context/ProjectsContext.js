import React, { useEffect, useReducer } from "react";
import { URL_HEROKU } from "../_Utils/Dependency";
import { Projects_reducer } from "../Reducer/Projects_Reducer";
import { FETCH_PROJECTS } from "../Reducer/Action";

const ProjectsContext = React.createContext();

const initialState = {
  projectsList: [],
  isLoading: true,
};
const ProjectsProvider = ({ children }) => {
  const [projects, dispatch] = useReducer(Projects_reducer, initialState);

  const fetchProjects = async () => {
    await fetch(`${URL_HEROKU}/project/get/projects`)
      .then((response) => response.json())
      .then((data) => {
        console.log("useEffect ProjectsInfo -> ", data);
        if (data)
          if (data.succes) {
            dispatch({
              type: FETCH_PROJECTS,
              payload: data,
              isLoading: false,
            });
          } else {
            dispatch({
              type: FETCH_PROJECTS,
              isLoading: false,
            });
          }
      })
      .catch((err) => console.log(err.toString()));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, dispatch }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider, ProjectsContext };
