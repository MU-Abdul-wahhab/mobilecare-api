const User = require("../models/userModel");
const appError = require("../utils/appError");
const jwt = require("../utils/jwt");
const catchAsync = require("../utils/catchAsync");

exports.checkUserExists = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return next(new appError("This User already Exist", 400));
  }

  next();
};

exports.auth = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new appError("User not logged in", 401));

  try {
    const decoded = jwt.jwtVerify(token);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(new appError("User does not exist", 401));
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return next(new appError(err.message, 401));
  }
});
