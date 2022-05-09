const express = require("express");
require("./db/mongoose");

const Task = require("./models/task");
const app = express();
const port = process.env.PORT || 3000;

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

app.use(express.json()); //Handle incomming json
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(port);
});
console.log(process.env.NAME);
