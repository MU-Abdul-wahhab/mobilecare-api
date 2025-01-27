const { body } = require("express-validator");
const User = require("../models/userModel");
const appError = require("../utils/appError");

exports.signUp = [
  body("email", "Email is required")
    .isEmail()
    .custom(async (email, { req }) => {
      return User.findOne({ email: email })
        .then((user) => {
          if (user) {
            return Promise.reject("This User Already Exist");
          } else {
            return true;
          }
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    }),
  body("firstName", "First Name is required").isString(),
  body("lastName", "Last Name is required").isString(),
  body("mobile", "Mobile Number is required")
    .isString()
    .custom((mobile) => {
      if (mobile.length != 10 || !/07[0,1,2,4,5,6,7,8][0-9]/.test(mobile)) {
        return Promise.reject("Invalid Mobile Number");
      } else {
        return true;
      }
    }),
  body("gender", "Gender Is Required").isString(),
  body("password", "Password Is Required")
    .isAlphanumeric()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password Should Contain between 8 and 20 Charactors"),
  body("passwordConfirm", "password Confirm is Required")
    .isAlphanumeric()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject("Password Does Not Match");
      }

      return true;
    }),
];

exports.login = [
  body("email", "Email is required").isEmail(),
  body("password", "password is required").isAlphanumeric(),
];
