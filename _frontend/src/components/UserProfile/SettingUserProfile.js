import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import NavBar from "../Nav/NavBar";
import Avatar from "../_Utils/Avatar";

import "./SettingUserProfile.css";

let links = [
  { url: "/", link: "Home" },
  { url: "/dashboard", link: "Dashboard" },
];

const links_noSession = [
  { url: "/login", link: "LogIn" },
  { url: "/register", link: "SignUp" },
];

const SettingUserProfile = () => {
  const {userLogged}= useContext(UserContext);
  const { isAuth } = useContext(UserContext).userLogged;
// console.log(user);
  return (
    <div>
      {isAuth ? (
        <div className="setting">
          <NavBar links={links} />
          <h1>Setting</h1>

          <h3>Personal Info</h3>
          <div className="personal-info">
            <div className="photo">{<Avatar />}</div>

            <div className="personal-data">
              {userLogged ? (
                <div>
                  <p>
                    First Name :{" "}
                    {`${userLogged.userLoggedInfo.firstName}`}
                  </p>{" "}
                  <p>
                    Last Name :{" "}
                    {`${userLogged.userLoggedInfo.lastName}`}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <NavBar links={links_noSession} />
      )}
    </div>
  );
};

export default SettingUserProfile;
