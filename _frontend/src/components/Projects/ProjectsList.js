import React, { useContext, useState } from "react";
import "./Projects.css";

import { Redirect, Link } from "react-router-dom";
import { URL_PRODUCTION  } from "../_Utils/Dependency";
import { ProjectsContext } from "../Context/ProjectsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import ProjectTemplate from "./ProjectTemplate";
import { DELETE_PROJECT, DONE_PROJECTS, ERROR } from "../Reducer/Action";
import { UserContext } from "../Context/UserContext";
import styled from "styled-components";
import { SetError } from "../_Utils/Error";

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
  const { projects, dispatch_projects } = useContext(ProjectsContext);
  const { isLoading_Projects } = useContext(ProjectsContext).projects;
  const { isAuth } = useContext(UserContext).userLogged;
  const [redirect, setRedirect] = useState(false);
  const [editID, setEditID] = useState(null);
  const [redirectTo, setRedirectTo] = useState("");
  const [dynamicMsg, setDynamicMsg] = useState(null);
  const [error_project_Id, setError_project_Id] = useState(null);

  const LoadingStyle = {
    display: "block",
    margin: "50px auto",
    textAlign: "center",
    fontSize: "30px",
    color: "var(--myGreen)",
  };

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

    try {
      setEditID(id);
      setRedir(history.getProject);
    } catch (error) {
      const newError = error.toString().split(':')[1];
      if (error)
        SetError(
          projects.projectsList,
          id,
          setDynamicMsg,
          setError_project_Id,
          newError
        );
    }
  };

  //---------btn-Done
  const handleDone = (event) => {
    const id = Number(event.target.id);
    console.log(id);
    let TMP_list = [];
    TMP_list = projects.projectsList.filter(
      (project) => project.projectID === id
    );
    const data = { projects: TMP_list };

    fetch(`${URL_PRODUCTION}/project/move/finished-project/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const { succes } = data;
        if (succes) {
          let TMP_list = [];
          TMP_list = projects.projectsList.filter(
            (project) => Number(project.id) !== id
          );
          console.log("TMP_list", TMP_list);
          dispatch_projects({ type: DONE_PROJECTS, payload: TMP_list });
        }
      })
      .catch((error) => {
        const newError = error.toString().split(':')[1];
        if (error)
          SetError(
            projects.projectsList,
            id,
            setDynamicMsg,
            setError_project_Id,
            newError
          );
      });
  };

  //---------btn-Delete
  const handleDelete = async (event) => {
    const id = Number(event.target.id);
    let TMP_list = [];

    await fetch(`${URL_PRODUCTION}/project/delete/project/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        const { succes } = data;
        if (succes) {
          TMP_list = projects.projectsList.filter(
            (project) => Number(project.id) !== id
          );
          dispatch_projects({ type: DELETE_PROJECT, payload: TMP_list });
        }
      })
      .catch((error) => {
        const newError = error.toString().split(':')[1];
        if (error)
          SetError(
            projects.projectsList,
            id,
            setDynamicMsg,
            setError_project_Id,
            newError
          );
      });
  };

  if (isAuth) {
    return (
      <Wrapper>
        {renderRedirect(redirectTo)}
        {!projects.isLoading_Projects && !projects.isLoading_Projects ? (
          <div style={{ width: "100%", margin: "15px 0px" }}>
            {projects.projectsList && projects.projectsList.length > 0 ? (
              <div style={{ width: "100%", margin: "15px 0px" }}>
                {projects.projectsList &&
                  projects.projectsList.map((project, key) => (
                    <div style={{ width: "100%" }} key={key}>
                      <ProjectTemplate
                        dynamicMsg={
                          error_project_Id === project.id ? dynamicMsg : null
                        }
                        logo={logo}
                        projectId={project.id}
                        projectName={project.projectName}
                        projectTime={project.projectTime}
                        projectTeam={project.projectTeam}
                        projectOwnerPhoto={project.projectOwnerPhoto}
                        projectOwner={project.projectOwner}
                        timeLeft={Math.floor(
                          (new Date().getTime() -
                            new Date(project.createdAt).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}
                        projectDetails={project.projectDetails}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleDone={handleDone}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <div style={LoadingStyle}>Your projects list is empty!</div>
            )}
          </div>
        ) : (
          <div style={LoadingStyle}>Loading...</div>
        )}
      </Wrapper>
    );
  } else return null;
};

export default ProjectsList;

const Wrapper = styled.section`
/*   display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; */
  width: 100%;
  height: auto;
  margin: auto;
`;
