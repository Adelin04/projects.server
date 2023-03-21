import React, { useContext, useState } from "react";
import ReactAvatarEditor from "react-avatar-editor";
import Button from "./Button";

import "./Avatar.css";
import { Redirect } from "react-router";
import { URL_PRODUCTION } from "./Dependency";
import { CHANGE_PATH_USER_IMAGE } from "../Reducer/Action";
import { ProjectsContext } from "../Context/ProjectsContext";
import { UserContext } from "../Context/UserContext";

const Avatar = () => {
  const { projects, dispatch_projects } = useContext(ProjectsContext);
  const userLogged_ID = useContext(UserContext).userLogged.userLoggedInfo.id;
  const userLogged_EMAIL = useContext(UserContext).userLogged.userLoggedInfo.email;

  const [image, setImage] = useState(null);
  const [sizeImage, setSizeImage] = useState(null);
  const [allowZoomOut, setAllowZoomOut] = useState(false);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [borderRadius, setBorderRadius] = useState(0);
  const [preview, setPreview] = useState(null);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [txtBtn_Remove, setTxtBtn_Remove] = useState("Remove");
  const [txtBtn_Save, setTxtBtn_Save] = useState("Save");
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(5);
  const [redirect, setRedirect] = useState(false);
  const [dynamicMsg, setDynamicMsg] = useState("Maximum 1.25 Mb");
  const [loading, setLoading] = useState(false);

  const dynamicStyle = {
    margin: "0px auto 10px ",
    width: "auto",
    textAlign: "center",
    fontWeight: "bolder",
    fontSize: "20px",
    color: "salmon",
  };

  const handleNewImage = (e) => {
    setLoading({ Loading: true });

    if (e.target.files[0] !== undefined) {
      setImage(e.target.files[0]);
      setSizeImage(e.target.files[0].size);
    } else return null;
    if (image === null) setDynamicMsg("Maximum 1.25 Mb");
  };

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };

  const handlePositionChange = (position) => {
    setPosition(position);
  };

  const sendPhoto = () => {
    const userLoggedID = parseInt(userLogged_ID);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("userLoggedID", userLoggedID);
    formData.append("userLogged_EMAIL", userLogged_EMAIL);

    try {
      if (image !== null)
        if (sizeImage < 1048576) {
          fetch(`${URL_PRODUCTION}/aws/setPath/user-profile-photo`, {
            method: "POST",
            body: formData,
            headers: {
              Accept: "multipart/form-data",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              const { succes, urlPhoto, msg } = data;
              if (succes) {
                setDynamicMsg(msg.split(".")[0]);
                dispatch_projects({
                  type: CHANGE_PATH_USER_IMAGE,
                  payload: [
                    projects.projectsList.map((project) => {
                      if (
                        parseInt(project.projectOwnerPhoto_foreignKeyUserId) ===
                        userLoggedID
                      )
                        project.projectOwnerPhoto = urlPhoto;
                      return project;
                    }),
                  ],
                });
                setRedirect(succes);
              } else {
                setRedirect(succes);
                setDynamicMsg(msg);
              }
            })
            .catch((err) => {
              console.log(err);
              setDynamicMsg(err.toString());
            });
        } else {
          setDynamicMsg("The file is too large");
        }
    } catch (error) {
      setDynamicMsg(error.toString());
    }
  };

  return (
    <div className="container-img">
      {<div style={dynamicStyle}>{dynamicMsg}</div>}
      {redirect ? <Redirect to={"/dashboard"} /> : null}
      <div style={{ position: "relative" }} className="wrapper-img">

        <ReactAvatarEditor
          className="editor-canvas"
          scale={parseFloat(scale)}
          width={width}
          height={height}
          position={position}
          onPositionChange={handlePositionChange}
          rotate={parseFloat(rotate)}
          borderRadius={width / (100 / borderRadius)}
          image={image}
        />
      </div>
      <br />
      New File:
      <input
        className="custom-file-input"
        name="newImage"
        type="file"
        onChange={handleNewImage}
        onClick={() => {}}
      />
      <br />
      Zoom:
      <input
        name="scale"
        type="range"
        onChange={handleScale}
        min={minValue} /* {this.state.allowZoomOut ? "0.1" : "1"} */
        max={maxValue}
        step="0.01"
        defaultValue="1"
      />
      <Button
        onClick={() => {
          setImage(null);
        }}
        textBtn={txtBtn_Remove}
      />
      <br />
      <Button
        onClick={() => {
          sendPhoto();
          setImage(null);
        }}
        textBtn={txtBtn_Save}
      />
    </div>
  );
};

export default Avatar;
