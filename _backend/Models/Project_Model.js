const Sequelize = require("sequelize");
const sequelize = require("../ConnectionDB/DataBase");

const Project = sequelize.define("project", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    alloNull: false,
    primaryKey: true,
  },
  projectName: { type: Sequelize.STRING },
  projectTeam: { type: Sequelize.STRING },
  projectTime: { type: Sequelize.INTEGER },
  projectOwner: { type: Sequelize.STRING },
  projectDetails: { type: Sequelize.STRING },
  projectOwnerPhoto: { type: Sequelize.STRING },
  projectOwnerPhoto_foreignKeyUserId: { type: Sequelize.STRING },
  isFinished: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    defaultValue: Sequelize.fn("now"),
    type: Sequelize.DATE,
  },
  updatedAt: {
    defaultValue: Sequelize.fn("now"),
    type: Sequelize.DATE,
  },
});

module.exports = Project;
