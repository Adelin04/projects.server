// const mysql = require("mysql2");
// const pool = mysql.createPool({
//   host: "eu-cdbr-west-01.cleardb.com",
//   user: "b5748a9b964b15",
//   password: "94b7b847",
//   database: "heroku_5cf8bc867f561e5",
// });

// module.exports = pool.promise();

// const connection = mysql.createConnection({
//   host: "eu-cdbr-west-01.cleardb.com",
//   user: "b5748a9b964b15",
//   password: "94b7b847",
//   database: "heroku_5cf8bc867f561e5",
// });
// module.exports = connection;

// Sequelize

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
