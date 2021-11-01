const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MySqlStore = require("express-mysql-session")(session);
require("dotenv").config();
const app = express();

const UserRoutes = require("./Routes/UserRoutes");
const ProjectRoutes = require("./Routes/ProjectRoutes");
const AwsRoutes = require("./Routes/AwsRoutes");
const sequelize = require("./Repository/DataBase");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// const port = process.env.PORT || 4000;

const optionsSessionStore = {
  host: "eu-cdbr-west-01.cleardb.com",
  user: "b5748a9b964b15",
  password: "94b7b847",
  database: "heroku_5cf8bc867f561e5"
};

app.use(async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  await next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//Controllers
app.use("/auth/", UserRoutes);
app.use("/project/", ProjectRoutes);
app.use("/aws/", upload.single("file"), AwsRoutes);

sequelize.sync(
  {
    // force: true,
    // alter: true,
  }
);

const server = app.listen(process.env.PORT || 4000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});

// git checkout master -f
