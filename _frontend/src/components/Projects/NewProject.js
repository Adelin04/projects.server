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

/* class NewProject extends React.Component {
  static contextType = ProjectsContext;
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAddUser = this.handleChangeAddUser.bind(this);
    this.handleGetUsers = this.handleGetUsers.bind(this);

    this.state = {
      projectName: "",
      projectTime: "",
      projectDetails: "",
      projectTeam: [],
      usersList: [],
      isSucces: false,
      isReady: false,
      visibility: "hidden",
      btnMsg: "Create Project",
      dynamicMsg: ""
    };
  }

  componentDidMount = () => {
    fetch(`${URL}get/list-user`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        // console.log("users ->", data.users);
        this.setState({ usersList: data.users });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleChangeAddUser = event => {
    //console.log(event.target.id);
    //console.log(event.target.value);
    let TMP_list = [];
    if (event.target.checked) {
      TMP_list.push(...this.state.projectTeam, event.target.value);
      this.setState({
        [event.target.name]: TMP_lists
      });
    } else if (!event.target.checked) {
      // console.log("projectTeam ->", this.state.projectTeam);
      if (this.state.projectTeam.length > 0) {
        let remainingItems = this.state.projectTeam.filter(
          element => element !== event.target.value
        );
        this.setState({
          [event.target.name]: remainingItems
        });
      }
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    let self = this;
    self.setState({ btnMsg: "Loading..." });

    self.setState({
      projectName: "",
      projectTeam: "",
      projectTime: "",
      projectDetails: ""
    });

    const dataNewProject = {
      projectName: self.state.projectName,
      projectTeam: self.state.projectTeam.toString(),
      projectTime: self.state.projectTime,
      projectDetails: self.state.projectDetails
    };

    fetch(`${URL}create/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataNewProject)
    })
      .then(response => response.json())
      .then(
        data =>
          data.succes !== true
            ? self.setState({
                isSucces: data.succes,
                dynamicMsg: "The project already exists"
              })
            : self.setState({ isSucces: data.succes }),
        this.context.dispatch({
          type: ADD_PROJECT,
          payload: [dataNewProject]
        })
      )
      .catch(err => console.log(err));

    self.setState({ btnMsg: "Create Project", visibility: "hidden" });
  };

  handleGetUsers = e => {
    e.preventDefault();

    this.state.visibility === "hidden"
      ? this.setState({ visibility: "visible" })
      : this.setState({ visibility: "hidden" });
  };

  render() {
    let listStyle = { visibility: this.state.visibility };
    const listUsers = [];
    const { isSucces } = this.state;
    const { dynamicMsg } = this.state;

    this.state.usersList.forEach((element, id) => {
      listUsers.push(
        <li key={id}>
          <input
            className="input-listUsers"
            type="checkbox"
            name="projectTeam"
            id={id}
            onChange={this.handleChangeAddUser}
            value={element}
          />
          {element}
        </li>
      );
    });

    const dynamicStyle = {
      margin: "0px auto 10px ",
      width: "auto",
      textAlign: "center",
      fontWeight: "bolder",
      fontSize: "20px",
      color: "salmon"
    };

    return (
      <div className="projects">
        {isSucces
          ? <Redirect to={"/dashboard"} />
          : <div>
              <NavBar links={links} />

              <div className="wrapper-form">
                <ul style={listStyle} className="userListStyle-ul">
                  {listUsers}
                </ul>

                <form
                  className="form-content"
                  method="POST"
                  onSubmit={this.handleSubmit}
                >
                  {dynamicMsg &&
                    <div style={dynamicStyle}>
                      {dynamicMsg}
                    </div>}
                  <label htmlFor="projectName">Project Name</label>
                  <input
                    className="input-dataUser"
                    onChange={this.handleChange}
                    value={this.state.projectName}
                    autoFocus={true}
                    required
                    type="text"
                    id="projectName"
                  />

                  <label htmlFor="projectTime">Project Time</label>
                  <input
                    className="input-dataUser"
                    onChange={this.handleChange}
                    value={this.state.projectTime}
                    required
                    type="text"
                    id="projectTime"
                  />

                  <label htmlFor="projectTeam">Project Team</label>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="logoAddUser"
                    onClick={this.handleGetUsers}
                  />

                  <textarea
                    className="user-list"
                    onChange={this.handleChangeAddUser}
                    value={this.state.projectTeam}
                    required
                    type="text"
                    id="projectTeam"
                  />

                  <label htmlFor="projectDetails">Project Details</label>
                  <textarea
                    className="area-projectDetails"
                    onChange={this.handleChange}
                    value={this.state.projectDetails}
                    required
                    rows="10"
                    type="text"
                    id="projectDetails"
                  />
                  <Button textBtn={this.state.btnMsg} />
                </form>
              </div>
            </div>}
      </div>
    );
  }
}

export default NewProject; */
