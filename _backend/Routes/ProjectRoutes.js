const express = require("express");
const Project_Controller = require("../Controller/Project_Controller");
const router = express.Router();

router.get("/get/projects", Project_Controller.Get_ProjectByUser);
router.post("/post/newProject", Project_Controller.Post_CreateNewProject);
router.post("/get/finished-project", Project_Controller.Get_FinishedProject);
router.post("/move/finished-project/:id", Project_Controller.Post_SetFinishedProject);
router.delete("/delete/project/:id", Project_Controller.Post_DeleteProject);

module.exports = router;
