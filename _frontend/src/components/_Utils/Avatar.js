import React, { useContext, useState } from "react";
import ReactAvatarEditor from "react-avatar-editor";
import Button from "./Button";

import "./Avatar.css";
import { Redirect } from "react-router";
import { URL_HEROKU } from "./Dependency";
import { CHANGE_PATH_USER_IMAGE } from "../Reducer/Action";
import { ProjectsContext } from "../Context/ProjectsContext";
import { UserContext } from "../Context/UserContext";

const Avatar = () => {
  const { projects, dispatch } = useContext(ProjectsContext);
  const { userLogged } = useContext(UserContext);
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
    const formData = new FormData();
    formData.append("multipartFile", image);
    const userLoggedID = parseInt(userLogged.userInfo.user.userID);

    if (image !== null)
      if (sizeImage < 1048576) {
        fetch(`${URL_HEROKU}setPath/user-profile-photo`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.succes) {
              /*               console.log("data set photo ->", data);
              const items = projects.projects.map((project) => {
                if (parseInt(project.userID_foreign) === userLoggedID)
                  project.projectOwnerPhoto = data.finalEndpointUrl;
                return project;
              });
              items.forEach((element) => {
                console.log("items", element);
              }); */
              dispatch({
                type: CHANGE_PATH_USER_IMAGE,
                payload: [
                  projects.projects.map((project) => {
                    if (parseInt(project.userID_foreign) === userLoggedID)
                      project.projectOwnerPhoto = data.finalEndpointUrl;
                    return project;
                  }),
                ],
              });
              setRedirect(true);
            }
          })
          .catch((err) => {
            console.log(err);
            setDynamicMsg(err.toString());
          });
      } else {
        setDynamicMsg("The file is too large");
      }
  };

  return (
    <div className="container-img">
      {redirect ? <Redirect to={"/dashboard"} /> : null}
      {<div style={dynamicStyle}>{dynamicMsg}</div>}
      <div style={{ position: "relative" }} className="wrapper-img">
        {/*           <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              fontSize: "25px"
            }}
            >
            {this.state.Loading ? "Loading..." : null}
          </div> */}
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

/* class Avatar extends React.Component {
   static contextType = ProjectsContext;
   state = {
     image: null,
     sizeImage: null,
     allowZoomOut: false,
     position: { x: 0.5, y: 0.5 },
     scale: 1,
     rotate: 0,
     borderRadius: 0,
     preview: null,
     width: 200,
     height: 200,
     txtBtn_Remove: "Remove",
     txtBtn_Save: "Save",
     minValue: 1,
     maxValue: 5,
     redirect: false,
     dynamicMsg: "Maximum 1.25 Mb",
     Loading: false,
     userLogged: null,
   };
 
   dynamicStyle = {
     margin: "0px auto 10px ",
     width: "auto",
     textAlign: "center",
     fontWeight: "bolder",
     fontSize: "20px",
     color: "salmon",
   };
 
   handleNewImage = (e) => {
     this.context.projects.projects.forEach((element) => {
       console.log(element.userID_foreign);
     });
     console.log("this", this.userLogged);
     this.setState({ Loading: true });
 
     if (e.target.files[0] !== undefined) {
       this.setState({ image: e.target.files[0] });
       this.setState({ sizeImage: e.target.files[0].size });
     } else return null;
     if (this.state.image === null)
       this.setState({ dynamicMsg: "Maximum 1.25 Mb" });
     console.log("context", this.context.userLogged.userInfo.user.userID);
   };
 
   handleScale = (e) => {
     const scale = parseFloat(e.target.value);
     this.setState({ scale });
 
     console.log(scale);
   };
 
   handlePositionChange = (position) => {
     this.setState({ position });
   };
 
   sendPhoto = () => {
     const formData = new FormData();
     formData.append("multipartFile", this.state.image);
 
     console.log(this.state.image);
     if (this.state.image !== null)
       if (this.state.sizeImage < 1048576) {
         fetch(`${URL_HEROKU}setPath/user-profile-photo`, {
           method: "POST",
           body: formData,
         })
           .then((response) => response.json())
           .then((data) => {
             if (data.succes) {
               console.log("data set photo ->", data);
               this.context.dispatch({
                 type: CHANGE_PATH_USER_IMAGE,
                 payload: [
                   this.context.projects.projects.map((project) => {
                     if (
                       project.sUertID_foreign ===
                       this.userLogged.userLogged.userInfo.user.userID
                       )
                     project.projectOwnerPhoto = data.finalEndpointUrl;
                   }),
                 ],
               });
               this.setState({ redirect: true });
             }
           })
           .catch((err) => {
             console.log(err);
             this.setState({ dynamicMsg: err.toString() });
           });
       } else {
         this.setState({ dynamicMsg: "The file is too large" });
       }
   };
 
   render() {
     return (
       <div className="container-img">
         {this.state.redirect ? <Redirect to={"/dashboard"} /> : null}
         {<div style={this.dynamicStyle}>{this.state.dynamicMsg}</div>}
         <div style={{ position: "relative" }} className="wrapper-img">
                     <div
             style={{
               position: "absolute",
               left: "50%",
               top: "50%",
               transform: "translate(-50%,-50%)",
               fontSize: "25px"
             }}
             >
             {this.state.Loading ? "Loading..." : null}
           </div>
           <ReactAvatarEditor
             className="editor-canvas"
             scale={parseFloat(this.state.scale)}
             width={this.state.width}
             height={this.state.height}
             position={this.state.position}
             onPositionChange={this.handlePositionChange}
             rotate={parseFloat(this.state.rotate)}
             borderRadius={this.state.width / (100 / this.state.borderRadius)}
             image={this.state.image}
           />
         </div>
         <br />
         New File:
         <input
           className="custom-file-input"
           name="newImage"
           type="file"
           onChange={this.handleNewImage}
           onClick={() => {}}
         />
         <br />
         Zoom:
         <input
           name="scale"
           type="range"
           onChange={this.handleScale}
           min={
             this.state.minValue
           } //{this.state.allowZoomOut ? "0.1" : "1"}
           max={this.state.maxValue}
           step="0.01"
           defaultValue="1"
         />
         <Button
           onClick={() => {
             this.setState({ image: null });
           }}
           textBtn={this.state.txtBtn_Remove}
         />
         <br />
         <Button
           onClick={() => {
             this.sendPhoto();
             this.setState({ image: null });
           }}
           textBtn={this.state.txtBtn_Save}
         />
       </div>
     );
   }
 }
 
 export default Avatar; */
