const express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");

// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const MySqlStore = require("express-mysql-session")(session);
// const sequelize = require("./ConnectionDB/DataBase");

const UserRoutes = require("./Routes/UserRoutes");
const ProjectRoutes = require("./Routes/ProjectRoutes");
const AwsRoutes = require("./Routes/AwsRoutes");
const { json } = require("body-parser");

//  emv config
require("dotenv").config();

//  Server Handling
const app = express();

const upload = multer({ dest: "uploads/" });


//  Middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// creating 24 hours from milliseconds
// const oneDay = 1000 * 60 * 60 * 24;

//  CORS
app.use(cors())

users = {
  "user1": { "name": "mahesh", "password": "password1", "profession": "teacher", "id": 1 },
  "user2": { "name": "suresh", "password": "password2", "profession": "librarian", "id": 2 },
  "user3": { "name": "ramesh", "password": "password3", "profession": "clerk", "id": 3 },
  "user4": { "name": "mohit", "password": "password4", "profession": "teacher", "id": 4 }
}

//  Routes
app.use("/auth/", UserRoutes);
app.use("/project/", ProjectRoutes);
app.use("/aws/", upload.single("file"), AwsRoutes);

app.get("/", (req,res) => {
  return res.json({users})
});

/* sequelize.sync(
  {
    // force: true,
    // alter: true,
  }
); */


//  start server
const server = app.listen(process.env.PORT || 4000, async () => {

  // try {

  //   await sequelize.authenticate().then(() => {
  //     console.log('Connection has been established successfully.');

  //     const port = server.address().port;
  //     console.log(`Server is running on port ${port}`);

  //   }).catch((error) => {
  //     console.error('Unable to connect to the database: ', error);
  //   });

  // } catch (error) {
  //   console.error('Error connection: ', error);
  // }
  const port = server.address().port;
  console.log(`Server is running on port ${port}`);

});
