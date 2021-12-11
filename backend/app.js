const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRoutes = require("./Routes/users-routes");
const tasksRoutes = require("./Routes/tasks-routes");
const HttpError = require("./Models/http-error");
const mongoAuth = require("./util/mongoKey");

const app = express();

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

//   next();
// });

app.use(cors());

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
    `mongodb+srv://${mongoAuth.username}:${mongoAuth.password}@cluster0.y9aro.mongodb.net/todoApp?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000, (req, res) => {
      console.log("listening on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
