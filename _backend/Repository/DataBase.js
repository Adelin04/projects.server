const Sequelize = require("sequelize");
require('dotenv').config()

const db_name = process.env.db_name;
const db_user = process.env.db_user;
const db_pass = process.env.db_pass;
const db_host = process.env.db_host;


const sequelize = new Sequelize(
  db_name,
  db_user,
  db_pass,
  {
    dialect: "mysql",
    host: db_host,
  }
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;
