import React from "react";
import "./Button.css";

const Input = ({ className, textInput }) => {
  return (
    <div>
      <input className={className} name="newImage" type="file">
        {textInput}
      </input>
    </div>
  );
};

export default Input;
