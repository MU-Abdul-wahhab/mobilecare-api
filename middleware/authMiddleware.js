const User = require("../models/userModel");
const appError = require("../utils/appError");

exports.checkUserExists = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return next(new appError("This User already Exist", 400));
  }

  next();
};


