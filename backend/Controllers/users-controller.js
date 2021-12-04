const HttpError = require("../Models/http-error");
const { v4: uuidv4 } = require("uuid");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "nima",
    email: "nima@yahoo.com",
    password: "testpass1",
    tasks: [],
  },
];

function createNewUser(req, res, next) {
  const { name, email, password } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("This email already exists", 422);
  }
  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
    tasks: [],
  };
  DUMMY_USERS.push(createdUser);
  res.status(201).json({ message: "New user created" });
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
