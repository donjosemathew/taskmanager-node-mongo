const mongoose = require("mongoose");
const validator = require("validator");
const User = mongoose.model("User", {
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid");
      }
    },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Mail");
      }
    },
  },
});

module.exports = User;
