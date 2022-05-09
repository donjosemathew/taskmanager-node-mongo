const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const Task = require("../models/task");
const userSchema = new mongoose.Schema(
  {
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
      unique: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Mail");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
userSchema.virtual("tasks", {
  ref: "task",
  localField: "_id",
  foreignField: "owner",
});
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable To Login");
  }

  const isMatch = await bcrypt.compare(password, user.password, (err, res) => {
    if (err) {
      console.log("Sdsd", err);
      return false;
    }
    if (res) {
      return true;
    }
  });

  if (isMatch) {
    throw new Error("Unable To Login");
  }

  return user;
};
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  console.log(user.tokens);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
