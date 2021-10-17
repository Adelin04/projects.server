const User = require("../Models/Users_Model");
const { Op } = require("sequelize");
const Projects = require("../Models/Project_Model");
const jwt = require("jsonwebtoken");

const GetProjectByUser = async (req, res) => {
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

const PostCreateNewProject = (req, res) => {
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

module.exports = {
  GetProjectByUser: GetProjectByUser,
  PostCreateNewProject: PostCreateNewProject,
};
