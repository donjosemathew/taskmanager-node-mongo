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
    validate(val) {
      if (val.length < 7) {
        throw new Error("Length erroe");
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
