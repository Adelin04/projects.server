const Sequelize = require("sequelize");
const sequelize = require("../ConnectionDB/DataBase");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: { type: Sequelize.STRING },
  role: { type: Sequelize.STRING, defaultValue: "role_user" },
  urlPhoto: { type: Sequelize.STRING },
  createdAt: {
    defaultValue: Sequelize.fn("now"),
    type: Sequelize.DATE,
  },
  updatedAt: {
    defaultValue: Sequelize.fn("now"),
    type: Sequelize.DATE,
  },
});

module.exports = User;
