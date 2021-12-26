const HttpError = require("../Models/http-error");
const { validationResult } = require("express-validator");
const User = require("../Models/users-model");

// create new user
async function createNewUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your inputs.", 422)
    );
  }
  const { name, email, password } = req.body;

  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Could not connect to database to create user"));
  }
  if (hasUser) {
    return next(new HttpError("This email exist already", 403));
  }
  const date = new Date();
  const readableDate = date.toLocaleDateString();

  const createdUser = new User({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    email,
    password,
    createDate: readableDate,
    tasks: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("could not create a new user", 403));
  }

  res.status(201).json({ user: createdUser });
}

// Login logic
async function login(req, res, next) {
  const { email, password } = req.body;

  let identifiedUser;

  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later", 500)
    );
  }

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new HttpError("Wrong username or password", 401));
  }

  res.json({ user: identifiedUser });
}

async function addAvatar(req, res, next) {
  const { uid } = req.params;
  const { avatar } = req.body;

  let user;

  try {
    user = await User.findOne({ _id: uid });
  } catch (err) {
    return next(
      new HttpError("Finding user failed, please try again later", 500)
    );
  }

  if (!user) {
    return next(new HttpError("No user found with this user id", 401));
  }

  try {
    user.avatar = avatar;
  } catch (err) {
    return next(
      new HttpError("Could not set an avatar, please try again", 500)
    );
  }
  await user.save();

  res.json({ avatar });
}

exports.createNewUser = createNewUser;
exports.login = login;
exports.addAvatar = addAvatar;
