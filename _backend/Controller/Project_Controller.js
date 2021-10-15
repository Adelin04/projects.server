const { Op } = require("sequelize");
const Projects = require("../Models/Project_Model");

const GetProjectByUser = async (req, res) => {
  const userLooged = await req.body /* "Adelin Marin" */;
  console.log("userLooged.email", req.body);

  const listP = await Projects.findAll({
    where: {
      projectTeam: {
        [Op.like]: "%" + userLooged + "%"
      }
    }
  });

  res.send({ succes: true, projectsList: listP });
};

const PostCreateNewProject = (req, res) => {
  const {
    projectName,
    projectTeam,
    projectTime,
    projectDetails,
    projectOwner,
    projectOwnerPhoto
  } = req.body;

  if (req.body !== null) {
    Projects.findOne({
      where: { projectName: projectName }
    }).then(findProject => {
      if (!findProject) {
        const newProject = new Projects({
          projectName,
          projectTeam,
          projectTime,
          projectDetails,
          projectOwner,
          projectOwnerPhoto
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
  PostCreateNewProject: PostCreateNewProject
};
