import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faEdit } from "@fortawesome/free-solid-svg-icons";
//import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
//import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const collaps_up = <FontAwesomeIcon icon={faChevronUp} />;
const collaps_down = <FontAwesomeIcon icon={faChevronDown} />;
//const editIcon = <FontAwesomeIcon icon={faEdit} />;
//const doneIcon = <FontAwesomeIcon icon={faCheckSquare} />;
//const deleteIcon = <FontAwesomeIcon icon={faTrash} />;

const ProjectTemplate = ({
  logo,
  projectId,
  projectName,
  projectTeam,
  projectTime,
  projectDetails,
  handleEdit,
  handleDone,
  handleDelete,
  handleCollapse,
  finishedProject_Style,
  timeLeft,
  projectOwnerPhoto,
  projectOwner,
  dynamicMsg,
}) => {
  const [display, setDisplay] = useState("none");
  const [transition, setTransition] = useState("");
  const [isActiv, setIsActiv] = useState("active");
  const [iconCollapse, setIconCollapse] = useState(collaps_down);
  const [remainingTime, setRemainingTime] = useState(projectTime - timeLeft);
  const [percentBar, setPercentBar] = useState((timeLeft * 100) / projectTime);

  const [styleBar, setStyleBar] = useState(
    remainingTime <= 0
      ? { width: `${percentBar}%`, background: "red" }
      : { width: `${percentBar}%`, background: " var(--myGreen)" }
  );

  handleCollapse = () => {
    /*     if (display === "none") {
      setDisplay("flex");
      setIconCollapse(collaps_up);
    } else {
      setDisplay("none");
      setIconCollapse(collaps_down);
    } */
    if (isActiv === "active") {
      setIconCollapse(collaps_up);
      setIsActiv(null);
    } else if (isActiv === null) {
      setIsActiv("active");
      setIconCollapse(collaps_down);
    }
  };
  const styleCollapseBtn = {
    display: display,
  };

  const dynamicStyle = {
    margin: "0px auto 10px ",
    width: "auto",
    textAlign: "center",
    fontWeight: "bolder",
    fontSize: "20px",
    color: "salmon",
  };

  return (
    <div className="card-project">
      {<div style={dynamicStyle}>{dynamicMsg}</div>}
      <div className="wrapper-titleProject-btnProject">
        <div className="info-card-project">
          <div className="wrapper-info-card-project-projectName">
            <h2 className="info-card-project-projectName ">
              <p className="info-card-project-logo">{logo}</p>
              {projectName}
            </h2>
          </div>

          <div className="wrapper-card-project-owner">
            <div className="card-project-owner">
              {projectOwnerPhoto !== null ? (
                <img
                  className="card-project-owner-img"
                  src={projectOwnerPhoto}
                  alt={"Owner Photo"}
                />
              ) : null}
              <h3 className="card-project-owner-name">{projectOwner}</h3>
            </div>
          </div>
        </div>

        <div className="btn-card-project">
          <div className="wrapper-btn-colaps">
            <button
              className="btn-colaps "
              id={projectId}
              onClick={handleCollapse}
            >
              {iconCollapse}
            </button>
          </div>

          <div className="buttons">
            <button
              className="btn-card-project-edit"
              id={projectId}
              onClick={handleEdit}
              style={finishedProject_Style}
            >
              Edit
            </button>

            <button
              className="btn-card-project-done"
              id={projectId}
              onClick={handleDone}
              value={projectId}
              style={finishedProject_Style}
            >
              Done
            </button>

            <button
              className="btn-card-project-del"
              id={projectId}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div
        /* style={styleCollapseBtn} */
        className={`wrapper-info-card-project-projectTeam-projectTime-projectDetails ${isActiv}`}
      >
        <div className="info-card-project-projectTeam">
          <div className="wrapper-label-info-card-project-projectTeam">
            <label className="label-info-card-project-projectTeam">
              {" "}
              Team{" "}
            </label>
          </div>
          <div className="projectTeam">{projectTeam}</div>
        </div>

        <div className="info-card-project-projectTime">
          {/*  <div className="wrapper700px"> */}
          <div className="wrapper-label-info-card-project-projectTime">
            <label className="label-info-card-project-projectTime">
              {" "}
              Deadline{" "}
            </label>
          </div>

          <div className="container-timeLeft" style={finishedProject_Style}>
            <div className="remainingTime">
              <p className="timeline" style={styleBar} />
              <p className="days-left">
                {" "}
                {remainingTime && remainingTime <= 0
                  ? " "
                  : `${remainingTime.toString()} ${
                      remainingTime > 1 ? "days" : "day"
                    }`}
              </p>
            </div>

            <div className="wrapper-projectTime">
              {remainingTime && remainingTime > 0 ? (
                <p className="projecTime flex350">{`${projectTime}  ${
                  projectTime > 1 ? "days" : "day"
                }`}</p>
              ) : (
                <p className="projecTime flex350">Time Expired</p>
              )}
            </div>
          </div>
        </div>

        <div className="info-card-project-projectDetails">
          <div className="wrapper-label-info-card-project-projectDetails">
            <label className="label-info-card-project-projectDetails">
              {" "}
              Details{" "}
            </label>
          </div>
          <p className="projectDetails">{projectDetails}</p>
        </div>
      </div>
    </div>
  );
};
export default ProjectTemplate;
