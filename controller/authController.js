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
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.jwtSign(payload);
  const refreshToken = jwt.jwtRefreshSign(payload);

  user.password = undefined;

  response(res, 200, "success", {
    refreshToken,
    accessToken,
    status: "success",
    user,
  });
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  const isPasswordCorrect = await bcrypt.checkPassword(password, user.password);

  if (!user || !isPasswordCorrect) {
    return next(new appError("Incorrect email or password"), 401);
  }

  user.password = undefined;

  const payLoad = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.jwtSign(payLoad);
  const refreshToken = jwt.jwtRefreshSign(payLoad);

  const data = {
    refreshToken,
    accessToken,
    user,
  };
  response(res, 200, "success", data);
});

exports.refreshToken = catchAsync(async (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  try {
    const decoded = jwt.jwtRefreshVerify(refreshToken);
   
    if(decoded){
      const payload = {
        id : decoded.id,
        email : decoded.email,
        role : decoded.role
      }

      const accessToken = jwt.jwtSign(payload);
      const refreshToken = jwt.jwtRefreshSign(payload);

      response(res, 200, 'sucess' , {
        accessToken,
        refreshToken
      });

    }else{
      next(new appError('Access Denied' , 401));
    }

  } catch (err) {
    return next(new appError(err.message, 401));
  }
});
