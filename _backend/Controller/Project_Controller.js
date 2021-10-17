const User = require("../Models/Users_Model");
const { Op } = require("sequelize");
const Projects = require("../Models/Project_Model");
const jwt = require("jsonwebtoken");

const Get_ProjectByUser = async (req, res) => {
  const token = req.headers.authorization;
  const { email } = jwt.verify(token, process.env.secretKey);

  const userLogged = await User.findOne({
    attributes: ["firstName", "lastName"],
    where: { email: email },
  });

  const projectsList = await Projects.findAll({
    where: {
      projectTeam: {
        [Op.like]: "%" + `${userLogged.firstName} ${userLogged.lastName}` + "%",
      },
    },
  });

  res.send({ succes: true, projectsList: projectsList });
};

const Post_CreateNewProject = (req, res) => {
  const {
    projectName,
    projectTeam,
    projectTime,
    projectDetails,
    projectOwner,
    projectOwnerPhoto,
  } = req.body;

  if (req.body !== null) {
    Projects.findOne({
      where: { projectName: projectName },
    }).then((findProject) => {
      if (!findProject) {
        const newProject = new Projects({
          projectName,
          projectTeam,
          projectTime,
          projectDetails,
          projectOwner,
          projectOwnerPhoto,
        });
        console.log(newProject);
        res.send({ succes: true });
        return newProject.save();
      } else res.send({ succes: false });
    });
  } else res.send({ succes: false });
};

const Get_FinishedProject = async (req, res) => {
  const token = req.headers.authorization;
  const { email } = jwt.verify(token, process.env.secretKey);

  const userLogged = await User.findOne({
    attributes: ["firstName", "lastName"],
    where: { email: email },
  });

  const finishedProjectsList = await Projects.findAll({
    where: {
      projectTeam: {
        [Op.like]: "%" + `${userLogged.firstName} ${userLogged.lastName}` + "%",
      },
      isFinished: { [Op.like]: true },
    },
  });
  console.log("finishedProjectsList", finishedProjectsList);
  res.send({ succes: true, finishedProjectsList: finishedProjectsList });
};

const Post_SetFinishedProject = async (req, res) => {
  const finishedProject_ID = req.params.id;
  await Projects.update(
    { isFinished: true },
    { where: { id: finishedProject_ID } }
  );
  res.send({ succes: true });
};

const Post_DeleteProject = async (req, res) => {
  const deleteProject_ID = req.params.id;
  try {
    await Projects.destroy({ where: { id: deleteProject_ID } });
    res.send({ succes: true });
  } catch (error) {
    console.log(error.toString());
  }
};

module.exports = {
  Get_ProjectByUser: Get_ProjectByUser,
  Post_CreateNewProject: Post_CreateNewProject,
  Get_FinishedProject: Get_FinishedProject,
  Post_SetFinishedProject: Post_SetFinishedProject,
  Post_DeleteProject: Post_DeleteProject,
};
