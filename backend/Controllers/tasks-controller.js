const HttpError = require("../Models/http-error");
const Task = require("../Models/tasks-model");
const User = require("../Models/users-model");
const mongoose = require("mongoose");

async function getAllTasks(req, res, next) {
  const { uid } = req.params;
  let userWithTasks;
  try {
    userWithTasks = await User.findById(uid).populate("tasks");
  } catch (err) {
    return next(new HttpError("Could not find tasks for this user id", 500));
  }

  if (!userWithTasks || userWithTasks.tasks.length === 0) {
    return next(new HttpError("Could not find tasks for this user id", 500));
  }
  res.json({ tasks: userWithTasks.tasks });
}

async function createNewTask(req, res, next) {
  const { title, priority, creatorId } = req.body;
  const date = new Date();
  const createdTask = new Task({
    title,
    priority,
    status: "UnDone",
    createDate: date.toLocaleDateString(),
    updatedAt: date.toLocaleDateString(),
    creatorId,
  });

  let user;
  try {
    user = await User.findById(creatorId);
  } catch (err) {
    return next(new HttpError("Creating task failed, try agin", 500));
  }

  if (!user) {
    return next(new HttpError("Could not find user for provided id", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTask.save({ session: sess });
    user.tasks.push(createdTask);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("could not create a new task", 403));
  }
  res.status(201).json({ task: createdTask });
}

async function deleteTask(req, res, next) {
  const { tid } = req.params;

  let task;
  try {
    task = await Task.findById(tid).populate("creatorId");
  } catch (err) {
    return next(
      new HttpError("something went wrong, could not delete task", 500)
    );
  }

  if (!task) {
    return next(new HttpError("Could not find task for this id", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await task.remove({ session: sess });
    task.creatorId.tasks.pull(task);
    await task.creatorId.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete task", 500)
    );
  }
  res.status(200).json({ message: "task deleted" });
}

exports.getAllTasks = getAllTasks;
exports.createNewTask = createNewTask;
exports.deleteTask = deleteTask;
