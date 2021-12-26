const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRoutes = require("./Routes/users-routes");
const tasksRoutes = require("./Routes/tasks-routes");
const HttpError = require("./Models/http-error");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);

app.use((req, res, next) => {
  throw new HttpError("This route does not exist.", 404);
});

app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || "Unknown error occured" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.y9aro.mongodb.net/${process.env.DB_name}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
