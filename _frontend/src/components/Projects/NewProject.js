import React, { useState, useEffect, useContext } from "react";

import NavBar from "../Nav/NavBar";
import Button from "../_Utils/Button";

import { URL_PRODUCTION } from "../_Utils/Dependency";
import { Redirect } from "react-router-dom";
import { ProjectsContext } from "../Context/ProjectsContext";
import { ADD_PROJECT, FETCH_PROJECTS } from "../Reducer/Action";
import { UserContext } from "../Context/UserContext";

import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SliderUsers from "../_Utils/SliderUsers";

let links = [
  { url: "/", link: "Home" },
  { url: "/dashboard", link: "Dashboard" },
];

/* const dateNow = new Date().getTime();
const day = new Date().getDay();
const month = new Date().getMonth();
const year = new Date().getFullYear();
console.log(new Date().toISOString()); */

const NewProject = () => {
  const { projects, dispatch_projects } = useContext(ProjectsContext);
  const { userLoggedInfo } = useContext(UserContext).userLogged;


  const [projectName, setProjectName] = useState("");
  const [projectTime, setProjectTime] = useState("");
  const [projectDetails, setProjecDetails] = useState("");
  const [projectTeam, setProjectTeam] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isSucces, setIsSucces] = useState(false);
  const [isVisibility, setVisibility] = useState("hidden");
  const [button, setButton] = useState("Create Project");
  const [dynamicMsg, setDynamicMsg] = useState("");
  const [isActiv, setIsActiv] = useState('active');

  const dynamicStyle = {
    margin: "0px auto 10px ",
    width: "auto",
    textAlign: "center",
    fontWeight: "bolder",
    fontSize: "20px",
    color: "salmon",
  };

  useEffect(() => {
    fetch(`${URL_PRODUCTION}/auth/get/all-users`)
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
      });
  }, []);

  /*   const handleChange = (e) => {
    setInfoProject({ [e.target.id]: e.target.value });
  }; */

  const handleChangeAddUser = (event) => {
    let TMP_list = [];
    if (event.target.checked) {
      TMP_list.push(...projectTeam, event.target.value);
      setProjectTeam(TMP_list);
    } else if (!event.target.checked) {
      if (projectTeam.length > 0) {
        let remainingItems = projectTeam.filter(
          (element) => element !== event.target.value
        );
        setProjectTeam(remainingItems);
      }
    }
  };

  const handleGetUsers = (e) => {
    e.preventDefault();

    if (isActiv === "active") {
      setIsActiv(null);
    } else if (isActiv === null) setIsActiv("active");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setButton("Loading...");

    const dataNewProject = {
      projectName: projectName,
      projectTeam: projectTeam.toString(),
      projectTime: projectTime,
      projectDetails: projectDetails,
      projectOwner: userLoggedInfo.email,
      projectOwnerPhoto: userLoggedInfo.urlPhoto,
      projectOwnerPhoto_foreignKeyUserId: userLoggedInfo.id,
    };

    console.log(dataNewProject);
    fetch(`${URL_PRODUCTION}/project/post/newProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataNewProject),
    })
      .then((response) => response.json())
      .then((data) => {
        const { succes, newProject } = data;
        if (succes) {
          setIsSucces(succes);
          newProject.createdAt = new Date().toISOString();
          newProject.updatedAt = new Date().toISOString();
          dispatch_projects({
            type: ADD_PROJECT,
            payload: [...projects.projectsList, newProject],
          });
        } else {
          setIsSucces(data.succes);
          setDynamicMsg("The project already exists");
        }
      })
      .catch((err) => console.log(err));

    setButton("Create Project");
    setVisibility("hidden");

    setProjectName("");
    setProjectTeam("");
    setProjectTime("");
    setProjecDetails("");
  };

  const listUsers = [];
  /* const { isSucces } = this.state;
    const { dynamicMsg } = this.state; */

  userList.forEach((element, id) => {
    listUsers.push(
      <li key={id} style={{ minWidth: "190px" }}>
        <input
          className="input-listUsers"
          type="checkbox"
          name="projectTeam"
          id={id}
          onChange={handleChangeAddUser}
          value={element}
        />
        {element}
      </li>
    );
  });

  return (
    <div className="projects">
      {isSucces ? (
        <Redirect to={"/dashboard"} />
      ) : (
        <div>
          <SliderUsers isActiv={isActiv} usersList={listUsers} />

          <NavBar links={links} />

          <div className="wrapper-form">
            <form
              className="form-content"
              method="POST"
              onSubmit={handleSubmit}
            >
              {dynamicMsg && <div style={dynamicStyle}>{dynamicMsg}</div>}
              <label htmlFor="projectName">Project Name</label>
              <input
                className="input-dataUser"
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
                value={projectName}
                autoFocus={true}
                required
                type="text"
                id="projectName"
              />

              <label htmlFor="projectTime">Project Time</label>
              <input
                className="input-dataUser"
                onChange={(e) => {
                  setProjectTime(e.target.value);
                }}
                value={projectTime}
                required
                type="text"
                id="projectTime"
              />

              <label htmlFor="projectTeam">Project Team</label>
              <FontAwesomeIcon
                icon={faUserPlus}
                className="logoAddUser"
                onClick={handleGetUsers}
              />

              <textarea
                className="area-user-list"
                onChange={handleChangeAddUser}
                value={projectTeam}
                required
                type="text"
                id="projectTeam"
              />

              <label htmlFor="projectDetails">Project Details</label>
              <textarea
                className="area-projectDetails"
                onChange={(e) => {
                  setProjecDetails(e.target.value);
                }}
                value={projectDetails}
                required
                rows="10"
                type="text"
                id="projectDetails"
              />
              <Button textBtn={button} />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProject;
