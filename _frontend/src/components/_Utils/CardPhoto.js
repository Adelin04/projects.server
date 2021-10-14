import React from "react";

const CardPhoto = ({ img, imgName, alt }) => {
  return (
    <div className="cardPhoto">
      <img className="img" src={img} alt={alt} />
      <p className="img-name">{imgName}</p>
    </div>
  );
};

export default CardPhoto;
