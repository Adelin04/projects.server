import React, { useContext, useState } from "react";
import "./Projects.css";

import { Redirect, Link } from "react-router-dom";
import { URL_HEROKU } from "../_Utils/Dependency";
import { ProjectsContext } from "../Context/ProjectsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import ProjectTemplate from "./ProjectTemplate";
import { DELETE_PROJECT, DONE_PROJECTS } from "../Reducer/Action";
import { UserContext } from "../Context/UserContext";
import styled from "styled-components";

const logo = <FontAwesomeIcon icon={faProjectDiagram} />;

const history = {
  dashboard: "/dashboard",
  getProject: "get/project/",
};

let links = [
  { url: "/", link: "Home" },
  { url: "/new-project", link: "New Project" },
  { url: "/finished-projects", link: "Finished Projects" },
  /* { url: "/", link: "LogOut" } */
  /* { url: "/profile", link: userProfile } */
];

const links_noSession = [
  { url: "/login", link: "LogIn" },
  { url: "/register", link: "Register" },
];

const ProjectsList = () => {
  const { projects, dispatch } = useContext(ProjectsContext);
  const { projectsList } = useContext(ProjectsContext).projects;
  const { isAuth } = useContext(UserContext).userLogged;
  console.log("ProjectList -> ",projects);

  const LoadingStyle = {
    display: "block",
    margin: "50px auto",
    textAlign: "center",
    fontSize: "30px",
    color: "var(--myGreen)",
  };

  const [redirect, setRedirect] = useState(false);
  const [editID, setEditID] = useState(null);
  const [redirectTo, setRedirectTo] = useState("");

  //----------Redirect methods
  const setRedir = (redirectTo) => {
    setRedirect(true);
    setRedirectTo(redirectTo);
  };

  const renderRedirect = () => {
    if (redirect) {
      switch (redirectTo) {
        case history.getProject:
          return <Redirect to={`${history.getProject}${editID}`} />;
        case history.dashboard:
          return <Redirect to={`${history.dashboard}`} />;
        default:
          break;
      }
    }
  };

  //----------btn-Edit
  const handleEdit = (e) => {
    const id = Number(e.target.id);
    console.log("id", e.target);
    setEditID(id);
    setRedir(history.getProject);
  };

  //---------btn-Done
  const handleDone = (event) => {
    const id = Number(event.target.id);

    let TMP_list = [];
    TMP_list = projectsList.filter((project) => project.projectID === id);
    const data = { projects: TMP_list };

    fetch(`${URL_HEROKU}move/finished-project/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.succes) {
          // console.log(data);
          let TMP_list = [];
          TMP_list = projectsList.filter(
            (project) => Number(project.projectID) !== id
          );
          dispatch({ type: DONE_PROJECTS, payload: TMP_list });
        }
      })
      .catch((err) => console.log(err));
  };

  //---------btn-Delete
  const handleDelete = async (event) => {
    const id = Number(event.target.id);
    // console.log(id);
    await fetch(`${URL_HEROKU}delete/project/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.succes) {
          //console.log("raspuns server-delete -> ", data.succes);
          let TMP_list = [];
          TMP_list = projectsList.filter(
            (project) => Number(project.projectID) !== id
          );
          dispatch({ type: DELETE_PROJECT, payload: TMP_list });
        }
      })
      .catch((err) => console.log(err));
  };

  if (isAuth) {
    return (
      <Wrapper>
        {renderRedirect(redirectTo)}

        {projectsList && projectsList.length > 0 ? (
          <div style={{ width: "100%", margin: "15px 0px" }}>
            {projectsList &&
              projectsList.map((project, key) => (
                <div style={{ width: "100%" }} key={key}>
                  <ProjectTemplate
                    logo={logo}
                    projectId={project.projectID}
                    projectName={project.projectName}
                    projectTime={project.projectTime}
                    projectTeam={project.projectTeam}
                    photoProjectOwner={project.projectOwnerPhoto}
                    projectOwner={project.projectOwner}
                    timeLeft={Math.floor(
                      (new Date().getTime() -
                        new Date(project.dateCreate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                    projectDetails={project.projectDetails}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleDone={handleDone}
                  />
                  {/* {console.log("projectList ->", project)} */}
                </div>
              ))}
          </div>
        ) : (
          <div style={LoadingStyle}>Your projects list is empty!</div>
        )}
      </Wrapper>
    );
  } else return null;
};

export default ProjectsList;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin: auto;
`;
