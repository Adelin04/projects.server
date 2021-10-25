import React from "react";

//style
import "./SliderUsers.css";

const SliderUsers = ({ isActiv, usersList }) => {
  return <div className={"slider-users " + `${isActiv}`}>{usersList}</div>;
};

export default SliderUsers;
