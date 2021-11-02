import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./PopUp_Styles.css";
import { UserContext } from "../Context/UserContext";

const handleLogOut = async () => {
  //const response = await fetch(`${URL_HEROKU}logout-user`);
  // const responseJson = await response.json();
};

const PopUp_UserProfile = ({ visibility, setVisibility }) => {
  const { capitalizeUser, isAuth } = useContext(UserContext).userLogged;
  const { role } = useContext(UserContext).userLogged.userLoggedInfo;
  let roles = [];

  if (role !== null && role !== undefined) {
    const TMP_roles = role.split(",");
    TMP_roles.forEach(element => {
      roles.push(element.split("_")[1] + "/");
    });
  }

  if (isAuth) {
    return (
      <div
        className="wrapper-popUp"
        onMouseEnter={() => setVisibility("visible")}
        onMouseLeave={() => setVisibility("hidden")}
      >
        {isAuth
          ? <div
              style={{ visibility: `${visibility}` }}
              className="conainer-popUp"
            >
              <div className="popUp-userName">
                {capitalizeUser}
              </div>

              <div style={{ textDecoration: "none" }} className="popUp-role">
                <div style={{ fontSize: "15px" }}> Role</div>
                <p className="popUp-role">{`${roles}`}</p>
              </div>
              <hr style={{ background: "black" }} />
              <div className="wrapper-popUp-setting-popUp-logout">
                <div className="popUp-setting-btn">
                  <Link style={{ textDecoration: "none" }} to="/user-profile">
                    Setting user
                  </Link>
                </div>

                <div className="popUp-logout-btn">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/"
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/";
                      handleLogOut();
                    }}
                  >
                    Log out
                  </Link>
                </div>
              </div>
            </div>
          : <div className="wrapper-popUp">
              <div
                style={{ visibility: `${visibility}` }}
                onMouseEnter={() => setVisibility("visible")}
                onMouseLeave={() => setVisibility("visible")}
              >
                <div
                  style={{ visibility: `${visibility}` }}
                  className="conainer-popUp"
                >
                  <div className="popUp-logout-btn">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/login"
                      onClick={() => {
                        localStorage.clear();
                      }}
                    >
                      Log In
                    </Link>
                  </div>
                </div>
              </div>
            </div>}
      </div>
    );
  } else {
    return null;
  }
};

export default PopUp_UserProfile;
