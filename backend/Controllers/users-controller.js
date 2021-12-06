const HttpError = require("../Models/http-error");
// const { v4: uuidv4 } = require("uuid");
const User = require("../Models/users-model");

async function createNewUser(req, res, next) {
  const { name, email, password } = req.body;
  const hasUser = await User.findOne({ email: email });
  if (hasUser) {
    return next(new HttpError("This email exist already", 403));
  }
  const createdUser = new User({ name, email, password, tasks: [] });
  try {
    await createdUser.save();
  } catch (err) {
    next(new HttpError("could not create a new user", 403));
  }

  res.status(201).json({ message: "user created and saved into the DataBase" });
}

function login(req, res, next) {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Wrong username or password", 401);
  }
  res.json({ message: "User logged in" });
}

exports.createNewUser = createNewUser;
exports.login = login;
