const express = require("express");
const Aws_Controller = require("../Controller/Aws_Controller");
const router = express.Router();

router.post("/setPath/user-profile-photo", Aws_Controller.UploadFile);

module.exports = router;
