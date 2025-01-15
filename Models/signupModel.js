const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
    description: "must be a email address",
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  newPassword: {
    type: String,
    required: true,
  },
  reEnterPassword: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  cartAdded: {
    type: Array,
    default: [],
  },
});

// Create and export the User model
const Signup = mongoose.model("Signup", userSchema);
module.exports = Signup;
