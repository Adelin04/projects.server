import React from "react";

//style
import "./SliderUsers.css";

const SliderUsers = ({ isActiv, usersList }) => {
  return (
    <div className={`slider-users ${isActiv}`}>
      {usersList}
      {usersList}
      {usersList}
    </div>
  );
};

export default SliderUsers;
