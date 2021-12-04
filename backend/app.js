const express = require("express");
const bodyParser = require("body-parser");

const usersRoutes = require("./Routes/users-routes");
const HttpError = require("./Models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  throw new HttpError("This route does not exist.", 404);
});

app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || "Unknown error occured" });
});

app.listen(5000, (req, res) => {
  console.log("listening on port 5000");
});
