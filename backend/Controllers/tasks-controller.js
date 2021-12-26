const HttpError = require("../Models/http-error");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Task = require("../Models/tasks-model");
const User = require("../Models/users-model");

async function getAllTasks(req, res, next) {
  const { uid } = req.params;

  let userWithTasks;
  try {
    userWithTasks = await User.findById(uid).populate("tasks");
  } catch (err) {
    return next(new HttpError("Could not find tasks for this user id", 500));
  }

  if (!userWithTasks) {
    return next(new HttpError("Could not find tasks for this user id", 500));
  }
  res.json({ tasks: userWithTasks.tasks, user: userWithTasks });
}

async function createNewTask(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your inputs.", 422)
    );
  }
  const { title, priority, creatorId } = req.body;

  const date = new Date();
  const createdTask = new Task({
    title,
    priority,
    status: "UnDone",
    createDate: date,
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
      new HttpError(
        "something went wrong, could not findById from Database",
        500
      )
    );
  }

  if (!task) {
    return next(new HttpError("Could not find any task for this id", 404));
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
      new HttpError("Something went wrong, could not delete this task", 500)
    );
  }
  res.status(200).json({ message: "task deleted" });
}

async function editTask(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your inputs.", 422)
    );
  }
  const { tid } = req.params;
  const { title, priority } = req.body;

  let task;
  try {
    task = await Task.findById(tid);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not findById from Database")
    );
  }

  if (!task) {
    return next(new HttpError("Could not find any task for this id", 404));
  }

  try {
    task.title = title;
    task.priority = priority;
    try {
      await task.save();
    } catch (err) {
      next(new HttpError("could not save the changes"));
    }
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not edit this task", 500)
    );
  }
  res.status(200).json({ message: "task edited" });
}

async function doneTask(req, res, next) {
  const { tid } = req.params;

  let task;
  try {
    task = await Task.findById(tid);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not findById from Database")
    );
  }

  if (!task) {
    return next(new HttpError("Could not find any task for this id", 404));
  }

  try {
    task.status = "Done";
    try {
      await task.save();
    } catch (err) {
      next(new HttpError("could not save the changes"));
    }
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not edit this task", 500)
    );
  }
  res.status(200).json({ message: "task edited" });
}

exports.getAllTasks = getAllTasks;
exports.createNewTask = createNewTask;
exports.deleteTask = deleteTask;
exports.editTask = editTask;
exports.doneTask = doneTask;
