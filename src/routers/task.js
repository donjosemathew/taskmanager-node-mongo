const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.post("/task", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
  /*
    task
      .save()
      .then(() => {
        res.send(task);
      })
      .catch((e) => {
        res.status(400);
        res.send(e);
      });
    console.log(req.body);*/
});

//Mongoosse for other methods

router.get("/task", async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/task/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("Not available");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
