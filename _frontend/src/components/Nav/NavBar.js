import React, { useContext, useState } from "react";

import "./NavBar.css";
import NavLinkTemplate from "./NavLinkTemplate";

import { URL_HEROKU } from "../_Utils/Dependency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
/* import { UserContext } from "../Context/UserContext"; */
import { NavLink } from "react-router-dom";
/* import PopUp_UserProfile from "../PopUp/PopUp_UserProfile"; */

//NavBar
const logo = <FontAwesomeIcon icon={faProjectDiagram} />;
const NavBar = ({ links }) => {
  /* const userLogged = useContext(UserContext); */
  const [visibility, setVisibility] = useState("hidden");

  const handleLogOut = async () => {
    const response = await fetch(`${URL_HEROKU}logout-user`);
    const responseJson = await response.json();
    console.log("responseJson", responseJson);
  };

  return (
    <div className="navBar">
      <div className="logo">
        {logo}
      </div>
      <div className="navBar-links">
        {links.map((link, index) => {
          return (
            <div className="link" key={index}>
              <NavLinkTemplate url={link.url} linkName={link.link} />
            </div>
          );
        })}
      </div>
    {/*   <div
        className="profile"
        onMouseOver={() => setVisibility("visible")}
        onMouseOut={() => setVisibility("hidden")}
      >
        <NavLink
          style={{ textDecoration: "none", color: "black" }}
          onClick={() => {
            localStorage.clear();
            handleLogOut();
          }}
          to={"/login"}
        >
          {" "}{userLogged && userLogged !== undefined
            ? `${userLogged.userLogged.capitalizeUserProfile}`
            : "X X"}
        </NavLink>
      </div>
      {visibility === "visible"
        ? <PopUp_UserProfile
            visibility={visibility}
            setVisibility={setVisibility}
          />
        : null} */}
    </div>
  );
};

export default NavBar;
