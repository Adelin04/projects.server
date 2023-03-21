const User = require("../Models/Users_Model");
const Projects = require("../Models/Project_Model").default;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//  POST: Register new user
const Register = async (req, res) => {
  //  destructuring the req object
  const { firstName, lastName, email, password } = req.body;

  // check if the current user already has an account and if it is null, create a new user
  if (req.body !== null) {
    await User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(candidat => {
        if (!candidat) return bcrypt.hashSync(password, 12);
      })
      .then(hashPassword => {
        const newUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashPassword
        });
        res.send({ succes: true });
        return newUser.save();
      })
      .catch(error => {
        const newError = error.toString().split(":")[1];
        res.send({ succes: false, error: newError });
      });
  } else res.send({ succes: false });
};

//  POST: Login user 
const Login = async (req, res) => {
  //  destructuring the req object
  const { email, password } = req.body;

  //  check if email from current user exist
  let existUser = await User.findOne({
    where: {
      email: email
    }
  });

  if (!existUser) {
    return res.send({ succes: false, msg: 'For this email address is not created an account ' });
  }

  //  compare hash password for current user with the exist hash password from db
  let doMatch = await bcrypt.compare(password, existUser.password);
  //  if exist password matching generate a new token

  if (doMatch) {
    let token = jwt.sign({ user_id: User.id, email }, process.env.secretKey);
    //  req.session.user = existUser.id;
    // console.log("req.session", req.session.user);
    let capitalizeUser = `${existUser.firstName[0]} ${existUser.lastName[0]}`;

    // get all projects for current user by user name
    let projectsList = await Projects.findAll({
      where: {
        projectTeam: {
          [Op.like]:
            "%" + `${existUser.firstName} ${existUser.lastName}` + "%"
        }
      }
    });

    //  return an object with new token,user profile and user details and all projects for current user 
    return res.send({
      succes: true,
      token: token,
      userProfile: UserProfile(existUser),
      capitalizeUser: capitalizeUser,
      projectsList: projectsList
    });

  }
  return res.send({ succes: false, msg: 'Something went wrong' });
};


//  method to creating a new user profile
const UserProfile = User => {
  let profile = {
    id: User.id,
    firstName: User.firstName,
    lastName: User.lastName,
    email: User.email,
    role: User.role,
    urlPhoto: User.urlPhoto
  };
  return profile;
};


//  method to check if user is authenticate
const AuthChecker = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const verified = jwt.verify(token, process.env.secretKey);

    if (!verified) return res.send({ succes: false });
    const user = await User.findOne({
      where: {
        email: verified.email
      }
    });

    let capitalizeUser = `${user.firstName[0]} ${user.lastName[0]}`;

    if (!user) return res.send({ succes: false });
    return res.send({
      succes: true,
      userProfile: UserProfile(user),
      capitalizeUser: capitalizeUser
    });
  } catch (error) {
    console.log("err", error.toString());
    return res.send({ succes: false });
  }
};

//  GET: get list with all users
const GetAllUsers = async (req, res) => {
  let listUsers_String = [];
  let allUsers = await User.findAll({
    attributes: ["firstName", "lastName"]
  });

  allUsers.forEach(element => {
    listUsers_String.push(`${element.firstName} ${element.lastName}`);
  });

  res.status(200).send(listUsers_String);
};

// POST: 
const PostSetPhotoUser = async (req, res) => {
  // console.log(req.body);
};

module.exports = {
  Register: Register,
  Login: Login,
  AuthChecker: AuthChecker,
  GetAllUsers: GetAllUsers,
  PostSetPhotoUser: PostSetPhotoUser,
  UserProfile: UserProfile
};
