const express = require("express");
require("./db/mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //Handle incomming json
app.post("/users", (req, res) => {
  console.log(req.body);
  res.send("Succss shh");
});
app.listen(port, () => {
  console.log(port);
});
