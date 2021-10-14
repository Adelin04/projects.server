const Project = require("../Models/Project_Model");

const GetProjectByUser = (req, res) => {};

const PostCreateNewProject = (req, res) => {
  const {
    projectsName,
    projectTeam,
    projectTime,
    projectOwner,
    projectOwnerPhoto
  } = req.body;

  if (req.body !== null) {
    Project.findOne({
      where: { projectsName: projectsName }
    }).then(findProject => {
      if (!findProject) {
        const newProject = new Project(
          projectsName,
          projectTeam,
          projectTime,
          projectOwner,
          projectOwnerPhoto
        );
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
