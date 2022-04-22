//CRUD

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const database = "task-manager";

mongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Error");
    }
    console.log("Connected Correctly");
    const db = client.db(database);
    /*db.collection("users").insertOne(
      {
        name: "Don",
        age: 24,
      },
      (error, result) => {
        if (error) {
          return console.log("Error");
        }
        console.log(result.ops);
      }
    );
    db.collection("users").insertMany(
      [
        { name: "assdth", age: "sd" },
        { name: "asth", age: "sdwee" },
        { name: "2323asth", age: "23" },
        { name: "sd", age: "34" },
      ],
      (error, result) => {
        if (error) {
          return console.log("Error");
        }
        console.log(result.ops);
      }
    );

    db.collection("users").findOne(
      { _id: new mongodb.ObjectId("6242ebfdc8f02eb7f422e2af") },
      (error, user) => {
        if (error) {
          return console.log("Error");
        }
        console.log(user);
      }
    );
    db.collection("users").insertMany(
      [
        { name: "assdth", age: "sd" },
        { name: "asth", age: "sdwee" },
        { name: "2323asth", age: "23" },
        { name: "sd", age: "34" },
      ],
      (error, result) => {
        if (error) {
          return console.log("Error");
        }
        console.log(result.ops);
      }
    );
    db.collection("users")
      .find({ age: "34" })
      .toArray((error, users) => {
        console.log(users);
      });

      const updatePromise = db.collection("users").updateMany(
      { _id: new mongodb.ObjectId("62482a6bb580fea79a247a5c") },
      {
        $inc: {
          age: 1,
        },
      }
    );
    updatePromise
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

       db.collection("users")
      .updateMany(
        { age: "23" },
        {
          $set: {
            age: "Not a valid age",
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    

    db.collection("users")
      .deleteMany({ age: "Not a valid age" })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });*/
  }
);
