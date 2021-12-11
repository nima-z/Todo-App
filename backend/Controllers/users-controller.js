const HttpError = require("../Models/http-error");
const User = require("../Models/users-model");

// create new user
async function createNewUser(req, res, next) {
  const { name, email, password } = req.body;
  console.log(name, email);
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
    name,
    email,
    password,
    createDate: readableDate,
    tasks: [],
  });

  console.log(createdUser);

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("could not create a new user", 403));
  }

  res.status(201).json({ message: "user created and saved into the DataBase" });
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

  res.json({ message: "User logged in" });
}

exports.createNewUser = createNewUser;
exports.login = login;
