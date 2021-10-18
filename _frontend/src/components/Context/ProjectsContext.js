import React, { useContext, useEffect, useReducer } from "react";
import { URL_HEROKU } from "../_Utils/Dependency";
import { Projects_reducer } from "../Reducer/Projects_Reducer";
import { FETCH_PROJECTS } from "../Reducer/Action";
import { UserContext } from "./UserContext";

const ProjectsContext = React.createContext();

const initialState = {
  projectsList: [],
  isLoading_Projects: true,
};
const ProjectsProvider = ({ children }) => {
  const [projects, dispatch_projects] = useReducer(
    Projects_reducer,
    initialState
  );
  /*   console.log("projects provider -> ", projects); */
  const fetchProjects = async (token) => {
    await fetch(`${URL_HEROKU}/project/get/projects`, {
      headers: { authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        const { succes, projectsList } = data;
        console.log("projectsList", data);
        if (succes) {
          dispatch_projects({
            type: FETCH_PROJECTS,
            payload: projectsList.filter(
              (project) => project.isFinished !== true
            ),
            isLoading_Projects: false,
          });
        }
      })
      .catch((err) => console.log(err.toString()));
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
