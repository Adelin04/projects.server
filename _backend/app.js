const express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");

// const session = require("express-session");
const cookieParser = require("cookie-parser");

const sequelize = require("./ConnectionDB/DataBase");
const tunnel = require('tunnel-ssh');

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

/* users = {
  "user1": { "name": "mahesh", "password": "password1", "profession": "teacher", "id": 1 },
  "user2": { "name": "suresh", "password": "password2", "profession": "librarian", "id": 2 },
  "user3": { "name": "ramesh", "password": "password3", "profession": "clerk", "id": 3 },
  "user4": { "name": "mohit", "password": "password4", "profession": "teacher", "id": 4 },
  "user5": { "name": "carnat", "password": "password4", "profession": "teacher", "id": 5 },
  "user6": { "name": "carnat2", "password": "password4", "profession": "teacher", "id": 6 },
} */

//  Routes
app.use("/auth/", UserRoutes);
app.use("/project/", ProjectRoutes);
app.use("/aws/", upload.single("file"), AwsRoutes);

/* app.get("/", (req,res) => {
  return res.json({users})
}); */




//  start server
/* const server = app.listen(process.env.PORT || 4000, async () => {
  const port = server.address().port;

  sequelize.authenticate().then(() => {
    console.log(`Server is running on port ${port}`);
    console.log('Connection has been established successfully.');

    sequelize.sync(
      {
        // force: true,
        // alter: true,
      }
    );
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

}); */

const sshConfig = {
  user: 'maverick',
  host: '139.162.169.107',
  port: 22,
  dstHost: 'localhost',
  dstPort: 5432,
  localHost: 'localhost',
  localPort: 3307
}


// initiate tunnel
tunnel(sshConfig, (error, server) => {
  if(error) {
    console.error(error);
  } else {
    console.log('server:', server);

    sequelize
        .authenticate()
        .then((db) => {
            console.log('CONNECTION ESTABLISHED! ', db);
        })
        .catch((err) => {
            console.error('UNABLE TO ESTABLISH CONNECTION: ', err);
        })
  }
})