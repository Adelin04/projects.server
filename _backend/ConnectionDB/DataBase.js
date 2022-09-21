const Sequelize = require("sequelize");
require('dotenv').config()

//  DB credentials
const db_name = process.env.db_name;
const db_user = process.env.db_user;
const db_pass = process.env.db_pass;
const db_host = process.env.db_host;


//  DB Connection with Sequelize ORM
const sequelize = new Sequelize(
  db_name,
  db_user,
  db_pass,
  {
    dialect: "mysql",
    host: db_host,
  }
);

module.exports = sequelize;
