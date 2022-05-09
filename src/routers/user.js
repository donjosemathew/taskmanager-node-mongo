const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  /*
    user
      .save()
      .then(() => {
        res.send(user);
      })
      .catch((e) => {
        res.status(400);
        res.send(e);
      });
    console.log(req.body);*/

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send("Done");
  } catch (e) {
    console.log("Error");
    res.status(500).send("Error Occutred");
  }
});
router.get("/users/me", auth, async (req, res) => {
  res.status(201).send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  console.log(req.user);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidoperatrion = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidoperatrion) {
    return res.status(400).send("invalid update");
  }
  try {
    //this method is recommended
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save(); /*
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    /*/

    if (!user) {
      return res.status(404).send();
    }
    res.send(req.user);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user: user.getPublicProfile(), token });
  } catch (e) {
    console.log(e);

    res.status(400).send(e);
  }
});
module.exports = router;
