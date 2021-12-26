const express = require("express");
const { check } = require("express-validator");
const usersControllers = require("../Controllers/users-controller");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.createNewUser
);

router.post("/login", usersControllers.login);

router.patch("/:uid", usersControllers.addAvatar);

module.exports = router;
