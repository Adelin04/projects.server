const express = require("express");
const Project_Controller = require("../Controller/Project_Controller");
const router = express.Router();

router.get("/get/projects", Project_Controller.GetProjectByUser);
router.get("/post/newProject", Project_Controller.GetProjectByUser);

module.exports = router;
