const express = require("express");
const usersControllers = require("../Controllers/users-controller");

const router = express.Router();

router.post("/signup", usersControllers.createNewUser);

router.post("/login", usersControllers.login);

router.patch("/:uid", usersControllers.addAvatar);

module.exports = router;
