require("../db/mongoose");
const Task = require("../models/task");
const User = require("../models/user");

/*Task.deleteOne({ _id: "62620faa39500f3748063035" })
  .then((t) => {
    console.log(t);
    return Task.countDocuments({ completed: false });
  })
  .then((r) => {
    console.log(r);
  })
  .catch((e) => {
    console.log(e);
  });*/
///Promise chaining

const updateAgeAndCount = async (id, name) => {
  const user = await User.findByIdAndUpdate(id, { name });
  const count = await User.countDocuments({ name });
  return count;
};
/*
updateAgeAndCount("626212083f41ab20e0d2b646", "AthulyaCsLove")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
*/
const deleteTaskAndCount = async (id) => {
  const task = Task.deleteOne({ _id: id });
  const count = Task.countDocuments({ completed: false });
  return count;
};
deleteTaskAndCount("626212083f41ab20e0d2b646")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
