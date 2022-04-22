const express = require("express");
require("./db/mongoose");

const User = require("./models/user");
const Task = require("./models/task");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //Handle incomming json
app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((e) => {
      res.status(400);
      res.send(e);
    });
  console.log(req.body);
});

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500).send();
    });
});
app.post("/task", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((e) => {
      res.status(400);
      res.send(e);
    });
  console.log(req.body);
});
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500).send();
    });
});
//Mongoosse for other methods

app.get("/task", (req, res) => {
  Task.find({})
    .then((task) => {
      res.send(task);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.get("/task/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send("Not Found");
      }
      res.send(task);
    })
    .catch((e) => {
      res.status(500).send();
    });
});
app.listen(port, () => {
  console.log(port);
});
