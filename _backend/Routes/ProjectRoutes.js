const express = require("express");
const Project_Controller = require("../Controller/Project_Controller");
const router = express.Router();

router.get("/get/projects", Project_Controller.GetProjectByUser);
router.post("/post/newProject", Project_Controller.PostCreateNewProject);

module.exports = router;
