const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Provide an Email"],
    unique: true,
  },
  firstName: {
    type: String,
    min: 10,
    max: 40,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
