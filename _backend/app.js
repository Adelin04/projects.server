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

const port = process.env.PORT || 4000;

app.use(cookieParser());

/* const optionCorse = {
  origin: ["http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
}; */
const optionsSessionStore = {
  host: "eu-cdbr-west-01.cleardb.com",
  user: "b5748a9b964b15",
  password: "94b7b847",
  database: "heroku_5cf8bc867f561e5",
};
const sessionStore = new MySqlStore(optionsSessionStore);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

/* app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.secretKey,
    saveUninitialized: true,
    resave: false,
    proxy: true,
    store: sessionStore,
    cookie: { secure: false, httpOnly: false, maxAge: oneDay },
  })
); */

//Controllers
app.use("/auth/", UserRoutes);
app.use("/project/", ProjectRoutes);
app.use("/aws/", AwsRoutes);

// await FinishedProjects.sync({ force: true });
sequelize.sync({
  // force: true,
  // alter: true,
});

app.listen(port);
