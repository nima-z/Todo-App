const express = require("express");
const taskControllers = require("../Controllers/tasks-controller");

const router = express.Router();

router.get("/:uid", taskControllers.getAllTasks); //show all task of specific user

router.post("/", taskControllers.createNewTask); //create a task of specific user

router.delete("/:tid", taskControllers.deleteTask);

router.patch("/:tid", taskControllers.editTask);

module.exports = router;
