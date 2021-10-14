const express = require("express");
const User_Controller = require("../Controller/User_Controller");
const router = express.Router();

router.post("/register", User_Controller.Register);
router.get("/authChecker", User_Controller.AuthChecker);
router.post("/login", User_Controller.Login);
router.get("/get/all-users", User_Controller.GetAllUsers);
/* router.post("/user-profile", User_Controller.UserProfile); */

module.exports = router;
