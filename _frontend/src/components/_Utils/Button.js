import React from "react";
import "./Button.css";

const Button = ({ textBtn,onClick }) => {
  return (
    <div>
      <button onClick={onClick} className="prjectsApp-btn">{textBtn}</button>
    </div>
  );
};

export default Button;
