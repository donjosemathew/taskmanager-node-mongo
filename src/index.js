const express = require("express");
require("./db/mongoose");

const User = require("./models/user");
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
app.listen(port, () => {
  console.log(port);
});
