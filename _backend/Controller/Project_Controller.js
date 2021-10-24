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

const Post_CreateNewProject = async (req, res) => {
  const {
    projectName,
    projectTeam,
    projectTime,
    projectDetails,
    projectOwner,
    projectOwnerPhoto,
    projectOwnerPhoto_foreignKeyUserId,
  } = req.body;

  if (req.body !== null) {
    await Projects.findOne({
      where: { projectName: projectName },
    }).then((findProject) => {
      if (!findProject) {
        let newProject = new Projects({
          projectName,
          projectTeam,
          projectTime,
          projectDetails,
          projectOwner,
          projectOwnerPhoto,
          projectOwnerPhoto_foreignKeyUserId,
        });
        newProject.save().then(() => {
          return res.send({ succes: true, newProject: newProject });
        });
      } else res.send({ succes: false });
    });
  } else res.send({ succes: false });
};

const Get_EditProject = async (req, res) => {
  const editProject_ID = req.params.id;
  const editProject = await Projects.findOne({
    where: { id: editProject_ID },
  });
  return res.send({ succes: true, editProject: editProject });
};

const Put_EditedProject = async (req, res) => {
  const editedProject_ID = req.params.id;

  try {
    const foundItem = await Projects.findOne({
      where: { id: editedProject_ID },
    });

    if (foundItem) {
      await Projects.update(req.body, {
        where: { id: editedProject_ID },
      });

      const editedProject = await Projects.findOne({
        where: { id: editedProject_ID },
      });
      return res.send({ succes: true, editedProject: editedProject });
    }
  } catch (error) {
    return res.send({ succes: false, error: error.toString });
  }
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
  res.send({ succes: true, finishedProjectsList: finishedProjectsList });
};

const Post_SetFinishedProject = async (req, res) => {
  const finishedProject_ID = req.params.id;
  try {
    await Projects.update(
      { isFinished: true },
      { where: { id: finishedProject_ID } }
    );
    res.send({ succes: true });
  } catch (error) {
    res.send({ error: error.toString() });
    console.log(error.toString());
  }
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
  Get_EditProject: Get_EditProject,
  Put_EditedProject: Put_EditedProject,
  Get_FinishedProject: Get_FinishedProject,
  Post_SetFinishedProject: Post_SetFinishedProject,
  Post_DeleteProject: Post_DeleteProject,
};
