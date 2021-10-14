const User = require("../Models/Users_Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Register = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (req.body !== null) {
    User.findOne({
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
        // req.session.user = newUser.id;
        return newUser.save();
      });
    res.send({ succes: true });
  } else res.send({ succes: false });
  // res.send({ succes: true });
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  let existUser = await User.findOne({
    where: {
      email: email
    }
  });
  //  console.log("existUser", existUser);
  if (existUser) {
    let doMatch = await bcrypt.compare(password, existUser.password);
    let token = jwt.sign({ user_id: User.id, email }, process.env.secretKey);
    if (doMatch) {
      //  req.session.user = existUser.id;
      // console.log("req.session", req.session.user);
      let capitalizeUser = `${existUser.firstName[0]} ${existUser.lastName[0]}`;
      return res.send({
        succes: true,
        token: token,
        userProfile: UserProfile(existUser),
        capitalizeUser: capitalizeUser
      });
    } else return res.send({ succes: false });
  } else return res.send({ succes: false });
};

const UserProfile = User => {
  let profile = {
    firstName: User.firstName,
    lastName: User.lastName,
    email: User.email,
    role: User.role,
    urlPhoto: User.urlPhoto
  };
  return profile;
};

const AuthChecker = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const verified = jwt.verify(token, process.env.secretKey);
    console.log("verified", verified);
    if (!verified) return res.send({ succes: false });
    const user = await User.findOne({ _id: verified.id });
    let capitalizeUser = `${user.firstName[0]} ${user.lastName[0]}`;
    // console.log("user", user);
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

module.exports = {
  Register: Register,
  Login: Login,
  AuthChecker: AuthChecker,
  GetAllUsers: GetAllUsers
  /* UserProfile: UserProfile, */
};

// const GetLogin = (req, res) => {
//   if (req.session) {
//     console.log("session.user", req.session);
//     console.log("session.cookie", req.cookies);
//     return res.send({/*  session: req.session.user, */ succes: true });
//   } else {
//     return res.send(null);
//   }
// };

//https://codeforgeek.com/manage-session-using-node-js-express-4/

// req.session.isLoggedIn = true;
//     req.session.user = candidat;
//     return req.session.save();

/*
const USER_LOGGED = {};
const AllUsers = [];

 const NewSession = (req, res) => {
  session.Store.email = req.body.email;
  AllUsers.push(session.Store.email);
}; */

/*
      USER_LOGGED["firstName"] = existUser.firstName;
      USER_LOGGED["lastName"] = existUser.lastName;
      USER_LOGGED["role"] = existUser.role;
      USER_LOGGED["urlPhoto"] = existUser.urlPhoto;
      USER_LOGGED["email"] = existUser.email;
      NewSession(req, res);
      console.log("USER_LOGGED", session.Store);
      console.log("All_USER_LOGGED", AllUsers);
      */

//https://levelup.gitconnected.com/authentication-using-jwt-in-mern-1cc5c8ccd03c
