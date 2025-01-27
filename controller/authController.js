const User = require("../models/userModel");
const bcrypt = require("../utils/bcrypt");
const catchAsync = require("../utils/catchAsync");
const jwt = require('../utils/jwt');

exports.signUp = catchAsync(async (req, res, next) => {
  const { email, firstName, lastName, mobile, password, gender } = req.body;

  const hashed = await bcrypt.encryptPassword(password);

 
 
  const data = {
    email,
    firstName,
    lastName,
    mobile,
    password : hashed,
    gender,
  };

  const user  = await User.create(data);

  const payload = {
    email : user.email,
    role : user.role
  }

  const accessTtoken = jwt.jwtSign(payload);

  user.password = undefined;
  res.status(200).json({
    accessTtoken,
    status: "success",
    user
  });
});
