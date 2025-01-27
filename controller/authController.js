const User = require("../models/userModel");
const bcrypt = require("../utils/bcrypt");
const catchAsync = require("../utils/catchAsync");
const jwt = require("../utils/jwt");
const appError = require("../utils/appError");
const response = require("../utils/response.js");

exports.signUp = catchAsync(async (req, res, next) => {
  const { email, firstName, lastName, mobile, password, gender } = req.body;

  const hashed = await bcrypt.encryptPassword(password);

  const data = {
    email,
    firstName,
    lastName,
    mobile,
    password: hashed,
    gender,
  };

  const user = await User.create(data);

  const payload = {
    email: user.email,
    role: user.role,
  };

  const accessTtoken = jwt.jwtSign(payload);

  user.password = undefined;

  response(res, 200, "success", {
    accessTtoken,
    status: "success",
    user,
  });
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  const isPasswordCorrect = await bcrypt.checkPassword(password, user.password);

  if (!user || !isPasswordCorrect)
    return next(new appError("Incorrect email or password"), 401);

  user.password = undefined;

  const payLoad = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.jwtSign(payLoad);

  const data = {
    accessToken,
    user
  }
  response(res, 200 , 'success' , data);
});
