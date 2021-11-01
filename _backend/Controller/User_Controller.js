const User = require("../Models/Users_Model");
const Projects = require("../Models/Project_Model");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (req.body !== null) {
    await User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((candidat) => {
        if (!candidat) return bcrypt.hashSync(password, 12);
      })
      .then((hashPassword) => {
        const newUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashPassword,
        });
        // req.session.user = newUser.id;
        res.send({ succes: true });
        return newUser.save();
      })
      .catch((error) => {
        // const newError = error.toString().split(":")[1];
        res.send({ succes: false });
      });
  } else res.send({ succes: false });
  // res.send({ succes: true });
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email);
  console.log("password", password);
  let existUser = await User.findOne({
    where: {
      email: email,
    },
  });
  if (existUser) {
    let doMatch = await bcrypt.compare(password, existUser.password);
    let token = jwt.sign({ user_id: User.id, email }, process.env.secretKey);
    if (doMatch) {
      //  req.session.user = existUser.id;
      // console.log("req.session", req.session.user);
      let capitalizeUser = `${existUser.firstName[0]} ${existUser.lastName[0]}`;
      let projectsList = await Projects.findAll({
        where: {
          projectTeam: {
            [Op.like]:
              "%" + `${existUser.firstName} ${existUser.lastName}` + "%",
          },
        },
      });
      return res.send({
        succes: true,
        token: token,
        userProfile: UserProfile(existUser),
        capitalizeUser: capitalizeUser,
        projectsList: projectsList,
      });
    } else return res.send({ succes: false });
  } else return res.send({ succes: false });
};

const UserProfile = (User) => {
  let profile = {
    id: User.id,
    firstName: User.firstName,
    lastName: User.lastName,
    email: User.email,
    role: User.role,
    urlPhoto: User.urlPhoto,
  };
  return profile;
};

const AuthChecker = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const verified = jwt.verify(token, process.env.secretKey);

    if (!verified) return res.send({ succes: false });
    const user = await User.findOne({
      where: {
        email: verified.email,
      },
    });

    let capitalizeUser = `${user.firstName[0]} ${user.lastName[0]}`;

    if (!user) return res.send({ succes: false });
    return res.send({
      succes: true,
      userProfile: UserProfile(user),
      capitalizeUser: capitalizeUser,
    });
  } catch (error) {
    console.log("err", error.toString());
    return res.send({ succes: false });
  }
};

const GetAllUsers = async (req, res) => {
  let listUsers_String = [];
  let allUsers = await User.findAll({
    attributes: ["firstName", "lastName"],
  });

  allUsers.forEach((element) => {
    listUsers_String.push(`${element.firstName} ${element.lastName}`);
  });

  res.status(200).send(listUsers_String);
};

const PostSetPhotoUser = async (req, res) => {
  console.log(req.body);
};

module.exports = {
  Register: Register,
  Login: Login,
  AuthChecker: AuthChecker,
  GetAllUsers: GetAllUsers,
  PostSetPhotoUser: PostSetPhotoUser,
};
