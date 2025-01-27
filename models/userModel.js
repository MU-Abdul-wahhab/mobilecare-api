const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    min: 10,
    max: 40,
  },

  lastName: {
    type: String,
    required: true,
    min: 10,
    max: 40,
  },

  mobile: {
    type: String,
    required: [true, "Please Provide The Mobile Number"],
  },

  password : {
    type: String,
    select : false
  },
  passwordResetCode: String,
  passwordResetCodeExpires: Date,
  passwordChangedAt: Date,

  profile: {
    type: String,
    default: "path",
  },

  address: {
    type: String,
    max: 100,
  },

  gender: {
    type: String,
    enum: ["male", "female"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
  registeredDate: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
