import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../Nav/NavBar";

import { URL_HEROKU } from "../_Utils/Dependency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import ProjectTemplate from "./ProjectTemplate";
import Footer from "../Footer/Footer";
import { UserContext } from "../Context/UserContext";
import styled from "styled-components";

const logo = <FontAwesomeIcon icon={faProjectDiagram} />;

const links = [
  { url: "/", link: "Home" },
  { url: "/dashboard", link: "Dashboard" },
];
const links_noSession = [
  { url: "/login", link: "LogIn" },
  { url: "/register", link: "SignUp" },
];

class FinishedProjects extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      finishedProjectsList: [],
      isLoading: true,
      redirect: false,
      editID: null,
      finishedProject_Style: { display: "none" },
    };
    console.log("contextType", this.context);
  }
  
  componentDidMount() {
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
        this.setState({
          finishedProjectsList: finishedProjectsList,
          isLoading: false,
        });
      });
    }
  }

  handleDelete = (event) => {
    const id = Number(event.target.id);

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
          TMP_list = this.state.finishedProjectsList.filter(
            (project) => project.id !== id
            );
            this.setState({ data: TMP_list });
        }
      })
      .catch((err) => console.log(err));
    };
    
    render() {
      const finishedProjectsList = this.state.finishedProjectsList;
      const isLoading = this.state.isLoading;
      const { isAuth } = this.context.userLogged;
      
      const LoadingStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "50px auto",
        textAlign: "center",
        fontSize: "30px",
        color: "var(--myGreen)",
      };
      
      return (
        <Wrapper>
        {!isAuth ? (
          <div className="container-finishedProjects">
            <NavBar links={links_noSession} />
            <Link style={LoadingStyle} to={"/login"}>
              Please LogIn
            </Link>
            {localStorage.clear()}
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
                            logo={logo}
                            projectId={project.finishedProjectID}
                            projectName={project.projectName}
                            projectTime={project.projectTime}
                            projectTeam={project.projectTeam}
                            projectDetails={project.projectDetails}
                            projectOwner={project.projectOwner}
                            projectOwnerPhoto={project.projectOwnerPhoto}
                            handleDelete={this.handleDelete}
                            timeLeft={0}
                            finishedProject_Style={
                              this.state.finishedProject_Style
                            }
                          />
                          {console.log(
                            "projects.projectOwnerPhoto",
                            finishedProjectsList
                          )}
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
  }
}

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
