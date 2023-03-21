const Sequelize = require("sequelize");
require('dotenv').config()

//  DB credentials
const db_name = process.env.db_name;
const db_user = process.env.db_user;
const db_pass = process.env.db_pass;
const db_host = process.env.db_host;
const db_port = process.env.db_port;

//  DB Connection with Sequelize ORM
// const sequelize = new Sequelize('ssh -f -L 5433:127.0.0.1:5432 maverick@139.162.169.107 -N', {
//   logging: true, dialect: "postgres"
// })
/* const sequelize = new Sequelize(`postgres://${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}`, {
  pool: {
    max: 10,
    idle: 30000
  },
}) */

const sequelize = new Sequelize(db_name, db_user, db_pass, {
  host: db_host,
  port: 5433,
  dialect: "postgres",
});

module.exports = sequelize;
