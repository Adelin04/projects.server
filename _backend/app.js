const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MySqlStore = require("express-mysql-session")(session);
const UserRoutes = require("./Routes/UserRoutes");
const ProjectRoutes = require("./Routes/ProjectRoutes");
const AwsRoutes = require("./Routes/AwsRoutes");
const sequelize = require("./Repository/DataBase");
const multer = require("multer");

//  emv config
require("dotenv").config();

//  start express app
const app = express();

const upload = multer({ dest: "uploads/" });


//  Middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//  CORS
app.use(cors())


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
  console.log(`Server is running on port ${port}`);
});

// git checkout master -f
