import React, { useContext, useEffect, useReducer } from "react";
import { URL_HEROKU } from "../_Utils/Dependency";
import { Projects_reducer } from "../Reducer/Projects_Reducer";
import { FETCH_PROJECTS } from "../Reducer/Action";
import { UserContext } from "../Context/UserContext";

const ProjectsContext = React.createContext();

const initialState = {
  projectsList: [],
  isLoading_Projects: true
};
const ProjectsProvider = ({ children }) => {
  const [projects, dispatch] = useReducer(Projects_reducer, initialState);
  const { userLogged } = useContext(UserContext);

  const fetchProjects = async () => {
    const email_userLogged = { userLogged: userLogged.userLoggedInfo.email };
    await fetch(`${URL_HEROKU}/project/get/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(email_userLogged)
    })
      .then(response => response.json())
      .then(data => {
        console.log("useEffect ProjectsInfo -> ", data);
        if (data)
          if (data.succes) {
            dispatch({
              type: FETCH_PROJECTS,
              payload: data,
              isLoading_Projects: false
            });
          } else {
            dispatch({
              type: FETCH_PROJECTS,
              isLoading_Projects: false
            });
          }
      })
      .catch(err => console.log(err.toString()));
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
