import React, { useContext, useEffect, useReducer } from "react";
import { URL_PRODUCTION } from "../_Utils/Dependency";
import { Projects_reducer } from "../Reducer/Projects_Reducer";
import { FETCH_PROJECTS } from "../Reducer/Action";
import { UserContext } from "./UserContext";

const ProjectsContext = React.createContext();

const initialState = {
  projectsList: [],
  finishedProjectsList: [],
  error_Project: null,
  isLoading_Projects: true
};
const ProjectsProvider = ({ children }) => {
  const [projects, dispatch_projects] = useReducer(
    Projects_reducer,
    initialState
  );

  const fetchProjects = async token => {
    await fetch(`${URL_PRODUCTION}/project/get/projects`, {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        const { succes, projectsList } = data;
        if (succes) {
          dispatch_projects({
            type: FETCH_PROJECTS,
            payload: projectsList.filter(
              project => project.isFinished !== true
            ),
            isLoading_Projects: false
          });
        }
      })
      .catch(err => console.log(err.toString()));
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null)
      fetchProjects(localStorage.getItem("token"));
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, dispatch_projects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider, ProjectsContext };
