const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
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
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
