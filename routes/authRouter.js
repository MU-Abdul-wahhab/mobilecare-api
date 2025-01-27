const express = require("express");

const authController = require("../controller/authController");
const authValidator = require("../validators/authValidator");

const globalMiddleware = require("../middleware/globalMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const route = express.Router();

route.post(
  "/signup",
  authMiddleware.checkUserExists,
  authValidator.signUp,
  globalMiddleware.checkError,
  authController.signUp
);

route.post(
  "/login",
  authValidator.login,
  globalMiddleware.checkError,
  authController.logIn
);

module.exports = route;
