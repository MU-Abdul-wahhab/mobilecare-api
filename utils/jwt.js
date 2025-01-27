const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");

exports.jwtSign = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.jwtVerify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};



exports.jwtRefreshSign = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.jwtRefreshVerify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
