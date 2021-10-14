import React, { useContext } from "react";
import styled from "styled-components";

import ProjectsList from "../Projects/ProjectsList";
import Footer from "../Footer/Footer";
import NavBar from "../Nav/NavBar";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { ProjectsContext } from "../Context/ProjectsContext";

const links = [
  { url: "/", link: "Home" },
  { url: "/new-project", link: "New Project" },
  { url: "/finished-projects", link: "Finished Projects" }
];

const links_noSession = [
  { url: "/login", link: "LogIn" },
  { url: "/register", link: "SignUp" }
];

const LoadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  fontSize: "30px",
  color: "var(--myGreen)"
};

const Dashboard = () => {
/*   const userLogged = useContext(UserContext);
  const projects = useContext(ProjectsContext);
  const isLoading = projects.projects.isLoading; */

  // console.log("userLogged dashboard", userLogged);
  // console.log("projects dashboard", projects.projects.isLoading);
  if (true/* isLoading */) return <div style={LoadingStyle}>Loading...</div>;
  else {
    return (
      <Wrapper>
        {/* {userLogged.userLogged.userInfo.succes
          ? <div className='wrapper-dash'>
            <NavBar links={links} />

                <div className='dashboard'>
                <ProjectsList />
                </div>
              
            </div>
          : <div>
              <NavBar links={links_noSession} />
            </div>} */}
          <Footer />
      </Wrapper>
    );
  }
};

export default Dashboard;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: auto;
  
  .wrapper-dash{    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .dashboard {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: auto;
    /* background:skyblue; */
    /* overflow:auto; */
  }
`;
