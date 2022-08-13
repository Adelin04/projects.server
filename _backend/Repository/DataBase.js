const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "heroku_5cf8bc867f561e5",
  "b5748a9b964b15",
  "94b7b847",
  {
    dialect: "mysql",
    host: "eu-cdbr-west-01.cleardb.com",
    /* operatorsAliases: false, */
  }
);

module.exports = sequelize;
