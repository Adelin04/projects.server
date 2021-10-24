import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../Nav/NavBar";

import { URL_HEROKU } from "../_Utils/Dependency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import ProjectTemplate from "./ProjectTemplate";
import Footer from "../Footer/Footer";
import { UserContext } from "../Context/UserContext";
import { ProjectsContext } from "../Context/ProjectsContext";
import styled from "styled-components";
import { DELETE_PROJECT } from "../Reducer/Action";
import { SetError } from "../_Utils/Error";

const logo = <FontAwesomeIcon icon={faProjectDiagram} />;

const links = [
  { url: "/", link: "Home" },
  { url: "/dashboard", link: "Dashboard" },
];
const links_noSession = [
  { url: "/login", link: "LogIn" },
  { url: "/register", link: "SignUp" },
];

const FinishedProjects = () => {
  const { isAuth } = useContext(UserContext).userLogged;
  const { projects, dispatch_projects } = useContext(ProjectsContext);
  console.log(isAuth);
  console.log(projects);

  const [finishedProjectsList, setFinishedProjectsList] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);
  const [redirect, isRedirect] = useState([false]);
  const [editID, setEditID] = useState([null]);
  const [finishedProject_Style, setFinishedProject_Style] = useState({
    display: "none",
  });
  const [dynamicMsg, setDynamicMsg] = useState(null);
  const [error_project_Id, setError_project_Id] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null || token !== undefined) {
      fetch(`${URL_HEROKU}/project/get/finished-project`, {
        method: "POST",
        headers: { authorization: token },
      })
        .then((Response) => Response.json())
        .then((data) => {
          const { finishedProjectsList } = data;
          // console.log("data.projects ->", finishedProjectsList);
          setFinishedProjectsList(finishedProjectsList);
          setIsLoading(false);
        })
        .catch((error) => {
          const newError = error.toString().split(':')[1];
          setDynamicMsg(newError);
        });
    }
  }, []);

  const handleDelete = (event) => {
    const id = Number(event.target.id);
    console.log(id);

    fetch(`${URL_HEROKU}/project/delete/project/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { succes } = data;
        if (succes) {
          let TMP_list = [];
          TMP_list = finishedProjectsList.filter(
            (project) => Number(project.id) !== id
          );
          setFinishedProjectsList(TMP_list);
          dispatch_projects({ type: DELETE_PROJECT, payload: TMP_list });
          console.log("TMP_list", TMP_list);
        }
      })
      .catch((error) => {
        const newError = error.toString().split(':')[1];
        if (error)
          SetError(
            finishedProjectsList,
            id,
            setDynamicMsg,
            setError_project_Id,
            newError
          );
      });
  };

  const LoadingStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "50px auto",
    fontSize: "30px",
    color: "var(--myGreen)",
  };

  return (
    <Wrapper>
      {!isAuth ? (
        <div className="container-finishedProjects">
          <NavBar links={links_noSession} />
          <Link style={LoadingStyle} to={"/login"}>
            {dynamicMsg}
          </Link>
        </div>
      ) : (
        <div className="container-finishedProjects">
          <NavBar links={links} />

          {isLoading ? (
            <div style={LoadingStyle}>Loading...</div>
          ) : (
            <div className="wrapper-finished-projects">
              {finishedProjectsList.length > 0 ? (
                <div className="finished-projects">
                  {finishedProjectsList &&
                    finishedProjectsList.map((project, key) => (
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
                          projectDetails={project.projectDetails}
                          projectOwner={project.projectOwner}
                          projectOwnerPhoto={project.projectOwnerPhoto}
                          handleDelete={handleDelete}
                          timeLeft={0}
                          finishedProject_Style={finishedProject_Style}
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <div style={LoadingStyle}>
                  Your finished projects list is empty!
                </div>
              )}
            </div>
          )}
          <Footer />
        </div>
      )}
    </Wrapper>
  );
};

export default FinishedProjects;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0px auto;

  .wrapper-finished-projects {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .finished-projects {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;
