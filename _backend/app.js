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

const port = process.env.PORT || 4000;

const optionsSessionStore = {
  host: "eu-cdbr-west-01.cleardb.com",
  user: "b5748a9b964b15",
  password: "94b7b847",
  database: "heroku_5cf8bc867f561e5",
};

// app.use(cookieParser());
// const sessionStore = new MySqlStore(optionsSessionStore);
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
// const allowedOrigins = ["http://localhost:3000"];

// const options = {
//   origin: allowedOrigins,
// };
// { options }
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//Controllers
app.use("/auth/", UserRoutes);
app.use("/project/", ProjectRoutes);
app.use("/aws/", upload.single("file"), AwsRoutes);

/* upload.single("file") */
// await FinishedProjects.sync({ force: true });

sequelize.sync({
  // force: true,
  // alter: true,
});

const server = app.listen(process.env.PORT || 4000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});

/* app.listen(port); */

/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Origin,X-Auth,X-Requested-With,Content-Type,Accept,content-type,application/json,x-auth,Access-Control-Request-Method,Access-Control-Request-Headers"
  );
  next();
}); */
