const express = require("express");
const { check } = require("express-validator");

const taskControllers = require("../Controllers/tasks-controller");

const router = express.Router();

router.get("/:uid", taskControllers.getAllTasks); //show all task of specific user

router.post(
  "/",
  [check("title").not().isEmpty(), check("priority").not().isEmpty()],
  taskControllers.createNewTask
); //create a task of specific user

router.delete("/:tid", taskControllers.deleteTask);

router.patch(
  "/:tid",
  [check("title").not().isEmpty(), check("priority").not().isEmpty()],
  taskControllers.editTask
);

router.patch("/done/:tid", taskControllers.doneTask);

module.exports = router;
